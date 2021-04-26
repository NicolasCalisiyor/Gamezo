import express from 'express'
import cors from 'cors'
import posts from './routes/api/posts.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

app.use('/api/posts', posts)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`))