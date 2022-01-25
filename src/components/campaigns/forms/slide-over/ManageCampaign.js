import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../../redux/user/user.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import ModalTypes from '../../../../utils/ModalTypes';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
// import TextArea from '../../../shared/TextArea';
import Row from '../../../shared/form/Row';
import Detail from '../../../shared/form/Detail';
import Button from '../../../shared/Button';

const ManageCampaign = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const campSheet = useSelector(selectCurrentCampaign);

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

  const submitHandler = async e => {
    e.preventDefault();

    if (!ccNickname) return alert('Must provide a ccNickname');
    if (!name) return alert('Must provide a name');
    if (!overview) return alert('Must provide an overview');
    if (!details) return alert('Must provide a details');

    dispatch(
      updateSheetStart(
        'campaigns',
        campSheet._id,
        {
          ccNickname,
          name,
          overview,
          details,
        },
        { slideOver: true }
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
        <Button alert type="button" onClick={() => dispatch(setModal({ type: ModalTypes.deleteSheet, data: { sheetType: 'campaigns' } }))}>
          Permanently Delete {campSheet.name}
        </Button>
      </Row>
    </SlideOverForm>
  );
};

export default ManageCampaign;
