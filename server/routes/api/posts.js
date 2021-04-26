import express from 'express'
import mongodb from 'mongodb'

const uri = 'mongodb+srv://root:69e5d9e4@cluster0.r0ob9.mongodb.net/gameReviews?retryWrites=true&w=majority'

const router = express.Router()

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).toArray())
})

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection()
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return client.db('gameReviews').collection('posts')
}

export default router