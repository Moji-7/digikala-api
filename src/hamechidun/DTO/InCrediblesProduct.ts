type IProductsDetails = {
  price: IPrice;
  seller: ISeller;
};

type IIncredibleInfo = {
  id: number;
  price: IPrice;
  seller: ISeller;
};

type IIncrediblesWithProducts = {
  incredible: IIncredibleInfo;
  Products: IProductsDetails[];
};

type ISeller = {
    seller_id: string;
  seller_title: string;
};
type IPrice = {
  min_price_in_last_month: number;
  selling_price: number;
  discount_percent: number;
  rrp_price: number;
};
// // change the type definitions to match the data array
// type IProductsDetails = {
//   product_selling_price: number;
//   product_discount_percent: number;
//   product_seller_id: string;
//   product_seller_title: string;
// };

// type IIncredibleInfo = {
//   id: number;
//   min_price_in_last_month: number;
//   selling_price: number;
//   discount_percent: number;
//   rrp_price: number;
//   seller_title: string;
//   inc_seller_id: string;
// };

// type IIncrediblesWithProducts = {
//   Incredible: IIncredibleInfo;
//   Product_Details: IProductsDetails[];
// };
