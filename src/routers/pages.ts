import express, { NextFunction, Request, Response } from "express";
import { ROLE, USER_MGMT } from "../../sampleData/dummy_data";
import { IMgmtDetails, IUsersArray } from "../models/interfaces/roleMgmt";
import { adminRole, authenticateToken, basicAuth } from "../service/auth/basicAuth";
import { userInfoService } from "../service/fetch-data/getUserInfo";
import { canViewPage } from "../service/permissions/privatePage";
let pageRoutes = express.Router();



const authGetPage = (req: Request, res: Response, next: NextFunction): boolean => {
  const pageid = req.params.userpage;
  return true;
}

// webs public
pageRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("public route")
})

// users personal page
pageRoutes.get("/:userpage", basicAuth, adminRole(ROLE.ADMIN), authenticateToken,  async (req: Request, res: Response, next: NextFunction) => {
  
  const details: IMgmtDetails = await userInfoService();
  const listOfUsers: IUsersArray[] = details.users;
  let loggedInUserDetails = listOfUsers.filter((thisuser) => thisuser.name === req.body.user)
  return await res.send(`this is ${req.body.user
    }'s page <br/> Details: ${JSON.stringify(loggedInUserDetails)}`)
})


export default pageRoutes;
