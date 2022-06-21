
## Startup:
- Required files in the `.env` file (files contain credentials for LUIS and DATAHUB)
- `npm install`
- `npm run dev`
- install Rest Client for VSCODE
- call API in file test.http
- alternatively, you can use POSTMAN and copy the API URLS in the test.http file

## API to call:

GET http://localhost:3000/odata/startQuery
Content-Type: application/json
Authorization: Bearer {{$processEnv ACCESS_TOKEN_SECRET}}

{
  "userInput":"how much is a lawyer in japan"
}

GET http://localhost:3000/odata/getOdataQuery
Content-Type: application/json
Authorization: Bearer {{$processEnv ACCESS_TOKEN_SECRET}}

{
  "userInput":"Hello, i am looking for rutine raw material volumes and price in 2021 compared to previous years"
}

## Result example: 

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

## High Level Overview: 
- identify api resource to trigger (intent) => Price
- indetify the entities for that resource
- identify NLP skills that maps to the entities for that resource
- evaluate, user questions, train NLP and map to entities
- prioritize default data to render (category name, price, date)
- optional entities to render (market outlook, market_overview)
- render by order (asc, desc ---> price, dates) 


## ENTITY SKILLS vs TRIGGER SKILLS

ENTITY SKILLS are NLP entities that targets a specific Datahub Resource API DB fields.  For example, 
  - `datetimeV2` = is mapped to `actual_period` (a DH field).  We then collect the value of the dates.
  - `geographyV2` = is mapped to `location_name` (a DH field).  We then collect the value of the location.
  - `categoryName_v2` and `categoryNameEntity` = are mapped to `category_name` and `sub_category_name` respectively.  We collect its value.

Some skills are not pushed in odataquery, they are TRIGGER SKILLS. Skills such as:
  - `pricingOutlook` = triggers pricing outlook - helps scope data to render (eg `market_outlook`)
  - `priceEntity` = triggers what resource to pull data from (price api)
  - `trendEntity` = triggers a resolver to calculate pricing trend for example (calculating the price of Nylon next year). It is also helps trigger some ODATA operators such as `lt` and `gt` when combined with `datetimeV2`.
  - `averageEntity` = triggers what resource to pull data from (average price api)
  - `overviewEntity` = triggers pricing overview - helps scope data to render (eg `market_overview`)

Some of TIGGER SKILLS, are created to trigger an ODATA operator.  For example:
  - `descendingEntity` will evaluate to `desc` operator
  - `ascendingEntity` will evaluate to `asc` operator

A combination of skills will trigger other operators.  For example given user input `highest prices for Nylon last year`  will return these: 

```
[
  'marketprice/Prices?$filter=', <--- priceEntity
  'sub_category_name ', <--- categoryNameEntity
  'eq', <--- auto generated
  ' Nylon ', <--- categoryNameEntity value
  'and ', <--- auto generated
  'actual_period', <--- datetimeV2
  ' gt ', <--- generated by combination of trendEntity and datetimeV2 with type daterange 
  '2021-01-01', <--- datetimeV2 start value
  ' lt ', <--- generated by combination of trendEntity and datetimeV2 with type daterange
  '2022-01-01' <--- datetimeV2 end value
]
```

## Utterance Samples: 
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
- best grade market overview for nylon for Dec 2022 historic prices
- best grade market overview for nylon from Nov 2021 to Dec 2021 price trends
- can you give the price for a lawyer in UK?
- historical prices for caustic soda
- Market price of Fluorosurfactants

## --- test: petrol ---
- historic prices for petrol in United States
- highest prices prices for petrol in United States
- prices prices for petrol in United States last year

## --- test: date (type date, type daterange) --- 
- highest historical prices for IT Services in United States Dec 25, 2021 // date
- highest historical prices for IT Services in United States Dec 2021 // daterange

## --- test: category vs subcategory ---
- I am looking price forecast 2022 for nylon
- I am looking price forecast 2022 for vitamins

## TODO NOTES:

Get Regions and unique values
Get Country Code and unique values
Make these Skills for Luis to detect unique country region values and map it to DB entity for country and region

DATAHUB update, operators (eq, and, or) are now implemented) need to evaluate how it can be utlized to optimize search
- which entities will likely be mapped to `eq` to get results
- for example ===== sub_category_name eq 'Aluminum' and actual_period_str eq 'Nov-2021'


EXAMPLES: 

accuracy_12_months eq 87 or accuracy_12_months eq 90
actual_period eq '2022-11-01T00:00:00Z' or actual_period eq '2022-12-01T00:00:00Z'
contains(market_outlook,'witnessed')
grade_id eq 'D122-01'

actual_period eq '2022-12-01T00:00:00Z' and feedstock_id eq 'D304' and fc_id eq 'b48ec86cd4dc-382b-4a23-0041-1eefcf67'
actual_period eq '2022-12-01T00:00:00Z' and feedstock_id eq 'D304'


POSSIBLE combination: 
categoryName and actual_period and market_outlook
categoryName and actual_period and market_outlook and price_point
categoryName and actual_period and market_outlook and price_point and grade_id

DATE:

There are two types of date 1) type `date` and 2) type `daterange`
1. date = if user inputs a specific date (eg Dec 2, 2021)
2. daterange = if user inputs a non specific date (eg Dec 2021) - no days specifiied. 

=== constraints ===
1. Category: needs value
2. Date: if exists prepend and if not exists dont add
3. Country: if exists, prepend and if not exists dont add -> (resolver detect location type) e,g "price of steel in Mexico"


``` mappedEntities: {
    filterCategoryName: 'category_name',
    pricingOutlook: 'market_outlook',
    datetimeV2: { name: 'actual_period', value: [Object] },
    dateType: 'daterange',
    priceEntity: { name: 'price_point', value: 'price' },
    trendEntity: { name: 'percentage_change', value: 'price forecast' },
    categoryNameEntity: 'category_name',
    category: null,
    serviceRootName: 'marketprice/Prices?',
    descendingEntity: null,
    ascendingEntity: null,
    sort: 'asc'
  }

```

## Latest
--- 
Utterance: "What is the price forecast for stainless steel in USA"

result: "marketprice/Prices?$filter=sub_category_name eq 'Stainless Steel' and actual_period gt '2022-07-01' lt '2022-08-01'&%24format=JSON&%24top=10&%24skip=0&%24count=true"
---

---
Utterance: "What is the price forecast for stainless steel in USA next month"

result: "marketprice/Prices?$filter=sub_category_name eq 'Stainless Steel' and actual_period gt '2022-07-01' lt '2022-08-01'&%24format=JSON&%24top=10&%24skip=0&%24count=true"
---

---
Utterance: "What is the price forecast for stainless steel in USA for the next 6 months"

result: "marketprice/Prices?$filter=sub_category_name eq 'Stainless Steel' and actual_period gt '2022-06-21' lt '2022-12-21'&%24format=JSON&%24top=10&%24skip=0&%24count=true"
---




