import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, ObjectLiteral, Repository } from 'typeorm';
import { OrderItem } from './entity/OrderItem';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async get_orderItems1(itemCategory2: string): Promise<OrderItem[]> {
    const query = this.orderItemRepository
      .createQueryBuilder('OrderItem') // use the OrderItem alias
      .select('OrderItem.id', 'order_item_id')
      .addSelect('OrderItem.quantity', 'order_item_quantity')
      .addSelect('OrderItem.product_id', 'product_id')
      .from('orders', 'orders')
      .addFrom(
        `JSON_TABLE(
          orders.order_content,
          '$.order_item[*]'
          COLUMNS (
            id INT PATH '$.id',
            quantity INT PATH '$.quantity',
            product_id INT PATH '$.product.id'
          )
        )`,
        'jt',
      );

    const orderItems = await query.getRawMany();
    return orderItems;
  }

  async get_orderItems(
    product_title_fa: string,
    quantity: number,
    product_id: number,
    product_title_en: string,
    brand: string,
    category: string,
    item_category2: string,
    item_category3: string,
    rrp_price: number,
    selling_price: number,
    discount_percent: number,
    is_incredible: boolean,
    is_promotion: boolean,
    bnpl_active: boolean,
    seller_id: number,
    seller_title: string,
    seller_code: string,
    sortColumn: string,
    sortType: string,
  ): Promise<OrderItem[]> {
    let queryString = `SELECT
        jt.id AS order_item_id,
        jt.quantity AS order_item_quantity,
        jt.title_fa AS product_title_fa,
        jt.product_id AS product_id,
        jt.title_en AS title_en,
        jt.brand AS brand,
        jt.category AS category,
        jt.item_category2 AS item_category2,
        jt.item_category3 AS item_category3,
        jt.rrp_price AS rrp_price,
        jt.selling_price AS selling_price,
        jt.discount_percent AS discount_percent,
        jt.is_incredible AS is_incredible,
        jt.is_promotion AS is_promotion,
        jt.bnpl_active AS bnpl_active,
        jt.seller_id AS seller_id,
        jt.seller_title AS seller_title,
        jt.seller_code AS seller_code,
        jt.seller_url AS seller_url
        FROM orders,
             JSON_TABLE(
                 order_content,
                 '$.order_item[*]'
                 COLUMNS (
                  id INT PATH '$.id',
                  quantity INT PATH '$.quantity',
                  title_fa NVARCHAR(255) PATH '$.product.title_fa',
                  product_id INT PATH '$.product.id',
                  title_en NVARCHAR(255) PATH '$.product.title_en',
                  brand NVARCHAR(255) PATH '$.product.data_layer.brand',
                  category NVARCHAR(255) PATH '$.product.data_layer.category',
                  item_category2 NVARCHAR(255) PATH '$.product.data_layer.item_category2',
                  item_category3 NVARCHAR(255) PATH '$.product.data_layer.item_category3',
                  rrp_price DECIMAL(20, 0) PATH '$.price.rrp_price',
                  selling_price DECIMAL(20, 0) PATH '$.price.selling_price',
                  discount_percent DECIMAL(5, 0) PATH '$.price.discount_percent',
                  is_incredible BOOLEAN PATH '$.price.is_incredible',
                  is_promotion BOOLEAN PATH '$.price.is_promotion',
                  bnpl_active BOOLEAN PATH '$.price.bnpl_active',
                  seller_id INT PATH '$.variant.seller.id',
                  seller_title NVARCHAR(255) PATH '$.variant.seller.title',
                  seller_code NVARCHAR(255) PATH '$.variant.seller.code',
                  seller_url NVARCHAR(255) PATH '$.variant.seller.url'
                 )
             ) AS jt
             WHERE 
             1 = 1 
             AND
             (jt.title_fa like ?)
             AND
             (jt.quantity like ?)
             AND
             (jt.product_id like ?) 
             AND
             (jt.title_en like ?) 
             AND
             (jt.brand like ?) 
             AND
             (jt.category like ?) 
             AND
             (jt.item_category2 like ?) 
             AND
             (jt.item_category3 like ?) 
             AND
             (jt.rrp_price like ?) 
             AND
             (jt.selling_price like ?) 
             AND
             (jt.discount_percent like ?) 
             AND
             (jt.discount_percent like ?) 
             AND
             (jt.is_promotion like ?) 
             AND
             (jt.bnpl_active like ?) 
             AND
             (jt.seller_id like ?)
             AND
             (jt.seller_title like ?)
             AND
             (jt.seller_code like ?)
             AND
             (jt.seller_id like ?)

             ORDER BY ${sortColumn} ${sortType}
             `;

    let params = [
      product_title_fa ? `%${product_title_fa}%` : `%`,
      quantity ? `${quantity}` : `%`,
      product_id ? `${product_id}` : `%`,
      product_title_en ? `%${product_title_en}%` : `%`,
      brand ? `%${brand}%` : `%`,
      category ? `%${category}%` : `%`,
      item_category2 ? `%${item_category2}%` : `%`,
      item_category3 ? `%${item_category3}%` : `%`,
      rrp_price ? `${rrp_price}` : `%`,
      selling_price ? `${selling_price}` : `%`,
      discount_percent ? `${discount_percent}` : `%`,
      discount_percent ? `${is_incredible}` : `%`,
      is_promotion ? `${is_promotion}` : `%`,
      bnpl_active ? `${bnpl_active}` : `%`,
      seller_id ? `${seller_id}` : `%`,
      seller_title ? `%${seller_title}%` : `%`,
      seller_code ? `${seller_code}` : `%`,
      seller_id ? `${seller_id}` : `%`,
      sortColumn,
      sortType,
    ];

    // Execute the query with the params array
    const orderItems = await this.orderItemRepository.query(
      queryString,
      params,
    );
    return orderItems;
  }
}
