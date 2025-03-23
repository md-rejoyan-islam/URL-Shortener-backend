const isAuthorized = (userId: string, loginUserId: string) => {
  if (userId !== loginUserId) {
    return false;
  }
  return true;
};

export default isAuthorized;
