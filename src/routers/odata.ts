import express, { NextFunction, Request, Response, urlencoded } from "express";
import createError from "http-errors";
import {
  LuisSampleOne,
  LuisSamplePeople,
  LuisSampleV3,
  LuisSamplv4,
  ROLE,
  USER_MGMT
} from "../../sampleData/dummy_data";
import { ILuis } from "../models/interfaces/luisInterface";
import { adminRole, basicAuth } from "../service/auth/basicAuth";
import { marketPriceResourceApi } from "../service/fetch-data/supplier";
import { luisService } from "../service/nlp/luis";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { odataQuery } from "../service/nlp/odataQuery";
import { IPrice } from "../models/interfaces/supplierInterface";

let router = express.Router();

router.post("/luis", basicAuth, adminRole(ROLE.ADMIN), async (req: Request, res: Response, next: NextFunction) => {
  let result = await luisService(req.body.userInput)
  return await res.send(result.data)
})

router.get("/supplier", basicAuth, adminRole(ROLE.ADMIN), async (req: Request, res: Response, next: NextFunction) => {
  const result: ILuis[] = await marketPriceResourceApi(LuisSampleOne)
  return await res.send(result)
})

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
router.get("/getOdataQuery", async (req: Request, res: Response, next: NextFunction) => {
  const result = await luisService(req.body.userInput)
  const constructedDataQuery = await odataQuery(result.data)
  console.log(">>>>>>>>>>>>>>>>>>>>>>> ODATA QUERY >>>>>>>>>>>>>>>>>> \n ", constructedDataQuery)
  res.send(constructedDataQuery)
});

router.get("/startQuery", async (req: Request, res: Response, next: NextFunction) => {
  
  const result = await luisService(req.body.userInput)
  const constructedDataQuery = await odataQuery(result.data)
  
  console.log(">>>>>>>>>>>>>>>>>>>>>>> ODATA QUERY >>>>>>>>>>>>>>>>>> \n ", constructedDataQuery)
  
  const config = {
    method: 'get',
    url: `https://datahub-stage.beroelive.ai/api/v1/${constructedDataQuery.odataURI}`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN_SECRET}`
    }
  };

  // checked mapped entities
  // if its not filterContains, push it to temp array
  let mapEntArr:any[] = [];
  let renderArr:any[] = [];

 

  axios(config)
    .then((response) => {
      let render = response.data.value.map((k:IPrice,index)=> {
        renderArr.push(`${k.fc_id} `)
        renderArr.push(`Category: ${k.sub_category_name}`)
        
        Object.entries(constructedDataQuery.mappedEntities).forEach(([key, value]) => {
          // console.log(">>>>>>> key >>>>>>> value >>>>>>>>>> ",key, value);
          let getEntVal = (k,label:string) => ` ${label}: ${k[value]} `;
          if(key == 'gradeEntity'){
            renderArr.push(getEntVal(k, `CATEGORY GRADE: `))
          }
          if(key == 'overviewEntity'){
            renderArr.push(getEntVal(k, `MARKET OVERVIEW: `))
          }
          if(key == 'pricingOutlook'){
            renderArr.push(getEntVal(k, `MARKET OUTLOOK: `))
          }
          if(key == 'trendEntity'){
            renderArr.push(getEntVal(k, `PRICE CHANGE or TREND: `))
          }
        });
      
        // console.log(renderArr)
        return renderArr.join(' ')
      })
      res.send(render)
    })
    .catch(function (error) {
      res.send(error)
    });
});

export default router;


