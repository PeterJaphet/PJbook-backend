import User from "../models/userModels";

class UserRepo {
  static async add(data: typeof User) {
    const user = new User(data);
    await user.save();
    return user;
  }

  static async update(query: any, data: typeof User) {
    return User.findOneAndUpdate(query, data, { new: true });
  }

  static async find(query: any) {
    return User.findOne(query, { __v: 0, password: 0 });
  }
  static async findWithP(query: any) {
    return User.findOne(query);
  }

  static async findSeveralUsers(query: any) {
    return User.find(query);
  }

  static async deleteUser(query: any) {
    return User.deleteOne(query);
  }

  static async getActiveUsers(page: number, pageSize: number) {
    return User.find({}, { __v: 0, password: 0 })
      .sort({ _id: -1 })
      .skip(page)
      .limit(pageSize);
  }
}

export default UserRepo;
