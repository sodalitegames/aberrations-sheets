import * as Yup from 'yup';

export const UsableFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().required(),
  description: Yup.string().required(),
  equippable: Yup.boolean().required(),
  quantity: Yup.number().required(),
  units: Yup.string().required(),
});
