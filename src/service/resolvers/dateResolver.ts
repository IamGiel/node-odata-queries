interface IResolutionDateValue {
  "value"?: string,
  "start"?:string,
  "end"?:string
}

interface IDateType  {
  "timex": string,
  "resolution": IResolutionDateValue[]
}

export interface ILuisDate {
  "type": string,
  "values": IDateType[]
}

export const dateResolver = (dateObj:ILuisDate) => {
  console.log("date resolver ", dateObj)
  let res:any = {};
  if(dateObj.type === "daterange"){
    res.fieldName = `actual_period`;
    res.value = dateObj.values[0].resolution[0]
    
  } else if(dateObj.type ==="date") {
    res.fieldName = `actual_period`;
    res.value = dateObj.values[0].resolution[0]
  } else if(dateObj.type ==="set") {
    res.fieldName = `actual_period`;
    res.value = getTimex(dateObj.values[0].timex) 
  }
  return res;
}

const getTimex = (timexValue) => {
  console.log(timexValue);
  return timexValue;
}