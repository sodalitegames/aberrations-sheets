type Augmentation = {
  id: string;
  name: string;
  description: string;
  cost: number;
};
export interface AugmentationGroup {
  id: string;
  name: string;
  augmentations: Augmentation[];
}
