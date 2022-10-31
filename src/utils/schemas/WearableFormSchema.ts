import * as Yup from 'yup';

export const WearableFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  bodyArea: Yup.string().oneOf(['head', 'face', 'torso', 'arms', 'hands', 'legs', 'feet']).required(),
  shieldValue: Yup.number().required(),
  speedAdjustment: Yup.number().required(),
  quantity: Yup.number().required(),
  modifiers: Yup.array().notRequired(),
});
