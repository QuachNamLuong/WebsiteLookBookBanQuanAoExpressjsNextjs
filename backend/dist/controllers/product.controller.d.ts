import type { Request, Response } from "express";
export declare const createProductHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPaginateProductHandler: (req: Request, res: Response) => Promise<void>;
export declare const deleteProductByIdHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getProductDetailByIdHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateProductHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=product.controller.d.ts.map