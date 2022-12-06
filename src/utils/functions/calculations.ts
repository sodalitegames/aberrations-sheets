import { Modifier } from '../../models/sheet';
import { Augmentation, Wearable } from '../../models/sheet/resources';

export const calculateAugmentationPoints = (milestones: number, augmentations: Augmentation[]): number => {
  const spentPoints = augmentations.reduce((points: number, augmentation) => (augmentation.pointCost || 0) + points, 0);
  return milestones - spentPoints;
};

export const calculateShieldValue = (wearables: Wearable[]): number => {
  return wearables.reduce((shieldValue: number, wearable) => (wearable.shieldValue || 0) + shieldValue, 0);
};

export const calculateSpeedAdjustment = (wearables: Wearable[]): number => {
  return wearables.reduce((speedAdjustment: number, wearable) => (wearable.speedAdjustment || 0) + speedAdjustment, 0);
};

export const calculateModifiers = (characterModifiers: Modifier[], wearables: Wearable[]): Modifier[] => {
  const wearableModifiers = wearables.map(wearable => wearable.modifiers || []).flat();

  const modifiers = [...characterModifiers, ...wearableModifiers];

  // TODO: Check if any modifers are the same and combine them if so

  return modifiers;
};
