import joi from "joi";

export default joi.object({
  hotelPlan: joi.number().required(),
  presenceType: joi.number().required()
});
