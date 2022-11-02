import { WeaponType, WeaponRange, AssociatedStat } from '../enums/Weapon';

export interface Weapon {
  id: string;
  type: WeaponType;
  name: string;
  ability?: string;
  description?: string;
  associatedStat: AssociatedStat;
  levelDamage: number;
  range: WeaponRange;
}
