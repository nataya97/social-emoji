import api from "../apis/userApi";

class UserService {

    getAllUsers() {
        return api.get(`/users`);
    }

    getUserById(id) {
        return api.get(`/users/id/${id}`);
    }

    getFollowers() {
        return api.get(`/users/`);
    }
}

export default new UserService();
