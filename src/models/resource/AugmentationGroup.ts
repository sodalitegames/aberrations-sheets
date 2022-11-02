type Augmentation = {
  id: string;
  name: string;
  description: string;
  pointCost: number;
};
export interface AugmentationGroup {
  id: string;
  groupName: string;
  augmentation1: Augmentation;
  augmentation2: Augmentation;
  augmentation3: Augmentation;
  augmentation4: Augmentation;
  augmentation5: Augmentation;
}
