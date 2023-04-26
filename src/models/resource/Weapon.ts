enum Type {
  standard = 'standard',
  custom = 'custom',
  improvised = 'improvised',
}

enum Stat {
  strength = 'strength',
  agility = 'agility',
  persona = 'persona',
  aptitude = 'aptitude',
}

enum Range {
  close = 'close',
  short = 'short',
  long = 'long',
  far = 'far',
}

export interface Weapon {
  id: string;
  name: string;
  stat: Stat;
  range: Range;
  ability: string;
  type: Type;
}
