import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../utils/jwt";
import * as UserSerivce from "../services/user.service";
export const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    try {
        const { userId } = verifyAccessToken(token);
        req.userId = userId;
        return next();
    }
    catch {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid or expired token" });
    }
};
export const authorize = (...allowedRoles) => async (req, res, next) => {
    const user = await UserSerivce.getUserById(req.userId);
    if (!user)
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(user.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: insufficient role" });
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map