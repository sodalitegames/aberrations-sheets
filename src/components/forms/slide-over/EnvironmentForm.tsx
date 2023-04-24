import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';

import { SheetResourceType, SheetType } from '../../../models/sheet';

interface Props {
  id: string;
}

const EnvironmentForm: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id && campSheet) {
      const currentEnvironment = campSheet.environments.find(envir => envir._id === id);

      if (currentEnvironment) {
        setName(currentEnvironment.name);
        setDescription(currentEnvironment.description);
      }
    }
  }, [id, campSheet]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!description) return alert('Must provide a description');

    if (id) {
      dispatch(
        updateSheetResourceStart(
          SheetType.campaigns,
          campSheet._id,
          SheetResourceType.environments,
          id,
          { name, description },
          { slideOver: true, notification: { status: 'success', heading: 'Environment Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        SheetType.campaigns,
        campSheet._id,
        SheetResourceType.environments,
        { name, description },
        { slideOver: true, notification: { status: 'success', heading: 'Environment Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Environment' : 'New Environment'}
      description={id ? 'Update the information below to edit your environment.' : 'Fill out the information below to create your new environment.'}
      submitText={id ? 'Save environment' : 'Create environment'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />

      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
    </SlideOverForm>
  );
};

export default EnvironmentForm;
