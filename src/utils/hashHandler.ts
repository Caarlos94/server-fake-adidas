import { hash, compare } from "bcryptjs";

async function hashPasword(password: string) {
  const newPasword = await hash(password, 8);
  return newPasword;
}

async function comparePassword(password: string, hashPasword: string) {
  const isValid = await compare(password, hashPasword);
  return isValid;
}

export { hashPasword, comparePassword };
