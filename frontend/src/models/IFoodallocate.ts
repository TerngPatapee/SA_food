import { TreatmentrecordsInterface } from "./ITreatmentrecord";
import { NutritionistsInterface } from "./INutritionist";
import { FoodsetsInterface } from "./IFoodset";
import { FoodtimesInterface } from "./IFoodtime";


export interface FoodallocateInterface {
  ID: number,

  TreatmentrecordID: number,
  Treatmentrecord: TreatmentrecordsInterface,
  NutritionistID: number,
  Nutritionist: NutritionistsInterface,
  FoodsetID: number,
  Foodset: FoodsetsInterface,
  FoodtimeID: number,
  Foodtime: FoodtimesInterface,
}