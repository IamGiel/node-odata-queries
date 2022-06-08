export const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
};

export const USER_MGMT = {
  ROLE: ROLE,
  users: [
    {
      id: 1,
      name: "Gel",
      email: "Gel@mail.com",
      password: "Test123",
      role: ROLE.ADMIN
    }, {
      id: 2,
      name: "Sunny",
      email: "Sunny@mail.com",
      password: "Test123",
      role: ROLE.BASIC
    }, {
      id: 1,
      name: "Shawn",
      email: "Shawn@mail.com",
      password: "Test123",
      role: ROLE.BASIC
    }, {
      id: 1,
      name: "Isaac",
      email: "Isaac@mail.com",
      password: "Test123",
      role: ROLE.BASIC
    },
  ],
  page: [
    {
      id: 1,
      name: "Gel's personal page",
      userId: 1
    }, {
      id: 2,
      name: "Sunny's personal page",
      userId: 2
    }, {
      id: 3,
      name: "Shawn's personal page",
      userId: 3
    }, {
      id: 4,
      name: "Isaac's personal page",
      userId: 4
    },
  ]
}

export const OOperators = {
  filter: '$filter',
  expand: '$expand',
  select: '$select',
  orderby: '$orderby',
  top: '$top',
  skip: '$skip',
  count: "$count",
  relational: {
    greaterThan: "gt",
    gtOrEq: "ge",
    lessThan: "le",
    ltOrEq: "le",
    equal: "eq",
    notEq: "ne"
  },
  conditional: {
    and: "and",
    or: "or"
  }
}

