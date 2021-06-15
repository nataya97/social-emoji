import postApi from "../apis/postApi";

class ReactionService {

    addReaction(postId, reaction) {
        return postApi.put(`/reactions/post?postId=${postId}`, reaction);
    }
}

export default new ReactionService();
