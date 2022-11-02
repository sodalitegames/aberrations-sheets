export type Modifier = {
  modifier: string;
  amount: number;
};

export type Conditions = {
  slowed: number;
  agony: number;
  injured: number;
  disturbed: number;
};

export type Stat = {
  die: number;
};

export enum StatType {
  strength = 'strength',
  agility = 'agility',
  persona = 'persona',
  aptitude = 'aptitude',
}
