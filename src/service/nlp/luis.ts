import axios, { AxiosResponse } from 'axios';
import { Response } from "express";
require('dotenv').config()
const LUIS_ENDPOINT = process.env.LUIS_ENDPOINT;

export const luisService =  async (utterance:string) => {
  // console.log("luis api")
  let result: AxiosResponse = await axios.get(`${LUIS_ENDPOINT}${utterance}`);
  // console.log('LUIS API RES: ', result)
  return result;
}