import joi from "joi";

export default joi.object({
  hotelPlan: joi.number().min(1).max(2).required(),
  presenceType: joi.number().min(1).max(2).required()
});
