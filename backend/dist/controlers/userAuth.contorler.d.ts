import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
export declare const userLogin: (req: Request, res: Response) => Promise<void>;
export declare const getMe: (req: AuthRequest, res: Response) => Promise<void>;
export declare const userLogout: (_req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userAuth.contorler.d.ts.map