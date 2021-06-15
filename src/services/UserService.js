import api from "../apis/userApi";

class UserService {

    getAllUsers() {
        return api.get(`/users`);
    }

    getUserById(id) {
        return api.get(`/users/id/${id}`);
    }
}

export default new UserService();
