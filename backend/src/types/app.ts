import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
    errorCode: number;
    statusCode: number;
    clientMessage: string; // message an toàn cho client
    internalMessage: string; // message cho log/dev

    constructor(
        errorCode: number,
        internalMessage: string,
        clientMessage: string = "Something went wrong",
        statusCode: number = StatusCodes.BAD_REQUEST
    ) {
        super(internalMessage); // message của Error dùng để log
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.clientMessage = clientMessage;
        this.internalMessage = internalMessage;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
