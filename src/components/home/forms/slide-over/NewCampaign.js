import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../../redux/user/user.selectors';

import { createSheetForUserStart } from '../../../../redux/user/user.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Detail from '../../../shared/form/Detail';
import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';

const NewCampaign = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [ccNickname, setCcNickname] = useState('');
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [details, setDetails] = useState('');

  const submitHandler = async e => {
    e.preventDefault();

    if (!ccNickname) return alert('Must provide a ccNickname');
    if (!name) return alert('Must provide a name');
    if (!overview) return alert('Must provide an overview');
    if (!details) return alert('Must provide a details');

    dispatch(createSheetForUserStart('campaigns', { name, ccName: currentUser.name, ccNickname, overview, details }, { slideOver: true }));
  };

  return (
    <SlideOverForm title="Create New Campaign" description="Edit the information below to create your campaign." submitText="Create campaign" submitHandler={submitHandler}>
      <Detail slideOver label="CC Name" detail={currentUser.name} />
      <Input slideOver label="CC Nickname (Opt.)" type="text" name="ccNickname" value={ccNickname} changeHandler={setCcNickname} />
      <Input slideOver label="Campaign Name" type="text" name="name" value={name} changeHandler={setName} />
      <TextArea slideOver label="Campaign Overview" name="overview" rows={4} value={overview} changeHandler={setOverview} />
      <TextArea slideOver label="Campaign Details" name="details" rows={8} value={details} changeHandler={setDetails} />
    </SlideOverForm>
  );
};

export default NewCampaign;
