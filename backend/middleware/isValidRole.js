export const isValidRole = (...roles) => {
  return (req, res, next) => {
    const userData = req.user;
    // console.log(roles);
    if (!roles.includes(userData.role)) {
      res.status(403).json({ message: "dont have permission for this" });
    } else {
      next();
    }
  };
};
