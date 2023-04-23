import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { FetchedResourceType } from '../../../models/resource';
import { SlideOverForm } from '../SlideOver';

import Select from '../elements/Select';
import Detail from '../elements/Detail';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';
import { useResource } from '../../../hooks/useResource';
import { calculateAugmentationPoints } from '../../../utils/functions/calculations';

const PurchaseAugmentation = ({ data }) => {
  const dispatch = useDispatch();

  const augmentationGroups = useResource(FetchedResourceType.AugmentationGroups);

  const [augmentationPoints] = useState(calculateAugmentationPoints(data.entity.milestones, data.entity.augmentations));
  const [augmentation, setAugmentation] = useState(null);
  const [augsList, setAugsList] = useState([]);

  useEffect(() => {
    if (data.entity && augmentationGroups) {
      const newAugsList = augmentationGroups.map(group => {
        const children = group.augmentations.map(aug => {
          let purchased = false;

          data.entity.augmentations.forEach(charsAug => {
            if (charsAug.universalId === aug._id) purchased = true;
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

  const selectAugmentation = e => {
    if (!e.target.value) setAugmentation(null);

    let ungrouped = [];

    augsList.forEach(list => {
      ungrouped = [...ungrouped, ...list.children];
    });

    const currAug = ungrouped.find(aug => aug.universalId === e.target.value);

    setAugmentation(currAug);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!augmentation) return alert('Must provide augmentation');

    if (augmentationPoints < augmentation.pointCost) return alert('You cannot afford this augmentation');

    const { name, pointCost, description, universalId } = augmentation;

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        'augmentations',
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
      submitDisabled={!!(!augmentation || (augmentation && data.entity.upgradePoints < augmentation.pointCost))}
      submitHandler={submitHandler}
    >
      <Detail slideOver label="Augmentation Points" detail={augmentationPoints} />
      {augmentationGroups && augsList ? (
        <>
          <Select slideOver label="Choose an Augmentation" name="augmentations" options={augsList} changeHandler={selectAugmentation} />

          {augmentation ? (
            <>
              <Detail slideOver label="Name" detail={augmentation.name} />
              <Detail status={augmentationPoints < augmentation.pointCost ? 'error' : ''} slideOver label="Cost" detail={augmentation.pointCost} />
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
