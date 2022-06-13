// helper routes
import exress, { NextFunction, Request, Response } from 'express';
import { IPrice } from '../models/interfaces/supplierInterface';
let utilityRoutes = exress.Router();
// utility
const parser = require('simple-excel-to-json');
const subCategoryName = "Name_of_Sub_Category";
const categoryName = "Name_of_Category";

export interface IListEntity {
  "canonicalForm"?: string,
  "list"?: any[]
}


utilityRoutes.post(`/xls-to-json`, async (req: Request, res: Response, next: NextFunction) => {
  console.log(`...converting xls to json please wait....`)
  const temp: any = [];
  let list: any =  {};
  const output: any = [];

  const doc = await parser.parseXls2Json(__dirname + './../MMD_Data_Capture_Sheet_25th_Nov_2021_Final.xlsx');
  doc.forEach(k => {
    // console.log(k[0])
    for (let i = 0; i < k.length; i++) {
      if (k[i][categoryName] && k[i][categoryName] !== '') {
        temp.push(k[i])
      }
    }
  })

  const key = categoryName;

  const arrayUniqueByKey = [...new Map(temp.map(item => [item[key], item])).values()];

  const out = arrayUniqueByKey.map((k:any, idx:number)=> {
    console.log(k[subCategoryName])
    return {
      "canonicalForm":k[categoryName],
      "list":[k[subCategoryName]]
    }
  })

  console.log(`item ======== ${JSON.stringify(out)}`)
  return await res.send(out)
})


export default utilityRoutes;


