
export interface ILuis {
  query: string
  prediction: {
    topIntent: string
    intents: any
    entities: IEntities
  }
}

export interface IEntities {
  findEntity?: any,
  theTopList?:any,
  suppliers?: any,
  descendingEntity?:any,
  peopleEntity?: any,
  tripsEntity?: any,
  categoryNameEntity?:any,
  orderByEntity?:any,
  priceEntity?: any,
  geographyV2?:  any,
  theTopList?:any,
  datetimeV2?:  any,
  number?:  any,
  categoryName_v2?:any,
  '$instance'?:  any
}