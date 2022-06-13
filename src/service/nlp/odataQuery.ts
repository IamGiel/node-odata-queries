import { urlencoded } from 'express';
import buildQuery from 'odata-query';
import { consumers } from 'stream';
import { LuisSampleOne, PriceTable } from '../../../sampleData/dummy_data';
import { IEntities, ILuis } from '../../models/interfaces/luisInterface';
import { intent_Supplier_Category_search, intent_category_priceCheck, intent_people_check } from '../../models/labels';


export interface IOdataQuery {
  odataURI: any,
  odataURIv2: any,
  query: string,
  resource: any,
  mappedEntities: IPriceEntityMapping
}

// type any -> so we can capture null default values
export interface IPriceEntityMapping {
  filterContains?: any,
  filterCategoryName?:any,
  filterSubCategoryName?:any,
  category?:any,
  pricingOutlook?: any,
  overviewEntity?: any,
  gradeEntity?: any,
  geographyV2?:any,
  trendEntity?: any,
  categoryNameEntity?:any,
  priceEntity?:any,
  datetimeV2?:any,
  ascendingEntity?:any,
  descendingEntity?:any,
  serviceRootName?:any,
  sort?:any,
}
export const odataQuery = (entity: ILuis) => {  
  const oq: IOdataQuery = getIntentAndOdataQuery(entity);
  return oq;
}

const output: IPriceEntityMapping = {};

const getIntentAndOdataQuery = (luis: ILuis) => {
  if (luis && luis.prediction.topIntent) {
    const topIntent: string = luis.prediction.topIntent;    
    let queryUrl;
    switch (topIntent) {
      case intent_category_priceCheck():
        queryUrl = prepOdataQuery(luis, topIntent);
        return queryUrl;
        break;
      case intent_Supplier_Category_search():
        queryUrl = prepOdataQuery(luis, topIntent);
        return queryUrl;
        break;
      default:
    }
  }
}

const getResourceName = (intent) => {
  let serviceRootName: any = null;
  if (intent === intent_category_priceCheck()) {
    output.serviceRootName =`marketprice/Prices?`
    return serviceRootName = "marketprice/Prices?"
  }
  if (intent === intent_Supplier_Category_search()) {
    output.serviceRootName =`"ShortListApi"`
    return serviceRootName = "ShortListApi"
  }
  return serviceRootName;

}

const getEntityMapping = (entities: IEntities) => {
  // const output: IPriceEntityMapping = {};

  const hasPricingOutlook: boolean = entities['$instance'].hasOwnProperty("pricingOutlook");
  const hasPricingOverview: boolean = entities['$instance'].hasOwnProperty("overviewEntity");
  const hasSubCategoryName: boolean = entities['$instance'].hasOwnProperty("categoryNameEntity");
  const hasCategoryNameV2: boolean = entities['$instance'].hasOwnProperty("categoryName_v2");
  const hasDateTimeV2: boolean = entities['$instance'].hasOwnProperty("datetimeV2");
  const hasGradeEntity: boolean = entities['$instance'].hasOwnProperty("gradeEntity");
  const hasTrendEntity: boolean = entities['$instance'].hasOwnProperty("trendEntity");
  const hasGeographyV2: boolean = entities['$instance'].hasOwnProperty("geographyV2");

  // $filter=contains()
  if (hasSubCategoryName) {
    output.filterSubCategoryName = `sub_category_name`;
  }
  if (hasCategoryNameV2) {
    output.filterCategoryName = `category_name`;
  }
  // entity map to skill (will influence how to render data)
  if (hasPricingOutlook) {
    output.pricingOutlook = `market_outlook`;
  }
  if (hasDateTimeV2) {
    output.datetimeV2 = `actual_period`;
  }
  if (hasGeographyV2) {
    output.geographyV2 = `location_name`;
  }
  if (hasTrendEntity) {
    output.trendEntity = `percentage_change`;
  }
  if (hasPricingOverview) {
    output.overviewEntity = `market_overview`;
  }
  if (hasGradeEntity) {
    output.gradeEntity = `grade_name`;
  }  
  return output
}

