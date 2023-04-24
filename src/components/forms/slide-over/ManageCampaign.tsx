import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import ModalTypes from '../../../utils/ModalTypes';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
// import TextArea from '../../../TextArea';
import Row from '../elements/Row';
import Detail from '../elements/Detail';
import Button from '../../Button';

import { SheetType } from '../../../models/sheet';

const ManageCampaign = () => {
  const dispatch = useDispatch();
  const { setNestedModal } = useActions();

  const currentUser = useSelector(selectCurrentUser);
  const campSheet = useSelector(selectCurrentCampaign)!;

  const [ccNickname, setCcNickname] = useState('');
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (campSheet) {
      setName(campSheet.name);
      setCcNickname(campSheet.ccNickname);
      setOverview(campSheet.overview);
      setDetails(campSheet.details);
    }
  }, [campSheet]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!ccNickname) return alert('Must provide a ccNickname');
    if (!name) return alert('Must provide a name');
    if (!overview) return alert('Must provide an overview');
    if (!details) return alert('Must provide a details');

    dispatch(
      updateSheetStart(
        SheetType.campaigns,
        campSheet._id,
        {
          ccNickname,
          name,
          overview,
          details,
        },
        { slideOver: true, notification: { status: 'success', heading: 'Campaign Sheet Updated', message: `You have successfully updated ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm title="Manage Campaign" description="Edit the information below to update your campaign." submitText="Save campaign" submitHandler={submitHandler}>
      <Detail slideOver label="CC Name" detail={currentUser.name} />
      <Input slideOver label="CC Nickname (Opt.)" type="text" name="ccNickname" value={ccNickname} changeHandler={setCcNickname} />
      <Input slideOver label="Campaign Name" type="text" name="name" value={name} changeHandler={setName} />
      {/* <TextArea slideOver label="Campaign Overview" name="overview" rows={4} value={overview} changeHandler={setOverview} />
      <TextArea slideOver label="Campaign Details" name="details" rows={8} value={details} changeHandler={setDetails} /> */}
      <Row slideOver name="deleteCharacter" label="Delete Character">
        <Button alert onClick={() => setNestedModal({ type: ModalTypes.deleteSheet, data: { sheetType: 'campaigns' } })}>
          Permanently Delete {campSheet?.name}
        </Button>
      </Row>
    </SlideOverForm>
  );
};

export default ManageCampaign;
