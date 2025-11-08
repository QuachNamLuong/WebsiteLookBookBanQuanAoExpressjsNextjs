export declare function ensurePublicBucket(bucketName: string): Promise<{
    success: boolean;
    error?: never;
} | {
    success: boolean;
    error: unknown;
}>;
export declare const getListFileInBucket: (bucketName: string) => Promise<(string | undefined)[]>;
export declare const uploadFile: (bucketName: string, objectName: string, fileBuffer: Buffer) => Promise<{
    success: boolean;
    error?: never;
} | {
    success: boolean;
    error: unknown;
}>;
export declare function deleteFile(bucketName: string, objectName: string): Promise<{
    success: boolean;
    error?: never;
} | {
    success: boolean;
    error: unknown;
}>;
export declare function renameFile(bucketName: string, oldName: string, newName: string): Promise<{
    success: boolean;
    error?: never;
} | {
    success: boolean;
    error: unknown;
}>;
//# sourceMappingURL=minio.d.ts.map