import { Types } from "mongoose";

const isAuthorized = (userId: Types.ObjectId, loginUserId: Types.ObjectId) => {
  if (userId !== loginUserId) {
    return false;
  }
  return true;
};

export default isAuthorized;
