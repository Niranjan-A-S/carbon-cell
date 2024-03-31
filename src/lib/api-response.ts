export class APIResponse {
    message: string;
    statusCode: number;
    data?: any;
    success: boolean;
    constructor(message: string, statusCode: number, data?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
    }
}