```
{
  constructedDataQuery: {
    resource: 'intent_category_priceCheck',
    query: 'What is the price forecast for stainless steel in USA on Dec 12, 2024',
    odataURI: "marketprice/Prices?$filter=contains(sub_category_name,'Stainless Steel') and actual_period eq 2024-12-12T00:00:00.000Z&$select=actual_period,price_point,unit,currency,location_name,percentage_change,sub_category_name&$orderby=price_point desc&$format=JSON&$top=10&$skip=0&$count=true",
    odataURIv2: "marketprice/Prices?$filter=sub_category_name eq 'Stainless Steel' and actual_period eq 2024-12-12T00:00:00.000Z&$format=JSON&$top=10&$skip=0&$count=true",
    mappedEntities: {
      select: [Array],
      serviceRootName: 'marketprice/Prices?',
      pricingOutlook: 'market_outlook',
      datetimeV2: [Object],
      dateType: 'date',
      sort: 'desc',
      priceEntity: [Object],
      geographyV2: [Object],
      trendEntity: [Object],
      categoryNameEntity: 'sub_category_name',
      category: 'Stainless Steel',
      format: '&$format=JSON&$top=10&$skip=0&$count=true'
    }
  }
}
```

```
{
  constructedDataQuery: {
    resource: 'intent_category_priceCheck',
    query: 'What is the price forecast for stainless steel in USA for the next 6 months',
    odataURI: "marketprice/Prices?$filter=contains(sub_category_name,'Stainless Steel') and actual_period gt '<some-UTC-date>' and actual_period lt '<some-UTC-date>'&$select=actual_period,price_point,unit,currency,location_name,percentage_change,sub_category_name&$orderby=price_point desc&$format=JSON&$top=10&$skip=0&$count=true",
    odataURIv2: "marketprice/Prices?$filter=sub_category_name eq 'Stainless Steel' and actual_period gt 2022-06-25T00:00:00.000Z and actual_period lt 2022-12-25T00:00:00.000Z&$format=JSON&$top=10&$skip=0&$count=true",
    mappedEntities: {
      serviceRootName: 'marketprice/Prices?',
      select: [Array],
      pricingOutlook: 'market_outlook',
      datetimeV2: [Object],
      dateType: 'daterange',
      sort: 'desc',
      priceEntity: [Object],
      geographyV2: [Object],
      trendEntity: [Object],
      categoryNameEntity: 'sub_category_name',
      category: 'Stainless Steel',
      format: '&$format=JSON&$top=10&$skip=0&$count=true'
    }
  }
}
```

```
{
  constructedDataQuery: {
    resource: 'intent_category_priceCheck',
    query: 'What is the quarterly price forecast for stainless steel in USA',
    odataURI: "marketprice/Prices?$filter=contains(sub_category_name,'Stainless Steel') and (calculate values in period of time)&$select=actual_period,price_point,unit,currency,location_name,percentage_change,sub_category_name&$orderby=price_point desc&$format=JSON&$top=10&$skip=0&$count=true",
    odataURIv2: "marketprice/Prices?$filter=sub_category_name eq 'Stainless Steel' and actual_period eq P3M&$format=JSON&$top=10&$skip=0&$count=true",
    mappedEntities: {
      serviceRootName: 'marketprice/Prices?',
      select: [Array],
      pricingOutlook: 'market_outlook',
      datetimeV2: [Object],
      dateType: 'set',
      sort: 'desc',
      priceEntity: [Object],
      geographyV2: [Object],
      trendEntity: [Object],
      categoryNameEntity: 'sub_category_name',
      category: 'Stainless Steel',
      format: '&$format=JSON&$top=10&$skip=0&$count=true'
    }
  }
}
```