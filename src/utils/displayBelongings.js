export const getBelongingType = belType => {
  switch (belType) {
    case 'weapons':
      return 'weapon';
    case 'wearables':
      return 'wearable';
    case 'consumables':
      return 'consumable';
    case 'usables':
      return 'usable';
    default:
      return 'belonging';
  }
};

export const getBelongingTypeCapitalized = belType => {
  switch (belType) {
    case 'weapons':
      return 'Weapon';
    case 'wearables':
      return 'Wearable';
    case 'consumables':
      return 'Consumable';
    case 'usables':
      return 'Usable';
    default:
      return 'Belonging';
  }
};

export const getWeaponRangeString = range => {
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
