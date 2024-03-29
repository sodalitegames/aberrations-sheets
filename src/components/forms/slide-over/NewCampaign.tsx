import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser, selectUserError } from '../../../redux/user/user.selectors';

import { createSheetForUserStart } from '../../../redux/user/user.actions';

import { SheetType } from '../../../models/sheet';

import { SlideOverForm } from '../SlideOver';

import Detail from '../elements/Detail';
import Input from '../elements/Input';
import TextArea from '../elements/TextArea';

import Notice, { NoticeStatus } from '../../Notice';

const NewCampaign = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser)!;
  const error = useSelector(selectUserError);

  const [ccNickname, setCcNickname] = useState('');
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [details, setDetails] = useState('');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!overview) return alert('Must provide an overview');
    if (!details) return alert('Must provide a details');

    dispatch(
      createSheetForUserStart(
        SheetType.campaigns,
        { name, ccName: currentUser.name, ccNickname, overview, details },
        { slideOver: true, notification: { status: 'success', heading: 'Campaign Sheet Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm title="Create New Campaign" description="Edit the information below to create your campaign." submitText="Create campaign" submitHandler={submitHandler}>
      <Detail slideOver label="CC Name" detail={currentUser.name} />
      <Input slideOver label="CC Nickname (Opt.)" type="text" name="ccNickname" value={ccNickname} changeHandler={setCcNickname} />
      <Input slideOver label="Campaign Name" type="text" name="name" value={name} changeHandler={setName} />
      <TextArea slideOver label="Campaign Overview" name="overview" rows={4} value={overview} changeHandler={setOverview} />
      <TextArea slideOver label="Campaign Details" name="details" rows={8} value={details} changeHandler={setDetails} />
      {error.campaigns.create && <Notice status={error.campaigns.create.status as NoticeStatus} message={error.campaigns.create.message} />}
    </SlideOverForm>
  );
};

export default NewCampaign;
