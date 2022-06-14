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
  if(dateObj.type === "daterange"){
    return dateObj.values[0].resolution[0];
  } else {
    return dateObj.values[0].resolution[0].value;
  }
}