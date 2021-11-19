import { useDispatch } from 'react-redux';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import DescriptionList from '../../shared/DescriptionList';
import Button from '../../shared/Button';

const Campaign = ({ campaign, condensed }) => {
  const dispatch = useDispatch();

  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <div>
      <DescriptionList list={[{ name: 'Campaign Name', values: ['Fake Campaign Name'] }]} />
      <div className="mt-6">
        <Button text onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.charLogForm }))}>
          Leave Campaign
        </Button>
      </div>
    </div>
  );
};

export default Campaign;
