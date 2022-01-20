import joi from "joi";

export default joi.object({
  hotelPlan: joi.number().min(3).required(),
  presenceType: joi.number().required()
});
