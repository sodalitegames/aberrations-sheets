import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Environment } from '../../../models/sheet/resources';

interface Props {
  data: {
    sheetId: string;
    environment?: Environment;
  };
}

const EnvironmentForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data.environment) {
      setName(data.environment.name);
      setDescription(data.environment.description);
    }
  }, [data.environment]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!description) return alert('Must provide a description');

    if (data.environment) {
      dispatch(
        updateSheetResourceStart(
          SheetType.campaigns,
          data.sheetId,
          SheetResourceType.environments,
          data.environment._id,
          { name, description },
          { slideOver: true, notification: { status: 'success', heading: 'Environment Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        SheetType.campaigns,
        data.sheetId,
        SheetResourceType.environments,
        { name, description },
        { slideOver: true, notification: { status: 'success', heading: 'Environment Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={data.environment ? 'Edit Environment' : 'New Environment'}
      description={data.environment ? 'Update the information below to edit your environment.' : 'Fill out the information below to create your new environment.'}
      submitText={data.environment ? 'Save environment' : 'Create environment'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />

      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
    </SlideOverForm>
  );
};

export default EnvironmentForm;
