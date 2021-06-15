import postApi from "../apis/postApi";

class CommentService {

    createComment(id, comment) {
        return postApi.post(`/comments/${id}`, comment);
    }

    getComments(id) {
        return postApi.get(`/comments/user=${id}`);
    }

    getCommentsByPost(id) {
        return postApi.get(`/comments?postId=${id}`);
    }

    countComments(id) {
        return postApi.get(`/comments/user/${id}`);
    }

    countUserCommentsByMonth(id, month) {
        return postApi.get(`/comments/user/statistics/user=${id}&month=${month}`);
    }

    deleteComment(id) {
        return postApi.delete(`/comments=${id}`);
    }

}

export default new CommentService();
