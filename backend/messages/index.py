import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для работы с сообщениями мессенджера'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            chat_id = event.get('queryStringParameters', {}).get('chat_id')
            
            if chat_id:
                cur.execute('''
                    SELECT m.id, m.content, m.created_at, u.username, u.avatar_url
                    FROM messages m
                    JOIN users u ON m.user_id = u.id
                    WHERE m.chat_id = %s
                    ORDER BY m.created_at ASC
                ''', (chat_id,))
                
                messages = []
                for row in cur.fetchall():
                    messages.append({
                        'id': row[0],
                        'content': row[1],
                        'timestamp': row[2].isoformat(),
                        'username': row[3],
                        'avatar': row[4]
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'messages': messages}),
                    'isBase64Encoded': False
                }
            else:
                cur.execute('''
                    SELECT DISTINCT c.id, c.name, c.type, 
                           (SELECT content FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
                           (SELECT created_at FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) as last_time
                    FROM chats c
                    JOIN chat_members cm ON c.id = cm.chat_id
                    ORDER BY last_time DESC NULLS LAST
                ''')
                
                chats = []
                for row in cur.fetchall():
                    chats.append({
                        'id': row[0],
                        'name': row[1],
                        'type': row[2],
                        'lastMessage': row[3] or 'Нет сообщений',
                        'timestamp': row[4].isoformat() if row[4] else None
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'chats': chats}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            data = json.loads(event.get('body', '{}'))
            chat_id = data.get('chat_id')
            content = data.get('content')
            user_id = data.get('user_id', 1)
            
            cur.execute('''
                INSERT INTO messages (chat_id, user_id, content)
                VALUES (%s, %s, %s)
                RETURNING id, created_at
            ''', (chat_id, user_id, content))
            
            result = cur.fetchone()
            conn.commit()
            
            cur.execute('''
                SELECT u.username, u.avatar_url
                FROM users u
                WHERE u.id = %s
            ''', (user_id,))
            
            user = cur.fetchone()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': result[0],
                    'content': content,
                    'timestamp': result[1].isoformat(),
                    'username': user[0],
                    'avatar': user[1]
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
