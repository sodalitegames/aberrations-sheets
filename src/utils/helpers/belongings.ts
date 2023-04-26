import { BelongingType } from '../../models/sheet';
import { WeaponRange } from '../../models/sheet/resources';

import { capitalize } from './strings';

export const getBelongingType = (type: BelongingType): string => {
  switch (type) {
    case BelongingType.weapons:
      return 'weapon';
    case BelongingType.wearables:
      return 'wearable';
    case BelongingType.consumables:
      return 'consumable';
    case BelongingType.usables:
      return 'usable';
    default:
      return 'belonging';
  }
};

export const getBelongingTypeCapitalized = (type: BelongingType): string => {
  return capitalize(getBelongingType(type));
};

export const getWeaponRangeString = (range: WeaponRange): string => {
  switch (range) {
    case 'Close':
      return 'Close (0 - 1)';
    case 'Short':
      return 'Short (2 - 4)';
    case 'Long':
      return 'Long (4 - 6)';
    case 'Far':
      return 'Far (6 - 10)';
    default:
      return `${range} Range`;
  }
};
