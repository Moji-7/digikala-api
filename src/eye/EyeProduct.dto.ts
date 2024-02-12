import { EyeProduct } from "./EyeProduct.entity";
  
export interface EyeProductResponse {
    eyeProducts: EyeProduct[];
    count: number;
  }
export type EyeProductParams = {
    productId: number;
    productTitle: string;
    createdAt: Date;
    page?: number;
    length?: number;
  };

