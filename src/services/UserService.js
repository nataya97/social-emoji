import api from "../apis/userApi";

class UserService {

    getAllUsers() {
        return api.get('/persons');
    }
}

export default new UserService();
