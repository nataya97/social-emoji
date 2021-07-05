import postApi from "../apis/postApi";

class ReactionService {

    addReaction(postId, reaction) {
        return postApi.put(`/reactions/post?postId=${postId}`, reaction);
    }

    getReaction(postId) {
        return postApi.get(`/reactions/post?postId=${postId}`);
    }
}

export default new ReactionService();
