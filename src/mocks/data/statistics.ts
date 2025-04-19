export const statisticsData = [
  {
    blandId: 1,
    modelId: 1,
    blandModelName: 'iPhone 13',
    soldItems: {
      itemCount: 2,
      averagePrice: 785,
      maxPrice: 820,
      minPrice: 750,
    },
    unSoldItems: {
      itemCount: 1,
      averagePrice: 700,
      maxPrice: 700,
      minPrice: 700,
    },
  },
  {
    blandId: 2,
    modelId: 3,
    blandModelName: 'PS5',
    soldItems: {
      itemCount: 1,
      averagePrice: 550,
      maxPrice: 550,
      minPrice: 550,
    },
    unSoldItems: {
      itemCount: 0,
      averagePrice: 0,
      maxPrice: 0,
      minPrice: 0,
    },
  },
  {
    blandId: 3,
    modelId: 5,
    blandModelName: 'Canon EOS R6',
    soldItems: {
      itemCount: 0,
      averagePrice: 0,
      maxPrice: 0,
      minPrice: 0,
    },
    unSoldItems: {
      itemCount: 2,
      averagePrice: 2000,
      maxPrice: 2200,
      minPrice: 1800,
    },
  },
]

export const blandStatisticsResponse = {
  statistics: {
    modelId: 1,
    blandModelName: 'iPhone 13',
    soldItems: [
      {
        itemName: 'iPhone 13 - 128GB',
        itemPrice: 799,
        itemShippingCost: 20,
      },
      {
        itemName: 'iPhone 13 - 256GB',
        itemPrice: 899,
        itemShippingCost: 25,
      },
    ],
    unSoldItems: [
      {
        itemName: 'iPhone 13 - 128GB (Used)',
        itemPrice: 699,
        itemShippingCost: 15,
      },
      {
        itemName: 'iPhone 13 - 256GB (Used)',
        itemPrice: 799,
        itemShippingCost: 20,
      },
    ],
  },
}
