enum WeaponType {
  standard = 'standard',
  custom = 'custom',
  improvised = 'improvised',
}

enum AssociatedStat {
  Fortitude = 'Fortitude',
  Agility = 'Agility',
  Persona = 'Persona',
  Aptitude = 'Aptitude',
}

enum WeaponRange {
  Close = 'Close',
  Short = 'Short',
  Long = 'Long',
  Far = 'Far',
}

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
