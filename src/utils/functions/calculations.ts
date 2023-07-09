import { Modifier } from '../../models/sheet';
import { Augmentation, Wearable } from '../../models/sheet/resources';

export const calculateAugmentationPoints = (milestones: number, augmentations: Augmentation[]): number => {
  const spentPoints = augmentations.reduce((points: number, augmentation) => (augmentation.pointCost || 0) + points, 0);
  return milestones - spentPoints;
};

export const calculateLifeHackPoints = (level: number, hacks: any[]): number => {
  const availablePoints = Array.from({ length: level }, (_, i) => i + 1).reduce((points: number, level: number) => points + level, 0);
  return availablePoints;
};

export const calculateShieldValueAdjustment = (wearables: Wearable[]): number => {
  return wearables.reduce((shieldValueAdjustment: number, wearable) => (wearable.shieldValue || 0) + shieldValueAdjustment, 0);
};

export const calculateSpeedAdjustment = (wearables: Wearable[]): number => {
  return wearables.reduce((speedAdjustment: number, wearable) => (wearable.speed || 0) + speedAdjustment, 0);
};

export const calculateModifiers = (characterModifiers: Modifier[], wearables: Wearable[]): Modifier[] => {
  const wearableModifiers = wearables.map(wearable => wearable.modifiers || []).flat();

  const modifiers = [...characterModifiers, ...wearableModifiers];

  const result: { [modifier: string]: number } = {};

  for (const mod of modifiers) {
    const { modifier, amount } = mod;

    if (result.hasOwnProperty(modifier)) {
      result[modifier] += amount;
    } else {
      result[modifier] = amount;
    }
  }

  const combinedModifiers: Modifier[] = Object.entries(result).map(([modifier, amount]) => ({
    modifier,
    amount,
  }));

  return combinedModifiers;
};
