import type { Request, Response, NextFunction } from "express";
export interface AuthenticatedUser {
    id: string;
    username: string;
    email: string;
    role: string;
}
export interface AuthRequest extends Request {
    user?: AuthenticatedUser;
}
export declare const verifyAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map