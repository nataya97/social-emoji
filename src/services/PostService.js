import postApi from "../apis/postApi";

class PostService {

    createPost(post) {
        return postApi.post('/posts', post);
    }

    updatePost(post) {
        return postApi.put('/posts/update', post);
    }

    getAllPosts() {
        return postApi.get('/posts');
    }

    getUserPosts(id) {
        return postApi.get(`/posts/userId?user=${id}`);
    }

    countUserPosts(id) {
        return postApi.get(`/posts/user/${id}`);
    }

    countUserPostsByMonth(id, month) {
        return postApi.get(`/posts/user/statistics?user=${id}&month=${month}`);
    }

    deletePost(id) {
        return postApi.get(`/posts=${id}`);
    }
}

export default new PostService();
