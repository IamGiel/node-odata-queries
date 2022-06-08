import { USER_MGMT } from "../../../sampleData/dummy_data";
import { IMgmtDetails } from "../../models/interfaces/roleMgmt";

export const userInfoService = async ():Promise<IMgmtDetails> => {
  return await USER_MGMT;
}