import * as yup from 'yup';

export const schema = yup
  .object({
    company: yup.string().min(3).max(20).required(),
    model: yup.string().min(3).max(20).required(),
    vin: yup.string().min(17).max(17).required(),
    color: yup.string().min(3).max(20).required(),
    price: yup.string().min(0).max(20).required(),
    year: yup.number().min(1950).max(new Date().getFullYear()).integer().required(),
    availability: yup.boolean().required(),
  })
  .required();
