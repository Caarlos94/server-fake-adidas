import { sign, verify } from "jsonwebtoken";
import { User } from "../interfaces/interfaces";

const SECRET = <string>process.env.SECRET;

function generateToken(data: User) {
  const token = sign(data.email, SECRET);
  return token;
}

function checkToken(token: string) {
  const tokenOk = verify(token, SECRET);
  return tokenOk;
}

export { generateToken, checkToken };
