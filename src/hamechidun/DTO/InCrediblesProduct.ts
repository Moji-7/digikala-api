type IIncredibleInfo = {
  id: number;
  price: IPrice;
  seller: ISeller;
};
type ISellersProductInfo = {
  price: IPrice;
  seller: ISeller;
};


type IIncrediblesWithOtherAll = {
  incredible: IIncredibleInfo;
  sellersProductInfo: ISellersProductInfo[];
};

type ISeller = {
  sellerId: string;
  sellerTitle: string;
};
type IPrice = {
  minPriceInLastMonth: number;
  sellingPrice: number;
  discountPercent: number;
  rrpPrice: number;
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
