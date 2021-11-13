import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const UpgradePoints = () => {
  const [upgradePoints, setUpgradePoints] = useState(0);

  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    if (charSheet) {
      setUpgradePoints(charSheet.upgradePoints);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { upgradePoints });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, upgradePoints: response.data.data.sheet.upgradePoints };
    });

    setModal(null);
  };

  return (
    <ModalForm title="Edit Upgrade Points" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Upgrade Points" name="upgradePoints" type="number" value={upgradePoints} changeHandler={setUpgradePoints} />
    </ModalForm>
  );
};

export default UpgradePoints;
