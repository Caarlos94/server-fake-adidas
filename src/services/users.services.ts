import { UserModel } from "../models/users.model";
import { User } from "../interfaces/interfaces";
import { comparePassword, hashPasword } from "../utils/hashHandler";
import { generateToken } from "../utils/tokenHandler";

async function registerUserDb(data: User) {
  const alreadyExist = await UserModel.findOne({ email: data.email });
  if (alreadyExist) return "USER ALREADY EXIST";
  const hashPas = await hashPasword(data.password);
  const infoUpdtated = {
    email: data.email,
    password: hashPas,
  };
  const response = await UserModel.create(infoUpdtated);
  if (response) {
    return generateToken(data);
  } else return "USER DO NOT CREATED";
}

async function loginUserDb(data: User) {
  const user = await UserModel.findOne({ email: data.email });
  if (!user) return "USER IS NOT REGISTER";
  const userValid = await comparePassword(data.password, user.password);
  if (userValid) {
    const token = generateToken(user);
    return token;
  } else return "THE PASSWORD DOES NOT MATCH";
}

export { registerUserDb, loginUserDb };
