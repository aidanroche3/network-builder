import UserAccessor from "../db_accessor/user.accessor.js";

class UserController {
  static async getAllUsers(req, res) {
    const users = await UserAccessor.getAllUsers();
    res.json(users);
  }
}

export default UserController;
