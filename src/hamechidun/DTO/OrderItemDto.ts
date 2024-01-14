import { IsBoolean, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class OrderItemDto {
    @IsOptional()
    @IsNumberString()
    quantity: number;
    
    @IsOptional()
    @IsString()
    product_id: number;
    
    @IsOptional()
    @IsString()
    product_title_fa: string;
    
    @IsOptional()
    @IsString()
    product_title_en: string;

    @IsOptional()
    @IsString()
    brand: string;
    
    @IsOptional()
    @IsString()
    category: string;
    
    @IsOptional()
    @IsString()
    item_category2: string;
    
    @IsOptional()
    @IsString()
    item_category3: string;
    
    @IsOptional()
    @IsNumberString()
    rrp_price: number;
    
    @IsOptional()
    @IsNumberString()
    selling_price: number;
    
    @IsOptional()
    @IsNumberString()
    discount_percent: number;
    
    @IsOptional()
    @IsBoolean()
    is_incredible: boolean;
    
    @IsOptional()
    @IsBoolean()
    is_promotion: boolean;
    
    @IsOptional()
    @IsBoolean()
    bnpl_active: boolean;
    
    @IsOptional()
    @IsNumberString()
    seller_id: number;
    
    @IsOptional()
    @IsString()
    seller_title: string;
    
    @IsOptional()
    @IsString()
    seller_code: string;

    @IsOptional()
    @IsString()
    seller_url: string;
    
    @IsOptional()
    @IsString()
    sortColumn: string;
    
    @IsOptional()
    @IsString()
    sortType: string;
    
    
}
