import { Modifier } from '../../models/sheet';

export const displayModifier = ({ modifier, amount }: Modifier): string => {
  return `${modifier} ${amount >= 0 ? `+${amount}` : amount}`;
};
