import * as Yup from 'yup';

export const ConsumableFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  level: Yup.number().required(),
  uses: Yup.number().required(),
  categories: Yup.array().min(1).required(),
  associatedStat: Yup.string().notRequired(),
  quantity: Yup.number().required(),
  description: Yup.string().notRequired(),
});
