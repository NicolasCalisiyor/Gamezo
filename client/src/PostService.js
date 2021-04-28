import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'

class PostService {
    // Get Posts, static for PostService.getPost() and no need to instantiate the class (new PostService)
    static getPost() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url)
                const data = res.data
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                )
            } catch(err) {
                reject(err)
            }
        })
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