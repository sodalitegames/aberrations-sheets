import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { getAugmentations } from '../../../../recoil/resources/resources.selector';

import { createResource, updateResource } from '../../../../apis/sheets.api';

import { replaceItemById } from '../../../../utils/arrays';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';

const PurchaseAugmentation = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const fetchedAugs = useRecoilValue(getAugmentations);

  const [augmentation, setAugmentation] = useState(null);
  const [augsList, setAugsList] = useState([]);

  // useEffect(() => {
  //   if (charSheet && fetchedAugs) {
  //     const newAugsList = fetchedAugs.map(aug => {
  //       let purchased = false;

  //       charSheet.augmentations.forEach(charsAug => {
  //         if (charsAug.universalId === aug._id) purchased = true;
  //       });

  //       return {
  //         universalId: aug._id,
  //         name: aug.name,
  //         description: aug.description,
  //         pointCost: aug.pointCost,
  //         purchased,
  //       };
  //     });

  //     console.log(newAugsList);

  //     setAugsList(newAugsList);
  //   }
  // }, [charSheet, fetchedAugs]);

  const submitHandler = async e => {
    e.preventDefault();

    // if (id) {
    //   const response = await updateResource('characters', charSheet._id, 'logs', id, { date, content });
    //   console.log(response.data.data);
    //   setCharSheet(oldCharSheet => {
    //     console.log(oldCharSheet);
    //     return { ...oldCharSheet, characterLogs: replaceItemById(oldCharSheet.characterLogs, id, response.data.data.doc) };
    //   });

    //   setSlideOver(null);
    //   return;
    // }

    // const response = await createResource('characters', charSheet._id, 'logs', { date, content });

    // console.log(response.data.data);

    // setCharSheet(oldCharSheet => {
    //   console.log(oldCharSheet);
    //   return { ...oldCharSheet, characterLogs: [response.data.data.doc, ...oldCharSheet.characterLogs] };
    // });

    // setSlideOver(null);
  };

  return (
    <SlideOverForm
      title="Purchase an Augmentation"
      description="Select an augmentation below and purchase it to add it to your character."
      submitText={`Purchase Augmentation`}
      submitHandler={submitHandler}
    >
      {/* {augsList.length ? (
        <div>
          <Input slideOver uneditable label="Name" name="name" value={augsList[0].name} />
          <Input slideOver uneditable label="Description" name="description" value={augsList[0].description} />
          <Input slideOver uneditable label="Point Cost" name="pointCost" value={augsList[0].pointCost} />
        </div>
      ) : null} */}

      {JSON.stringify(fetchedAugs)}

      {/* <TextArea slideOver label="What happened?" name="content" rows={8} value={content} changeHandler={setContent} /> */}
    </SlideOverForm>
  );
};

export default PurchaseAugmentation;
