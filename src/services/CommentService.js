import postApi from "../apis/postApi";

class CommentService {

    createComment(comment) {
        return postApi.post('/comments', comment);
    }

    getComments(id) {
        return postApi.get(`/comments/user=${id}`);
    }

    countComments(id) {
        return postApi.get(`/comments/user/${id}`);
    }

    deleteComment(id) {
        return postApi.delete(`/comments=${id}`);
    }

}

export default new CommentService();
