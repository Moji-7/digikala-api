// Define TypeScript type based on MySQL schema
type IIncredibles = {
    id: number;
    title_fa: string | null;
    title_en: string | null;
    url: string | null;
    brand: string | null;
    category: string | null;
    item_category2: string | null;
    item_category3: string | null;
    item_category4: string | null;
    item_category5: string | null;
    main_image_url: string | null;
    is_fast_shipping: number | null;
    is_ship_by_seller: number | null;
    min_price_in_last_month: number | null;
    seller_id: number | null;
    seller_title: string | null;
    seller_url: string | null;
    selling_price: number | null;
    rrp_price: number | null;
    order_limit: number | null;
    is_incredible: number | null;
    discount_percent: number | null;
    shipment_description: string | null;
    has_lead_time: number | null;
  };
  