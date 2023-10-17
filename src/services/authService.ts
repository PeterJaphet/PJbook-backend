import User from "../models/userModels";
import AuthRepo from "../repo/authRepo";
import { userSignUp } from "../types/auth";
import { bcryptPassword } from "../utils/hashPassword";
import { generateJwt } from "../utils/jwtLib";

class authService {
  async signUp(newUser: userSignUp) {
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) return `${existingUser.role} already Exists!`;
    newUser.password = await bcryptPassword(newUser.password);

    const user = await User.create(newUser);

    const token = generateJwt(
      { id: user.id, email: user.email, role: user.role },
      false
    );
    return {user,token};
  }

  async login() {}
}

export default authService;
