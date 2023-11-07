import Connection from "../db/connection.js";
import User from "../models/user.js";

class UserAccessor {
  static async getUser(username) {
    try {
      await Connection.open("users");
      const user = await User.findOne({ username: username });
      return user;
    } catch (e) {
      throw e;
    }
  }

  static async getAllUsers() {
    try {
      await Connection.open("Network-Builder");
      const users = [];
      for await (const doc of User.find()) {
        users.push(doc);
      }
      return users;
    } catch (e) {
      throw e;
    }
  }

  static async updateAllUsers(users) {
    try {
      await Connection.open("users");

      users.forEach(async (user) => {
        await User.findOneAndUpdate(
          { username: user.username },
          {
            followers: user.followers,
            following: user.following,
          }
        );
      });
    } catch (e) {
      throw e;
    }
  }

  static async createUser(userDoc) {
    try {
      await Connection.open("users");
      const user = await User.create(userDoc);
      return user;
    } catch (e) {
      throw e;
    }
  }

  static async removeUser(user) {
    try {
      await Connection.open("users");
      await User.findOneAndDelete({ username: user });
    } catch (e) {
      throw e;
    }
  }

  static async addFollower(userWhoFollowed, userToFollow) {
    try {
      await Connection.open("users");
      const follower = await UserAccessor.getUser(userWhoFollowed);
      const followee = await UserAccessor.getUser(userToFollow);

      const followerList = follower.following;
      followerList.push(userToFollow);

      const followeeList = followee.followers;
      followeeList.push(userWhoFollowed);

      await User.findOneAndUpdate(
        { username: userWhoFollowed },
        { following: followerList }
      );
      await User.findOneAndUpdate(
        { username: userToFollow },
        { followers: followeeList }
      );
    } catch (e) {
      throw e;
    }
  }

  static async removeFollowerFromAll(RemovedUser) {
    try {
      await Connection.open("users");
      const allUsers = await UserAccessor.getAllUsers();

      allUsers.forEach((user) => {
        const following = user.following;

        const removedFromFollowing = following.filter(
          (followedUser) => followedUser !== RemovedUser
        );

        const followers = user.followers;

        const removedFromFollowers = followers.filter(
          (userFollowing) => userFollowing !== RemovedUser
        );

        user.following = removedFromFollowing;
        user.followers = removedFromFollowers;
      });
      return allUsers;
    } catch (e) {
      throw e;
    }
  }
}

export default UserAccessor;
