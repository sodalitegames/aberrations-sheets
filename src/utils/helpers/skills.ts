import { Skill } from '../../models/sheet';

import { capitalize } from './strings';

export const displaySkill = ({ skill, type }: Skill): string => {
  return `${capitalize(type)} - ${skill}`;
};
