import api from "../apis/userApi";

class UserService {

    getAllUsers() {
        return api.get(`/users`);
    }

    getUserById(id) {
        return api.get(`/users/id/${id}`);
    }

    getUserByUsername(username) {
        return api.get(`/users/username/${username}`);
    }

    getFollowers(id) {
        return api.get(`/users/${id}/followedBy`);
    }

    getFollowing(id) {
        return api.get(`/users/${id}/follows`);
    }

    createUser(user) {
        return api.post(`/users/addUser`, user);
    }

    follow(following, follower) {
        return api.put(`/users/${following}/setFollows/${follower}`);
    }

    unfollow(following, follower) {
        return api.delete(`/users/${follower}/unFollows/${following}`);
    }
}

export default new UserService();
