import type { Request, Response } from "express";
interface experienceParams {
    id: string;
}
export declare const getExperience: (_req: Request, res: Response) => Promise<void>;
export declare const createExperience: (req: Request, res: Response) => Promise<void>;
export declare const updateExperience: (req: Request<experienceParams>, res: Response) => Promise<void>;
export declare const deleteExperience: (req: Request<experienceParams>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=experiences.controler.d.ts.map