const getAscDesc = (entities: IEntities) => {

  const hasDescending: boolean = entities['$instance'].hasOwnProperty("descendingEntity");
  const hasAscending: boolean = entities['$instance'].hasOwnProperty("ascendingEntity");
  if (hasAscending) {
    output.ascendingEntity = `asc`;
    output.sort = `asc`;
  } else if (hasDescending) {
    output.descendingEntity = `desc`
    output.sort = `desc`;
  } else {
    output.descendingEntity = null;
    output.ascendingEntity = null;
    output.sort = `asc`; // asc by default if null (since price and dates favor ascending)
  }
  return output.sort;
}

const orderByOp = (entities: IEntities) => {
  const hasPriceEntity: boolean = entities['$instance'].hasOwnProperty("priceEntity");
  const hasDateEntity: boolean = entities['$instance'].hasOwnProperty("datetimeV2");
  const hasGradeEntity: boolean = entities['$instance'].hasOwnProperty("gradeEntity");
  let orderBy: any = null;

  // orderBy options ===========
  // if priceEntity orderBy price
  if (hasPriceEntity) {    
    output.priceEntity = `price_point`;
    orderBy = `price_point`;
  } else if (hasDateEntity) {    
    output.datetimeV2 = `actual_period`;
    orderBy = `actual_period`;
  }
  else if (hasGradeEntity) {    
    output.gradeEntity = `grade_name`;
    orderBy = `grade_name`;
  }
  return orderBy;
}

const getCategory = (entities: IEntities) => {
  // console.log("IENTITIES ------------- \n ", entities.hasOwnProperty("categoryNameEntity"));

  // subcategoryName is a skill in luis = categoryNameEntity
  let hasSubCategoryName: boolean = entities.hasOwnProperty("categoryNameEntity");
  let hasCategoryNamev2: boolean = entities.hasOwnProperty("categoryName_v2");
  if(hasSubCategoryName){
    output.categoryNameEntity = output.filterSubCategoryName;
    output.category = String(entities.categoryNameEntity[0][0])
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
  } else if (hasCategoryNamev2){
    output.categoryNameEntity = output.filterCategoryName;
    output.category = String(entities.categoryName_v2[0][0])
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
  } else {
    output.category = null;
  };

  return output.category;


 
}

const topSkip = (resourceName) => {
  // GET serviceRoot/People?$top=2
}

const select = (resourceName) => {
  // GET serviceRoot/Airports?$select=Name, IcaoCode
}

const prepOdataQuery = (luis: ILuis, intent: string): IOdataQuery => {
  const skillEntityMapping: IPriceEntityMapping = getEntityMapping(luis.prediction.entities);
  const categoryName = getCategory(luis.prediction.entities);
  const resourceName = getResourceName(intent);
  const ascDescOperator = getAscDesc(luis.prediction.entities);
  const orderByOperator = orderByOp(luis.prediction.entities) // `&$orderby=${orderByOp(luis.prediction.entities)} `;
  const baseQuery = `${resourceName}$filter=contains(${skillEntityMapping.categoryNameEntity},\'${categoryName}\')`;
  const baseQuery_eq = `${resourceName}$filter=${skillEntityMapping.filterContains} eq \'${categoryName}\'`;
  const urlConfigs = `&%24format=JSON&%24top=10&%24skip=0&%24count=true`;
  const resultArr: any = [];

  resultArr.push(baseQuery);
  if (orderByOperator !== null) {
    resultArr.push(`&$orderby=${orderByOp(luis.prediction.entities)} ${ascDescOperator}`);
  }
  return {
    resource: intent,
    query: luis.query,
    odataURI: `${encodeURI(resultArr.join(''))}${urlConfigs}`,
    odataURIv2:``,
    mappedEntities: skillEntityMapping
  };
};


  // url: 'https://datahub-stage.beroelive.ai/api/v1/marketprice/Prices?$filter=contains(market_outlook,\'witnessed\')&$orderby=price_point%20asc&%24format=JSON&%24top=10&%24skip=0&%24count=true',



