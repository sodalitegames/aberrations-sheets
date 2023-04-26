import { Range } from '../../models/sheet/resources';

export const getWeaponRangeLabel = (range: Range): string => {
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
