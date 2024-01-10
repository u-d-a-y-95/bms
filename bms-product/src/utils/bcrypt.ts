import bcrypt from "bcrypt";

export const gethashed = (
  value: string,
  round = Number(process.env.SALT_ROUND)
) => bcrypt.hash(value, round);

export const compareHash = (value: string, hash: string) =>
  bcrypt.compare(value, hash);
