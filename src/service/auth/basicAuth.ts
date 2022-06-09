import dotenv from 'dotenv';
dotenv.config();

import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { nextTick } from "process";
import { ROLE } from "../../../sampleData/dummy_data";
import { IMgmtDetails, IRole, IUsersArray } from "../../models/interfaces/roleMgmt";
import { userInfoService } from "../fetch-data/getUserInfo";
import jwt from "jsonwebtoken";
// route authentication checkers

export const basicAuth = (req: Request, res: Response, next: NextFunction) => { 
  const user = req.body.user; 
  // if(token === null) return res.status(401);
  if (user === undefined) {
    return next(createError(403, "PLease login"));
  } 
  next()
  
}

export const adminRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const roleManagement: IMgmtDetails = await userInfoService();
    let getAdmin = roleManagement.users.filter(user => user.role === ROLE.ADMIN && user.name === req.body.user && user.role === req.body.role);
    let getBasicUser = roleManagement.users.filter(user => user.role === ROLE.BASIC && user.name === req.body.user && user.role === req.body.role);      
    if (getAdmin.length > 0) {
      let { name, role } = getAdmin[0]; // getting payloaa     
      res.status(200);
      return await next()
    } else

      if (getBasicUser.length > 0) {
        let { name, role } = getBasicUser[0]; // getting payloaa       
        res.status(200);
        return await next()
      } else {
        res.status(401)
        res.send("cant identfiy you")
      }
  }
}

export const loginCheck = async (req: Request, res: Response, next: NextFunction) => {
  const { user, password } = req.body;
  const roleManagement: IMgmtDetails = await userInfoService();
  const usersArrInDb = roleManagement.users;
  const matchingUser = usersArrInDb.filter(u => u.email === user && u.password === password)
 
  if (matchingUser.length > 0) {
    const accesstoken = jwt.sign(matchingUser[0], process.env.ACCESS_TOKEN_SECRET as string);
    res.json({ accesstoken });

  } else {
    res.status(401);
    res.send(`auth error for ${user}.`);
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => { 
  // const authHeader = req.headers['authorization'];
  // const token = authHeader?.split(' ')[1]; 
  // if (token === null) return res.status(401);

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
  //   if(err) return res.status(403);
  //   req.body.user = user
  //   next()
  // })
}