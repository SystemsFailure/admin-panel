import * as Joi from "joi";
// Пока что простая схема...
const createUserSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    lastname: Joi.string().required(),
    department: Joi.string().required(),
    password: Joi.string().required(),
    jobTitle: Joi.string().required(),
});

export default createUserSchema;