import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class Order {
    @PrimaryColumn()
    order_id: number;

    @Column("json")
    order_content: any; // JSON type
}

@Entity()
export class PopulateOrdersSummary {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("decimal", {precision: 20, scale: 0})
    orders_sum_price: number;

    @Column("decimal", {precision: 20, scale: 0})
    orders_max_price: number;

    @Column("decimal", {precision: 20, scale: 0})
    orders_average_price: number;

    @Column()
    orders_count: number;
}


@Entity()
export class PopulateOrdersSellersMost {
    @PrimaryColumn()
    seller_id: number;

    @PrimaryColumn()
    seller_title: string;

    @PrimaryColumn()
    seller_url: string;

    @Column()
    repetition_count: number;
}


@Entity()
export class PopulateOrdersProductsMost{
    @PrimaryColumn()
    product_id: number;

    @Column()
    title_fa: string;  

    @Column()
    product_count: number;
}

@Entity()
export class PopulateOrderProductPriceExpensive {
    @PrimaryColumn()
    product_id: number;

    @Column()
    title_fa: string;  
    
    @Column()
    quantity: number;

    @Column("decimal", {precision: 10, scale: 0})
    rrp_price: number;

    @Column("decimal", {precision: 10, scale: 0})
    selling_price: number;

    @Column("decimal", {precision: 5, scale: 0})
    discount_percent: number;
}
@Entity()
export class populateOrdersProductsCategoriesInfo {

        @PrimaryGeneratedColumn()
        id: number;
    
        @Column()
        item_category2: string;
    
        @Column()
        item_category3: string;
    
        @Column()
        count: number;
    
        @Column()
        max_price: number;
    
        @Column()
        avg_price: number;
    
        @Column()
        total_price: number;
    
        @Column()
        avg_discount: number;
    }
    
