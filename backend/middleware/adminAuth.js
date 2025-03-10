import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Access Denied" });
        }

        req.admin = token_decode; 
        next(); 
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default adminAuth;
