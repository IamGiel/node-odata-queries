import axios, { AxiosResponse } from 'axios';
import { Response } from "express";
import { ILuis } from '../../models/interfaces/luisInterface';
require('dotenv').config()
const PRICE_API_URL = process.env.PRICE_API_URL;
const TOK = process.env.DATA_HUB_TOK;

export const marketPriceResourceApi = async (luis:ILuis) => {
  const headers = {
    Authorization: 'Bearer ' + TOK //the token is a variable which holds the token
  };
  const queryOptions = {
    filter: {
      contains: `contains(sub_category_name,'Nylon')`,
      eq: `'sub_category_name' eq Nylon`,
      gt: `price_point gt 10`, // greater than
      lt: `price_point lt 10`, // less than
      ge: `price_point ge 10`, // greater than or equal
      le: `price_point le 10`, // less than or equal
      has: `sub_category_name has 'Nylon'`,
      endsWith: `endswith(sub_category_name,'lon')`,
      notEndswitdh: `not endswith(sub_category_name,'lon')`,
    }
  }

  try {
    let result: AxiosResponse = await axios.get(
      `${PRICE_API_URL}$filter=${queryOptions.filter.contains}&%24format=JSON&%24top=10&%24skip=0&%24count=true`,
      { headers }
    );
    return await result.data;
  } catch (error) {
    return await error;
  }
}