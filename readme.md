
Startup:
- Required files in the `.env` file (files contain credentials for LUIS and DATAHUB)
- `npm install`
- `npm run dev`
- install Rest Client for VSCODE
- call API in file test.http
- alternatively, you can use POSTMAN and copy the API URLS in the test.http file

Result example: 

```
>>>>>>>>>>>>>>>>>>>>>>> ODATA QUERY >>>>>>>>>>>>>>>>>> 
  {
    resource: 'intent_category_priceCheck',
    query: 'grade market overview for nylon from Nov 2021 to Dec 2021 price trends',
    odataURI: "marketprice/Prices?$filter=contains(sub_category_name,'Nylon')&$orderby=price_point%20asc&%24format=JSON&%24top=10&%24skip=0&%24count=true",
    mappedEntities: {
      filterContains: 'sub_category_name',
      trendEntity: 'percentage_change',
      overviewEntity: 'market_overview',
      gradeEntity: 'grade_name',
      serviceRootName: 'marketprice/Prices?',
      descendingEntity: null,
      ascendingEntity: null,
      sort: 'asc',
      priceEntity: 'price_point'
    }
}

```

High Level Overview: 
- identify api resource to trigger (intent) => Price
- indetify the entities for that resource
- identify NLP skills that maps to the entities for that resource
- evaluate, user questions, train NLP and map to entities
- prioritize default data to render (category name, price, date)
- optional entities to render (market outlook, market_overview)
- render by order (asc, desc ---> price, dates) 


Utterance Samples: 
- what is the price of soda ash last year
- market outlook for soda ash
- price for soda ash
- what is the price trends for soda ash
- what is the cheapest price trends for soda ash // asc price trends
- what is the lowest price of soda ash last year // desc price date
- market summary for nylon // entities to render
- grade for nylon with lowest cost
- grade for nylon with lowest
- best grade market overview for nylon for Dec 2022
- can you give the price for a lawyer in UK?
- historical prices for caustic soda
- Market price of Fluorosurfactants