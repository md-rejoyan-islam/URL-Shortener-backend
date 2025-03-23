import bcrypt from "bcryptjs";

const hashedPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// export
export default hashedPassword;

export const isMatchedPassword = async (
  password: string,
  userPassword: string
) => {
  return await bcrypt.compare(password, userPassword);
};
