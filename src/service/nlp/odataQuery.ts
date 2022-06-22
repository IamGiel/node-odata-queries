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
  dateType?:any,
  serviceRootName?:any,
  ordinalV2?:any,
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
  // console.log(`============= entities =============\n ${JSON.stringify(entities)}`)
  // Basically, these properties tells us which field values to render
  const hasPricingOutlook: boolean = entities['$instance'].hasOwnProperty("pricingOutlook");
  const hasPricingOverview: boolean = entities['$instance'].hasOwnProperty("overviewEntity");
  const hasSubCategoryName: boolean = entities['$instance'].hasOwnProperty("categoryNameEntity");
  const hasCategoryNameV2: boolean = entities['$instance'].hasOwnProperty("categoryName_v2");
  const hasDateTimeV2: boolean = entities['$instance'].hasOwnProperty("datetimeV2");
  const hasGradeEntity: boolean = entities['$instance'].hasOwnProperty("gradeEntity");
  const hasTrendEntity: boolean = entities['$instance'].hasOwnProperty("trendEntity");
  const hasGeographyV2: boolean = entities['$instance'].hasOwnProperty("geographyV2");
  const hasPriceEntity: boolean = entities['$instance'].hasOwnProperty("priceEntity");

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

const getCategory = (entities: IEntities) => {
  const hasSubCategoryName: boolean = entities.hasOwnProperty("categoryNameEntity");
  const hasCategoryNamev2: boolean = entities.hasOwnProperty("categoryName_v2");
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

const eqAndOrOperator = (skills:IPriceEntityMapping, luis:ILuis) => {
  console.log(`======== LUIS ======== \n ${JSON.stringify(luis)}`)
  // this func constructs odata queries with (eq, and, or) operators
  const tempArr:any = []; // hold values to concatenate
  const root:any = skills.serviceRootName ? `${skills.serviceRootName}$filter=` : null;
  const categoryEntity = skills.categoryNameEntity ? skills.categoryNameEntity : null;
  const category:any = skills.category ? skills.category : null;
  const datetimeV2:any = skills.datetimeV2 ? skills.datetimeV2 : null;
  
  // if entity/skills exist, push it to tempArr
  if(root){
    tempArr.push(root);
  }
  // prepend eq on the following entities
  if(category && categoryEntity){
    // NOTE BACK TICKS - SPACES HERE MATTER!
    tempArr.push(`${categoryEntity}`)
    tempArr.push(` eq `)
    tempArr.push(`'${category}'`)
  }

  if(datetimeV2 && skills.dateType==="date"){
    tempArr.push(` and `)
    tempArr.push(`${skills.datetimeV2.name}`)
    tempArr.push(` eq `)
    // tempArr.push(`'${datetimeV2.value}'`)
    tempArr.push(`${new Date(`${datetimeV2.value}`).toISOString()}`)
  }

  if(datetimeV2 && skills.dateType==="set"){
    tempArr.push(` and `)
    tempArr.push(`${skills.datetimeV2.name}`)
    tempArr.push(` eq `)
    // tempArr.push(`'${datetimeV2.value}'`)
    tempArr.push(`${datetimeV2.value}`)
  }

  if(datetimeV2 && skills.dateType==="daterange"){
    tempArr.push(` and `)
    tempArr.push(`${skills.datetimeV2.name}`)
    tempArr.push(` gt `)
    tempArr.push(`${new Date(`${datetimeV2.value.start}`).toISOString()}`)
    tempArr.push(` and `)
    tempArr.push(`${skills.datetimeV2.name}`)
    tempArr.push(` lt `)
    tempArr.push(`${new Date(`${datetimeV2.value.end}`).toISOString()}`)
  }

  tempArr.push(`&$format=JSON&$top=10&$skip=0&$count=true`);
  // console.log("tempArr ", tempArr)

  // return `${encodeURI(tempArr.join(''))}${urlConfigs}`;

  return `${tempArr.join('')}`

  // `${skills.serviceRootName}?$filter=actual_period%20eq%20'2022-12-01T00:00:00Z'%20and%20feedstock_id%20eq%20'D304'%20and%20fc_id%20eq%20'b48ec86cd4dc-382b-4a23-0041-1eefcf67'&%24format=JSON&%24top=10&%24skip=0&%24count=true`
  // https://datahub-stage.beroelive.ai/api/v1/marketprice/Prices?$filter=actual_period%20eq%20'2022-12-01T00:00:00Z'%20and%20feedstock_id%20eq%20'D304'%20and%20fc_id%20eq%20'b48ec86cd4dc-382b-4a23-0041-1eefcf67'&%24format=JSON&%24top=10&%24skip=0&%24count=true
}

const prepOdataQuery = (luis: ILuis, intent: string): IOdataQuery => {
  const skillEntityMapping: IPriceEntityMapping = getEntityMapping(luis.prediction.entities);
  const categoryName = getCategory(luis.prediction.entities);
  const resourceName = getResourceName(intent);
  const orderByOperator = orderByOp(luis.prediction.entities) // `&$orderby=${orderByOp(luis.prediction.entities)} `;
  const baseQuery = `${resourceName}$filter=contains(${skillEntityMapping.categoryNameEntity},\'${categoryName}\')`;
  const urlConfigs = `&%24format=JSON&%24top=10&%24skip=0&%24count=true`;
  const resultArr: any = [];

  const baseQueryV2 = eqAndOrOperator(skillEntityMapping, luis);

  resultArr.push(baseQuery);
  if (orderByOperator !== null) {
    resultArr.push(`&$orderby=${orderByOp(luis.prediction.entities)} ${output.sort}`);
  }
  return {
    resource: intent,
    query: luis.query,
    odataURI: `${encodeURI(resultArr.join(''))}${urlConfigs}`,
    odataURIv2:baseQueryV2,
    mappedEntities: skillEntityMapping
  };
};


  // url: 'https://datahub-stage.beroelive.ai/api/v1/marketprice/Prices?$filter=contains(market_outlook,\'witnessed\')&$orderby=price_point%20asc&%24format=JSON&%24top=10&%24skip=0&%24count=true',



