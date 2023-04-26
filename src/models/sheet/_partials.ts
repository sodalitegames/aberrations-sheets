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

export enum ConditionType {
  slowed = 'slowed',
  agony = 'agony',
  injured = 'injured',
  disturbed = 'disturbed',
}

export type Stat = {
  die: number;
};

export enum StatType {
  strength = 'strength',
  agility = 'agility',
  persona = 'persona',
  aptitude = 'aptitude',
}

export interface Document {
  createdAt: string;
  updatedAt: string;
  __v: number;
}
