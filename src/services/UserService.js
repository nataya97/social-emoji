import api from "../api";

class UserService {

    getAllUsers() {
        return api.get('/persons');
    }
}

export default new UserService();
