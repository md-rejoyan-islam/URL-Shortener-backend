import crypto from "crypto";

const generateRandomId = (n: number) => {
  const randomString = crypto.randomBytes(n).toString("hex");
  return randomString;
};

export default generateRandomId;
