import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

// src/types/express/index.d.ts
// This tells TypeScript to merge this definition with the existing Express Request type.

import { Request } from 'express';

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