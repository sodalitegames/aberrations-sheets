import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ResourceType } from '../../../models/enums';
import { SlideOverForm } from '../SlideOver';

import Select from '../elements/Select';
import Detail from '../elements/Detail';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';
import { useResource } from '../../../hooks/useResource';

const PurchaseAugmentation = ({ data }) => {
  const dispatch = useDispatch();

  const augmentationGroups = useResource(ResourceType.AugmentationGroups);

  const [augmentation, setAugmentation] = useState(null);
  const [augsList, setAugsList] = useState([]);

  useEffect(() => {
    if (data.entity && augmentationGroups) {
      const newAugsList = augmentationGroups.map(group => {
        const children = [group.augmentation1, group.augmentation2, group.augmentation3, group.augmentation4, group.augmentation5].map(aug => {
          let purchased = false;

          data.entity.augmentations.forEach(charsAug => {
            if (charsAug.universalId === aug._id) purchased = true;
          });

          return {
            id: aug._id,
            universalId: aug._id,
            name: aug.name,
            displayName: `${aug.name} (${aug.pointCost})`,
            groupName: group.groupName,
            description: aug.description,
            pointCost: aug.pointCost,
            disabled: purchased,
          };
        });

        return {
          id: group._id,
          name: group.groupName,
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

    if (data.entity.upgradePoints < augmentation.pointCost) return alert('You cannot afford this ability');

    const { name, pointCost, description, universalId } = augmentation;

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        'augmentations',
        { name, pointCost, description, universalId, npcId: data.sheetType === 'campaigns' ? data.entity._id : undefined },
        { notification: { status: 'success', heading: 'Augmentation Purchased', message: `You have successfully purchased ${name}.` } }
      )
    );

    if (data.sheetType === 'characters') {
      dispatch(updateSheetStart(data.sheetType, data.sheetId, { spentUpgradePoints: data.entity.spentUpgradePoints + pointCost }, { slideOver: true }));
    }

    if (data.sheetType === 'campaigns') {
      dispatch(updateSheetResourceStart(data.sheetType, data.sheetId, 'npcs', data.entity._id, { spentUpgradePoints: data.entity.spentUpgradePoints + pointCost }, { slideOver: true }));
    }
  };

  return (
    <SlideOverForm
      title="Purchase an Augmentation"
      description={`Select an augmentation below and purchase it to add it to your ${data.sheetType === 'characters' ? 'character' : 'npc'}.`}
      submitText={`Purchase Augmentation`}
      submitDisabled={!!(!augmentation || (augmentation && data.entity.upgradePoints < augmentation.pointCost))}
      submitHandler={submitHandler}
    >
      <Detail slideOver label="Upgrade Points Available" detail={data.entity.upgradePoints} />
      {augmentationGroups && augsList ? (
        <>
          <Select slideOver label="Choose an Augmentation" name="augmentations" options={augsList} changeHandler={selectAugmentation} />

          {augmentation ? (
            <>
              <Detail slideOver label="Name" detail={augmentation.name} />
              <Detail status={data.entity.upgradePoints < augmentation.pointCost ? 'error' : ''} slideOver label="Point Cost" detail={augmentation.pointCost} />
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
