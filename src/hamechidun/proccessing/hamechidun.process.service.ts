// orders-grouping.provider.ts
import { Injectable } from '@nestjs/common';
const R = require('ramda');

@Injectable()
export class ProcessingService {
  public OrdersGroupingByCategories23 = (
    data,
    categoryField,
    is_item_category3,
  ) => {
    const groupedData = R.groupBy(R.prop(categoryField), data);
    const result = R.map((group) => {
      const categoryTitle = R.head(group)[categoryField];
      const parentCategory = is_item_category3
        ? R.head(group)['item_category2']
        : null;
      return {
        category: {
          name: categoryField,
          title: categoryTitle,
          parent: parentCategory,
          count: R.sum(R.pluck('count', group)),
          max_price: R.apply(Math.max, R.pluck('max_price', group)),
          avg_price: Math.round(R.mean(R.pluck('avg_price', group))),
          total_price: R.sum(R.pluck('total_price', group)),
          avg_discount: Math.round(R.mean(R.pluck('avg_discount', group))),
          childs: [],
        },
      };
    }, R.values(groupedData));
    return result;
  };
  // public IncrediblesWithSameProducts = (data: any[]): IIncrediblesWithProducts[] => {
  //   const groupedData = R.groupBy(R.prop('Incredibles_ID'))(data);
  //   const result = R.map(
  //     (val) => R.pluck('Products_Selling_Price', val),
  //     groupedData,
  //   );
  //   return result;
  // };

  //const transformData = (data: any[]): IIncrediblesPrice[] => {
  public IncrediblesWithSameProducts = (
    data: any[],
  ): IIncrediblesWithOtherAll[] => {
    const groupedData = R.groupBy(R.prop('product_id'), data);
    const result = R.mapObjIndexed((val, key) => ({
      incredible: R.pick(
        [
          'product_id',
          'title_fa',
          'inc_minPriceInLastMonth',
          'inc_price',
          'inc_discountPercent',
          'inc_rrpPrice',
          'inc_sellerTitle',
          'inc_sellerId',
        ],
        R.head(val),
      ) as IIncredibleInfo,
      otherSellers: R.map(
        (v) =>
          R.pick(
            [
              'price',
              'discountPercent',
              'rrpPrice',
              'sellerId',
              'sellerTitle',
            ],
            v,
          ) as any,
        val,
      ),
    }))(groupedData);
    return R.values(result);
  };

  // public IncrediblesWithSameProducts = (data: any[]): IIncrediblesWithProducts[] => {
  //   const groupedData = R.groupBy(R.prop('Incredibles_ID'), data);

  //   const result = R.mapObjIndexed((val, key) => ({
  //     increPrice: parseInt(key),
  //     prices: R.map((v) => ({ Details: v.Products_Selling_Price }), val),
  //   }))(groupedData);

  //   return R.values(result);
  // };
}
