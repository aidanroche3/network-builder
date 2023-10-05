import UserAccessor from "../db_accessor/user.accessor.js";

class UserController {
  static async getAllUsers(req, res) {
    const users = await UserAccessor.getAllUsers();
    res.render("index", { users: users });
  }
}

export default UserController;
