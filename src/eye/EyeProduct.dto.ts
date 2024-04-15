import { plainToInstance,instanceToInstance,instanceToPlain, Expose } from "class-transformer";
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

  
  export class EyeProductDTO {
    @Expose()
    public id!: number;
  
    @Expose()
    public userId!: number;
  
    @Expose()
    public productId!: number;
  
    @Expose()
    public titleFa!: string | null;
  
    @Expose()
    public info!: string | null;
  
    @Expose()
    public pipelinesIds!: string;
    
    @Expose()
    public created_at!: Date | null;
  }

  export function mapToEyeProducts(payloadItems: any[], userId: number,pipelinesIds:string): EyeProduct[] {
    return plainToInstance(EyeProduct,     
      payloadItems.map((item) => ({ ...item, userId,pipelinesIds })),
      );
    }

      
  export function mapToEyeProductsDTO(payloadItems: any[], userId: number, pipelinesIds: string): EyeProductDTO[] {
    return plainToInstance(EyeProductDTO, payloadItems.map((item) => ({
        ...item,
        userId,
        pipelinesIds,
    })), {
        excludeExtraneousValues: true, // Explicitly exclude extra properties
    });



  }

