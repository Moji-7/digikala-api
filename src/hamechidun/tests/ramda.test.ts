const R = require('ramda');

// Sample data
const data = [
  {
    "item_category2": "Electronics",
    "item_category3": "Laptops",
    "count": 1,
    "max_price": 549900,
    "avg_price": 549900,
    "total_price": 549900,
    "avg_discount": 45.00
  },
  {
    "item_category2": "Electronics",
    "item_category3": "mobile",
    "count": 1,
    "max_price": 1599000,
    "avg_price": 1599000,
    "total_price": 1599000,
    "avg_discount": 15.00
  },
  {
    "item_category2": "Electronics",
    "item_category3": "mobile",
    "count": 1,
    "max_price": 291000,
    "avg_price": 291000,
    "total_price": 291000,
    "avg_discount": 18.00
  }
];

// Function to group the data and perform calculations
function calculateGroupedData(data) {
  const groupedData = R.groupBy(R.prop('item_category2'), data);

  const result = R.mapObjIndexed((group) => {
    return {
      count: R.sum(R.pluck('count', group)),
      max_price: R.apply(Math.max, R.pluck('max_price', group)),
      avg_price: R.mean(R.pluck('avg_price', group)),
      total_price: R.sum(R.pluck('total_price', group)),
      avg_discount: R.mean(R.pluck('avg_discount', group))
    };
  }, groupedData);

  return result;
}

// Jest test
test('calculateGroupedData should correctly group the data and perform calculations', () => {
  // Expected result
  const expectedResult = {
    Electronics: {
      count: 3,
      max_price: 1599000,
      avg_price: (549900 + 1599000 + 291000) / 3,
      total_price: 2430900,
      avg_discount: (45.00 + 15.00 + 18.00) / 3
    }
  };

  // Call the function
  const result = calculateGroupedData(data);

  // Check if the result matches the expected result
  expect(result).toEqual(expectedResult);
});
