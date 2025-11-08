import xss from "xss";
function sanitizeObject(obj) {
    const stack = [obj];
    while (stack.length > 0) {
        const current = stack.pop();
        for (const key in current) {
            const value = current[key];
            if (typeof value === "string") {
                current[key] = xss(value);
            }
            else if (typeof value === "object" && value !== null) {
                stack.push(value);
            }
        }
    }
}
export const sanitizeMiddleware = (req, _res, next) => {
    if (req.body)
        sanitizeObject(req.body);
    if (req.query)
        sanitizeObject(req.query);
    if (req.params)
        sanitizeObject(req.params);
    next();
};
//# sourceMappingURL=sanitize.middleware.js.map