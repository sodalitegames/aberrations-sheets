import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { getAugmentations } from '../../../../recoil/resources/resources.selector';

import { createResource, updateSheet } from '../../../../apis/sheets.api';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Select from '../../../shared/Select';
import Detail from '../../../shared/Detail';

const PurchaseAugmentation = () => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const augGroups = useRecoilValue(getAugmentations);

  const [augmentation, setAugmentation] = useState(null);
  const [augsList, setAugsList] = useState([]);

  useEffect(() => {
    if (charSheet && augGroups) {
      const newAugsList = augGroups.map(group => {
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
  }, [charSheet, augGroups]);

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

    const resourceResponse = await createResource('characters', charSheet._id, 'augmentations', { name, pointCost, description, universalId });
    const sheetResponse = await updateSheet('characters', charSheet._id, { upgradePoints: charSheet.upgradePoints - pointCost });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, upgradePoints: sheetResponse.data.data.sheet.upgradePoints, augmentations: [resourceResponse.data.data.doc, ...oldCharSheet.augmentations] };
    });

    setSlideOver(null);
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
      <Select slideOver label="Choose an Augmentation" name="augmentations" options={augsList} changeHandler={selectAugmentation} />

      {augmentation ? (
        <>
          <Detail slideOver label="Name" detail={augmentation.name} />
          <Detail status={charSheet.upgradePoints < augmentation.pointCost ? 'error' : ''} slideOver label="Point Cost" detail={augmentation.pointCost} />
          <Detail slideOver label="Description" detail={augmentation.description} />
        </>
      ) : null}
    </SlideOverForm>
  );
};

export default PurchaseAugmentation;
