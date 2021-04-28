import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'

class PostService {
    // Get Posts, static for PostService.getPost() and no need to instantiate the class (new PostService)
    static async getPosts() {
        const res = await axios.get(url)
        try {
            const data = res.data
            return data.map(post => ({
                comment: post.review.comment,
                gameId: post.review.gameId,
                createdAt: new Date(post.createdAt)
            }))
        } catch (err) {
            return err
        }
    }
    // Create Post
    static insertPost(text) {
        return axios.post(url, {
            text: text  // Could be just text
        })
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService