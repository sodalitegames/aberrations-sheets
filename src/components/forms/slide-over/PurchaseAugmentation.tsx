import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { AugmentationGroup, FetchedResourceType } from '../../../models/resource';
import { CharacterSheet, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc, Player } from '../../../models/sheet/resources';

import { SlideOverForm } from '../SlideOver';

import Select from '../elements/Select';
import Detail from '../elements/Detail';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';

import { calculateAugmentationPoints } from '../../../utils/functions/calculations';

type AugmentationOption = {
  id: string;
  universalId: string;
  name: string;
  displayName: string;
  groupName: string;
  description: string;
  pointCost: number;
  disabled: boolean;
};

type AugmentationGroupOption = {
  id: string;
  name: string;
  children: AugmentationOption[];
};

interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    entityType: 'player' | 'npc' | 'character';
    entity: CharacterSheet | Player | Npc;
  };
}

const PurchaseAugmentation: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const augmentationGroups = useResource(FetchedResourceType.AugmentationGroups) as AugmentationGroup[];

  const [augmentationPoints] = useState(calculateAugmentationPoints(data.entity.milestones, data.entity.augmentations));

  const [augmentation, setAugmentation] = useState<AugmentationOption | null>(null);
  const [augsList, setAugsList] = useState<AugmentationGroupOption[]>([]);

  useEffect(() => {
    if (data.entity && augmentationGroups) {
      const newAugsList = augmentationGroups.map(group => {
        const children = group.augmentations.map(aug => {
          let purchased = false;

          data.entity.augmentations.forEach(charsAug => {
            if (charsAug.universalId === aug.id) purchased = true;
          });

          return {
            id: aug.id,
            universalId: aug.id,
            name: aug.name,
            displayName: `${aug.name} (${aug.cost})`,
            groupName: group.name,
            description: aug.description,
            pointCost: aug.cost,
            disabled: purchased,
          };
        });

        return {
          id: group.id,
          name: group.name,
          children,
        };
      });

      setAugsList(newAugsList);
    }
  }, [data.entity, augmentationGroups]);

  const selectAugmentation = (e: any) => {
    if (!e.target.value) setAugmentation(null);

    let ungrouped: AugmentationOption[] = [];

    augsList.forEach(list => {
      ungrouped = [...ungrouped, ...list.children];
    });

    const currAug = ungrouped.find(aug => aug.universalId === e.target.value);

    if (!currAug) return setAugmentation(null);

    setAugmentation(currAug);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!augmentation) return alert('Must provide augmentation');

    if (augmentationPoints < augmentation.pointCost) return alert('You cannot afford this augmentation');

    const { name, pointCost, description, universalId } = augmentation;

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        SheetResourceType.augmentations,
        { name, pointCost, description, universalId, npcId: data.sheetType === 'campaigns' ? data.entity._id : undefined },
        { forPlayer: data.entityType === 'player' ? true : false, notification: { status: 'success', heading: 'Augmentation Purchased', message: `You have successfully purchased ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title="Purchase an Augmentation"
      description={`Select an augmentation below and purchase it to add it to your ${data.sheetType === 'characters' ? 'character' : 'npc'}.`}
      submitText={`Purchase Augmentation`}
      submitDisabled={!!(!augmentation || (augmentation && augmentationPoints < augmentation.pointCost))}
      submitHandler={submitHandler}
    >
      <Detail slideOver label="Augmentation Points" detail={augmentationPoints} />
      {augmentationGroups && augsList ? (
        <>
          <Select slideOver label="Choose an Augmentation" name="augmentations" options={augsList} changeHandler={selectAugmentation} />

          {augmentation ? (
            <>
              <Detail slideOver label="Name" detail={augmentation.name} />
              <Detail status={augmentationPoints < augmentation.pointCost ? 'error' : undefined} slideOver label="Cost" detail={augmentation.pointCost} />
              <Detail slideOver label="Description" detail={augmentation.description} />
            </>
          ) : null}
        </>
      ) : (
        <Row slideOver label="Choose an Augmentation" name="augmentations">
          <LoadingSpinner dark />
        </Row>
      )}
    </SlideOverForm>
  );
};

export default PurchaseAugmentation;
