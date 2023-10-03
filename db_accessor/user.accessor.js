import Connection from "../db/connection.js";
import User from "../models/user.js";

class UserAccessor {
  static async getAllUsers() {
    try {
      await Connection.open("users");
      const users = [];
      for await (const doc of User.find()) {
        users.push(doc);
      }
      return users;
    } catch (e) {
      throw e;
    }
  }
}

export default UserAccessor;
