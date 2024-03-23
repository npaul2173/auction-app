import bcrypt from "bcrypt";

export const hashText = async (plainText: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedText = await bcrypt.hash(plainText, salt);
  return hashedText;
};

export const comparePassHash = async (plainText: string, hashText: string) => {
  const isMatch = await bcrypt.compare(plainText, hashText);
  return isMatch;
};
