import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart, createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ResourceType } from '../../../models/enums';

import { SlideOverForm } from '../SlideOver';

import Select from '../elements/Select';
import Detail from '../elements/Detail';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';
import { useResource } from '../../../hooks/useResource';

const PurchaseAugmentation = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const augmentationGroups = useResource(ResourceType.AugmentationGroups);

  const [augmentation, setAugmentation] = useState(null);
  const [augsList, setAugsList] = useState([]);

  useEffect(() => {
    if (charSheet && augmentationGroups) {
      const newAugsList = augmentationGroups.map(group => {
        const children = [group.augmentation1, group.augmentation2, group.augmentation3, group.augmentation4, group.augmentation5].map(aug => {
          let purchased = false;

          charSheet.augmentations.forEach(charsAug => {
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
  }, [charSheet, augmentationGroups]);

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

    if (charSheet.upgradePoints < augmentation.pointCost) return alert('You cannot afford this ability');

    const { name, pointCost, description, universalId } = augmentation;

    dispatch(
      createSheetResourceStart(
        'characters',
        charSheet._id,
        'augmentations',
        { name, pointCost, description, universalId },
        { notification: { status: 'success', heading: 'Augmentation Purchased', message: `You have successfully purchased ${name}.` } }
      )
    );
    dispatch(updateSheetStart('characters', charSheet._id, { spentUpgradePoints: charSheet.spentUpgradePoints + pointCost }, { slideOver: true }));
  };

  return (
    <SlideOverForm
      title="Purchase an Augmentation"
      description="Select an augmentation below and purchase it to add it to your character."
      submitText={`Purchase Augmentation`}
      submitDisabled={!!(!augmentation || (augmentation && charSheet.upgradePoints < augmentation.pointCost))}
      submitHandler={submitHandler}
    >
      <Detail slideOver label="Upgrade Points Available" detail={charSheet.upgradePoints} />
      {augmentationGroups && augsList ? (
        <>
          <Select slideOver label="Choose an Augmentation" name="augmentations" options={augsList} changeHandler={selectAugmentation} />

          {augmentation ? (
            <>
              <Detail slideOver label="Name" detail={augmentation.name} />
              <Detail status={charSheet.upgradePoints < augmentation.pointCost ? 'error' : ''} slideOver label="Point Cost" detail={augmentation.pointCost} />
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
