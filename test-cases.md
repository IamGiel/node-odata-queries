 ```{
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
}```