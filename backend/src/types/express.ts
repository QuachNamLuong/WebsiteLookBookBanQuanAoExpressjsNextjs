import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Define the structure of your custom validatedData property
interface CustomValidatedData {
  query?: any;
  body?: any;
  cookies?: any;
  params?: any;
}

declare global {
  namespace Express {
    // Extend the built-in Express Request interface
    interface Request {
      validatedData?: CustomValidatedData; // ✅ Add your custom property here
    }
  }
}