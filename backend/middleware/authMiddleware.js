const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};


module.exports = authMiddleware;
