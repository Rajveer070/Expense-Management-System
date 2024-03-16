export const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You need to be logged in to access this route" });
    }

    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this route" });
    }

    next();
  } catch (error) {
    console.error("adminMiddleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
