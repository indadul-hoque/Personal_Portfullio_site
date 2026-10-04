import type { Request, Response } from "express";
interface educationParams {
    id: string;
}
export declare const getEducation: (_req: Request, res: Response) => Promise<void>;
export declare const createEducation: (req: Request, res: Response) => Promise<void>;
export declare const updateEducation: (req: Request<educationParams>, res: Response) => Promise<void>;
export declare const deleteEducation: (req: Request<educationParams>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=educations.controler.d.ts.map