import { urlencoded } from 'express';
import buildQuery from 'odata-query';
import { consumers } from 'stream';
import { LuisSampleOne, PriceTable } from '../../../sampleData/dummy_data';
import { IEntities, ILuis } from '../../models/interfaces/luisInterface';
import { intent_Supplier_Category_search, intent_category_priceCheck, intent_people_check } from '../../models/labels';
import { dateResolver } from '../resolvers/dateResolver';


export interface IOdataQuery {
  odataURI: any,
  odataURIv2?: any,
  query: string,
  resource: any,
  mappedEntities: IPriceEntityMapping
}

// type any -> so we can capture null default values
export interface IPriceEntityMapping {
  filterContains?: any,
  // filterCategoryName?:any,
  // filterSubCategoryName?:any,
  category?:any,
  pricingOutlook?: any,
  overviewEntity?: any,
  gradeEntity?: any,
  geographyV2?:any,
  trendEntity?: any,
  categoryNameEntity?:any,
  priceEntity?:any,
  datetimeV2?:any,
  dateType?:any,
  serviceRootName?:any,
  ordinalV2?:any,
  sort?:any,
  format?:any
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
  // console.log(`============= entities =============\n ${JSON.stringify(entities)}`)
  // Basically, these properties tells us which field values to render
  const hasPricingOutlook: boolean = entities['$instance'].hasOwnProperty("pricingOutlook");
  const hasPricingOverview: boolean = entities['$instance'].hasOwnProperty("overviewEntity");
  const hasDateTimeV2: boolean = entities['$instance'].hasOwnProperty("datetimeV2");
  const hasGradeEntity: boolean = entities['$instance'].hasOwnProperty("gradeEntity");
  const hasTrendEntity: boolean = entities['$instance'].hasOwnProperty("trendEntity");
  const hasGeographyV2: boolean = entities['$instance'].hasOwnProperty("geographyV2");
  const hasPriceEntity: boolean = entities['$instance'].hasOwnProperty("priceEntity");
  const hasSubCategoryName: boolean = entities.hasOwnProperty("categoryNameEntity");
  const hasCategoryNamev2: boolean = entities.hasOwnProperty("categoryName_v2");
  const urlConfigs = `&$format=JSON&$top=10&$skip=0&$count=true`;

  output.format = urlConfigs;
  
  if (hasPricingOutlook) {
    output.pricingOutlook = `market_outlook`;
  }
  if (hasDateTimeV2) {
    const resolvedDate = dateResolver(entities.datetimeV2[0]);
    console.log(`resolved date ${resolvedDate}`)
    output.datetimeV2 = {};
    output.datetimeV2.name = resolvedDate.fieldName;
    output.datetimeV2.value = resolvedDate.value;
    output.dateType = entities.datetimeV2[0].type;
    output.sort = `desc`;
  }
  if (hasPriceEntity) { 
    output.priceEntity = {};
    output.priceEntity.name = `price_point`;
    output.priceEntity.value = entities.priceEntity[0];
  }
  if (hasGeographyV2) {
    output.geographyV2 = {};
    output.geographyV2.name = `location_name`;
    output.geographyV2.value = entities.geographyV2[0]
  }
  if (hasTrendEntity) {
    output.trendEntity = {};
    output.trendEntity.name = `percentage_change`;
    output.trendEntity.value = entities.trendEntity[0];
  }
  if (hasPricingOverview) {
    output.overviewEntity = {};
    output.overviewEntity.name = `market_overview`;
    output.overviewEntity.value = entities.overviewEntity[0];
  }
  if (hasGradeEntity) {
    output.gradeEntity = {};
    output.gradeEntity.name = `grade_name`;
    output.gradeEntity.value = entities.gradeEntity[0];
  }

 
  if(hasSubCategoryName){
    output.categoryNameEntity = `sub_category_name`;
    output.category = String(entities.categoryNameEntity[0][0])
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
  } else if (hasCategoryNamev2){
    output.categoryNameEntity = `category_name`;
    output.category = String(entities.categoryName_v2[0][0])
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
  } else {
    output.category = null;
  };
  return output
}

