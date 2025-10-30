export const ClientMessage = {
    AUTH_INVALID: "Invalid credentials",
    AUTH_FORBIDDEN: "You do not have access",
    NOT_FOUND: "Resource not found",
    SERVER_ERROR: "Internal server error",
} as const;

export type ClientMessageKey = keyof typeof ClientMessage;

export enum ErrorCode {
    EMAIL_INVALID = 1000,
    PASSWORD_INVALID = 1001,
    USER_NOT_FOUND = 1002,
}

export const ClientMessages: Record<ErrorCode, string> = {
    [ErrorCode.EMAIL_INVALID]: "Invalid credentials",
    [ErrorCode.PASSWORD_INVALID]: "Invalid credentials",
    [ErrorCode.USER_NOT_FOUND]: "The requested resource does not exist",
};