export const LuisSampleOne = {
  "query": "what is the highest price of nylon from nov 2021 to dec 2021",
  "prediction": {
    "topIntent": "intent_category_priceCheck",
    "intents": {
      "intent_category_priceCheck": {
        "score": 0.9292369
      },
      "intent_peopleQueries": {
        "score": 0.10850245
      },
      "None": {
        "score": 0.0037906375
      }
    },
    "entities": {
      "orderByEntity": ["highest"],
      "priceEntity": ["price"],
      "categoryNameEntity": [
        ["Nylon"]
      ],
      "datetimeV2": [
        {
          "type": "daterange",
          "values": [
            {
              "timex": "(2021-11-01,2021-12-01,P1M)",
              "resolution": [
                {
                  "start": "2021-11-01",
                  "end": "2021-12-01"
                }
              ]
            }
          ]
        }
      ],
      "number": [
        2021, 2021
      ],
      "$instance": {
        "orderByEntity": [
          {
            "type": "orderByEntity",
            "text": "highest",
            "startIndex": 12,
            "length": 7,
            "score": 0.98632795,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "priceEntity": [
          {
            "type": "priceEntity",
            "text": "price",
            "startIndex": 20,
            "length": 5,
            "score": 0.9947761,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "categoryNameEntity": [
          {
            "type": "categoryNameEntity",
            "text": "nylon",
            "startIndex": 29,
            "length": 5,
            "modelTypeId": 5,
            "modelType": "List Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "datetimeV2": [
          {
            "type": "builtin.datetimeV2.daterange",
            "text": "from nov 2021 to dec 2021",
            "startIndex": 35,
            "length": 25,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "number": [
          {
            "type": "builtin.number",
            "text": "2021",
            "startIndex": 44,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }, {
            "type": "builtin.number",
            "text": "2021",
            "startIndex": 56,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ]
      }
    }
  }
}

export const LuisSamplePeople = {
  "query": "which person travelled most miles from nov 2021 to dec 2021 in Los Angeles",
  "prediction": {
    "topIntent": "intent_people_check",
    "intents": {
      "intent_people_check": {
        "score": 0.77349436
      },
      "intent_category_priceCheck": {
        "score": 0.3761168
      },
      "None": {
        "score": 0.0035745504
      }
    },
    "entities": {
      "peopleEntity": ["person"],
      "tripsEntity": ["travelled"],
      "orderByEntity": ["most"],
      "dimension": [
        {
          "number": 0,
          "units": "Mile"
        }, {
          "number": 2021,
          "units": "Inch"
        }
      ],
      "datetimeV2": [
        {
          "type": "daterange",
          "values": [
            {
              "timex": "(2021-11-01,2021-12-01,P1M)",
              "resolution": [
                {
                  "start": "2021-11-01",
                  "end": "2021-12-01"
                }
              ]
            }
          ]
        }
      ],
      "number": [
        2021, 2021
      ],
      "geographyV2": [
        {
          "value": "Los Angeles",
          "type": "city"
        }
      ],
      "$instance": {
        "peopleEntity": [
          {
            "type": "peopleEntity",
            "text": "person",
            "startIndex": 6,
            "length": 6,
            "score": 0.64136654,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "tripsEntity": [
          {
            "type": "tripsEntity",
            "text": "travelled",
            "startIndex": 13,
            "length": 9,
            "score": 0.99247473,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "orderByEntity": [
          {
            "type": "orderByEntity",
            "text": "most",
            "startIndex": 23,
            "length": 4,
            "score": 0.5599602,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "dimension": [
          {
            "type": "builtin.dimension",
            "text": "miles",
            "startIndex": 28,
            "length": 5,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }, {
            "type": "builtin.dimension",
            "text": "2021 in",
            "startIndex": 55,
            "length": 7,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "datetimeV2": [
          {
            "type": "builtin.datetimeV2.daterange",
            "text": "from nov 2021 to dec 2021",
            "startIndex": 34,
            "length": 25,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "number": [
          {
            "type": "builtin.number",
            "text": "2021",
            "startIndex": 43,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }, {
            "type": "builtin.number",
            "text": "2021",
            "startIndex": 55,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "geographyV2": [
          {
            "type": "builtin.geographyV2.city",
            "text": "Los Angeles",
            "startIndex": 63,
            "length": 11,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ]
      }
    }
  }
}

export const LuisSampleV3 = {
  "query": "top 20 beverage can suppliers in Asia 2021",
  "prediction": {
    "topIntent": "intent_Supplier_Category_search",
    "intents": {
      "intent_Supplier_Category_search": {
        "score": 0.90950704
      },
      "intent_category_priceCheck": {
        "score": 0.083819866
      },
      "intent_people_check": {
        "score": 0.009842156
      },
      "None": {
        "score": 0.002087924
      }
    },
    "entities": {
      "theTopList": [
        {}
      ],
      "descendingEntity": ["top"],
      "number": [],
      "categoryNameEntity": [
        ["Beverage Cans"]
      ],
      "supplier": ["suppliers"],
      "geographyV2": [
        {
          "value": "Asia",
          "type": "continent"
        }
      ],
      "datetimeV2": [
        {
          "type": "daterange",
          "values": [
            {
              "timex": "2021",
              "resolution": [
                {
                  "start": "2021-01-01",
                  "end": "2022-01-01"
                }
              ]
            }
          ]
        }
      ],
      "$instance": {
        "theTopList": [
          {
            "type": "theTopList",
            "text": "top 20",
            "startIndex": 0,
            "length": 6,
            "score": 0.9631157,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "descendingEntity": [
          {
            "type": "descendingEntity",
            "text": "top",
            "startIndex": 0,
            "length": 3,
            "score": 0.9598754,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "number": [
          {
            "type": "builtin.number",
            "text": "20",
            "startIndex": 4,
            "length": 2,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }, {
            "type": "builtin.number",
            "text": "2021",
            "startIndex": 38,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "categoryNameEntity": [
          {
            "type": "categoryNameEntity",
            "text": "beverage can",
            "startIndex": 7,
            "length": 12,
            "modelTypeId": 5,
            "modelType": "List Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "supplier": [
          {
            "type": "supplier",
            "text": "suppliers",
            "startIndex": 20,
            "length": 9,
            "score": 0.9852191,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "geographyV2": [
          {
            "type": "builtin.geographyV2.continent",
            "text": "Asia",
            "startIndex": 33,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "datetimeV2": [
          {
            "type": "builtin.datetimeV2.daterange",
            "text": "2021",
            "startIndex": 38,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ]
      }
    }
  }
};


// price outlook
export const LuisSamplv4 = {
  "query": "what is the price outlook for nylon on nov 2022 to dec 2022",
  "prediction": {
    "topIntent": "intent_category_priceCheck",
    "intents": {
      "intent_category_priceCheck": {
        "score": 0.95414263
      },
      "intent_Supplier_Category_search": {
        "score": 0.027168524
      },
      "intent_people_check": {
        "score": 0.020375635
      },
      "None": {
        "score": 0.00152678
      }
    },
    "entities": {
      "priceEntity": ["price"],
      "pricingOutlook": ["outlook"],
      "categoryNameEntity": [
        ["Nylon"]
      ],
      "datetimeV2": [
        {
          "type": "daterange",
          "values": [
            {
              "timex": "(2022-11-01,2022-12-01,P1M)",
              "resolution": [
                {
                  "start": "2022-11-01",
                  "end": "2022-12-01"
                }
              ]
            }
          ]
        }
      ],
      "number": [
        2022, 2022
      ],
      "fromTo": ["to"],
      "$instance": {
        "priceEntity": [
          {
            "type": "priceEntity",
            "text": "price",
            "startIndex": 12,
            "length": 5,
            "score": 0.9457892,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "pricingOutlook": [
          {
            "type": "pricingOutlook",
            "text": "outlook",
            "startIndex": 18,
            "length": 7,
            "score": 0.78677666,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "categoryNameEntity": [
          {
            "type": "categoryNameEntity",
            "text": "nylon",
            "startIndex": 30,
            "length": 5,
            "modelTypeId": 5,
            "modelType": "List Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "datetimeV2": [
          {
            "type": "builtin.datetimeV2.daterange",
            "text": "nov 2022 to dec 2022",
            "startIndex": 39,
            "length": 20,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "number": [
          {
            "type": "builtin.number",
            "text": "2022",
            "startIndex": 43,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }, {
            "type": "builtin.number",
            "text": "2022",
            "startIndex": 55,
            "length": 4,
            "modelTypeId": 2,
            "modelType": "Prebuilt Entity Extractor",
            "recognitionSources": ["model"]
          }
        ],
        "fromTo": [
          {
            "type": "fromTo",
            "text": "to",
            "startIndex": 48,
            "length": 2,
            "score": 0.7529114,
            "modelTypeId": 1,
            "modelType": "Entity Extractor",
            "recognitionSources": ["model"]
          }
        ]
      }
    }
  }
}


export const PriceTable = {
  "fc_id": "fc_id",
  "accuracy_12_months": "accuracy_12_months",
  "accuracy_3_months": "accuracy_3_months",
  "accuracy_6_months": "accuracy_6_months",
  "actual_period": "actual_period",
  "actual_period_str": "actual_period_str",
  "base_period": "base_period",
  "category_id": "category_id",
  "category_name": "category_name",
  "currency": "currency",
  "dtype": "dtype",
  "feedstock": "feedstock",
  "feedstock_id": "feedstock_id",
  "grade_id": "grade_id",
  "grade_name": "grade_name",
  "grade_type_id": "grade_type_id",
  "grade_type_name": "grade_type_name",
  "guidance": "guidance",
  "hovering_indicator": "hovering_indicator",
  "inflation_cpi": "inflation_cpi",
  "location_id": "location_id",
  "location_code": "location_code",
  "location_name": "location_name",
  "margin": "margin",
  "market_outlook": "market_outlook",
  "market_overview": "market_overview",
  "naics_code": "naics_code",
  "naics_name": "naics_name",
  "overheads": "overheads",
  "overheads_currency": "overheads_currency",
  "overheads_percentage": "overheads_percentage",
  "overheads_unit": "overheads_unit",
  "percentage_change": "percentage_change",
  "period_interval": "period_interval",
  "price_id": "price_id",
  "price_point": "price_point",
  "related_sub_category": "related_sub_category",
  "related_sub_category_id": "related_sub_category_id",
  "salary_cost": "salary_cost",
  "salary_cost_currency": "salary_cost_currency",
  "salary_cost_unit": "salary_cost_unit",
  "salary_percentage": "salary_percentage",
  "social_security_and_benefits": "social_security_and_benefits",
  "social_security_and_benefits_unit": "social_security_and_benefits_unit",
  "sources": "sources",
  "sub_category_id": "sub_category_id",
  "sub_category_name": "sub_category_name",
  "sub_category_type": "sub_category_type",
  "sub_category_uuid": "sub_category_uuid",
  "substitute": "substitute",
  "substitute_id": "substitute_id",
  "unit": "unit",
  "unspsc_code": "unspsc_code",
  "unspsc_name": "unspsc_name"
} 