const orderByOp = (entities: IEntities) => {
  let orderBy: any = null;
  if (output.priceEntity && output.priceEntity.name) { 
    orderBy = output.priceEntity.name;
  } else if (output.datetimeV2.name) {
    orderBy = output.datetimeV2.name;
  }
  else if (output.gradeEntity.name) {    
    orderBy = output.gradeEntity.name;
  }
  return orderBy;
}

const topSkip = (resourceName) => {
  // GET serviceRoot/People?$top=2
}

const select = (resourceName) => {
  // GET serviceRoot/Airports?$select=Name, IcaoCode
}

const eqAndOrOperator = () => {
  console.log(`======== OUPUT ======== \n ${JSON.stringify(output)}`)
  // this func constructs odata queries with (eq, and, or) operators
  const tempArr:any = []; // hold values to concatenate
  const categoryEntity = output.categoryNameEntity ? output.categoryNameEntity : null;
  const category:any = output.category ? output.category : null;
  const datetimeV2:any = output.datetimeV2 ? output.datetimeV2 : null;
  
  // if entity/skills exist, push it to tempArr
  if(output.serviceRootName){
    tempArr.push(`${output.serviceRootName}$filter=`);
  } 
  // prepend eq on the following entities
  if(output.category && output.categoryNameEntity){
    // NOTE BACK TICKS - SPACES HERE MATTER!
    tempArr.push(`${output.categoryNameEntity}`)
    tempArr.push(` eq `)
    tempArr.push(`'${output.category}'`)
  }
  if(datetimeV2 && output.dateType==="date"){
    tempArr.push(` and `)
    tempArr.push(`${output.datetimeV2.name}`)
    tempArr.push(` eq `)
    // tempArr.push(`'${datetimeV2.value}'`)
    tempArr.push(`${new Date(`${datetimeV2.value}`).toISOString()}`)
  }
  if(datetimeV2 && output.dateType==="set"){
    tempArr.push(` and `)
    tempArr.push(`${output.datetimeV2.name}`)
    tempArr.push(` eq `)
    tempArr.push(`${datetimeV2.value}`)
  }
  if(datetimeV2 && output.dateType==="daterange"){
    tempArr.push(` and `)
    tempArr.push(`${output.datetimeV2.name}`)
    tempArr.push(` gt `)
    tempArr.push(`${new Date(`${datetimeV2.value.start}`).toISOString()}`)
    tempArr.push(` and `)
    tempArr.push(`${output.datetimeV2.name}`)
    tempArr.push(` lt `)
    tempArr.push(`${new Date(`${datetimeV2.value.end}`).toISOString()}`)
  }
  tempArr.push(`&$format=JSON&$top=10&$skip=0&$count=true`);
  return `${tempArr.join('')}`
}

const prepOdataQuery = (luis: ILuis, intent: string): IOdataQuery => {
  output.serviceRootName = getResourceName(intent)
  const skillEntityMapping: IPriceEntityMapping = getEntityMapping(luis.prediction.entities);
  const orderByOperator = orderByOp(luis.prediction.entities) // `&$orderby=${orderByOp(luis.prediction.entities)} `;
  const baseQuery = `${output.serviceRootName}$filter=contains(${output.categoryNameEntity},\'${output.category}\')`;
  const resultArr: any = [];

  const baseQueryV2 = eqAndOrOperator();

  resultArr.push(baseQuery);
  if (orderByOperator !== null) {
    resultArr.push(`&$orderby=${orderByOp(luis.prediction.entities)} ${output.sort}`);
  }
  return {
    resource: intent,
    query: luis.query,
    odataURI: `${encodeURI(resultArr.join(''))}${output.format}`,
    odataURIv2:baseQueryV2,
    mappedEntities: skillEntityMapping
  };
};


