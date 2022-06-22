 ```
 {
  resource: 'intent_category_priceCheck',
  query: 'On nov 14 1984 Petrol Prices in Singapore',
  odataURI: "marketprice/Prices?$filter=contains(category_name,'Energy')&$orderby=actual_period%20asc&%24format=JSON&%24top=10&%24skip=0&%24count=true",
  odataURIv2: "marketprice/Prices?$filter=category_name eq 'Energy' and actual_period eq 1984-11-14T00:00:00.000Z&$format=JSON&$top=10&$skip=0&$count=true",
  mappedEntities: {
    filterCategoryName: 'category_name',
    datetimeV2: { name: 'actual_period', value: '1984-11-14' },
    dateType: 'date',
    sort: 'asc',
    geographyV2: { name: 'location_name', value: [Object] },
    categoryNameEntity: 'category_name',
    category: 'Energy',
    serviceRootName: 'marketprice/Prices?'
  }
}

```

```
  {
  resource: 'intent_category_priceCheck',
  query: 'Past 12 months Petrol Prices in Singapore',
  odataURI: "marketprice/Prices?$filter=contains(category_name,'Energy')&$orderby=price_point%20desc&%24format=JSON&%24top=10&%24skip=0&%24count=true",
  odataURIv2: "marketprice/Prices?$filter=category_name eq 'Energy' and actual_period gt 2021-06-21T00:00:00.000Z and actual_period lt 2022-06-21T00:00:00.000Z&$format=JSON&$top=10&$skip=0&$count=true",
  mappedEntities: {
    filterCategoryName: 'category_name',
    datetimeV2: { name: 'actual_period', value: [Object] },
    dateType: 'daterange',
    sort: 'desc',
    priceEntity: { name: 'price_point', value: 'Prices' },
    geographyV2: { name: 'location_name', value: [Object] },
    categoryNameEntity: 'category_name',
    category: 'Energy',
    serviceRootName: 'marketprice/Prices?'
  }
}

```

```
 {
  resource: 'intent_category_priceCheck',
  query: 'hdpe price forecast ona quarterly basis can you provide the charts',
  odataURI: "marketprice/Prices?$filter=contains(sub_category_name,'Hdpe')&$orderby=price_point%20desc&%24format=JSON&%24top=10&%24skip=0&%24count=true",
  odataURIv2: "marketprice/Prices?$filter=sub_category_name eq 'Hdpe' and actual_period eq P3M&$format=JSON&$top=10&$skip=0&$count=true",
  mappedEntities: {
    filterSubCategoryName: 'sub_category_name',
    pricingOutlook: 'market_outlook',
    datetimeV2: { name: 'actual_period', value: 'P3M' },
    dateType: 'set',
    sort: 'desc',
    priceEntity: { name: 'price_point', value: 'price' },
    trendEntity: { name: 'percentage_change', value: 'price forecast' },
    categoryNameEntity: 'sub_category_name',
    category: 'Hdpe',
    serviceRootName: 'marketprice/Prices?'
  }
}

```