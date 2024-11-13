import Database from 'better-sqlite3'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
const db = new Database('database.db')

app.use(cors())

// テーブルを作成するクエリ
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL,
    created_at TEXT NOT NULL,
  )
  
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock BOOLEAN NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
  )

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    delivery_address TEXT NOT NULL,
    created_at TEXT NOT NULL,
  )
  
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT NOT NULL,
    created_at TEXT NOT NULL,
  )
`

// テーブルを作成する
db.exec(createTableQuery)

// ユーザーを登録する
app.post('/users', async (c) => {
  const { name, email, password, address } = await c.req.json()
  const stmt = db.prepare('INSERT INTO users (name, email, password, address, created_at) VALUES (?, ?, ?, ?, ?)')
  const info = stmt.run(name, email, password, address, new Date().toISOString())
  return c.json({ id: info.lastInsertRowid })
})

// ユーザーを取得する
app.get('/users', (c) => {
  const stmt = db.prepare('SELECT * FROM users')
  const users = stmt.all()
  return c.json(users)
})

export default app
