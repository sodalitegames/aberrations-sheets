import { useSetRecoilState } from 'recoil';

import { slideOverState } from '../../../recoil/app/app.atoms';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import DescriptionList from '../../shared/DescriptionList';
import Button from '../../shared/Button';

const Campaign = ({ campaign, condensed }) => {
  const setSlideOver = useSetRecoilState(slideOverState);

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
        <Button text onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>
          Leave Campaign
        </Button>
      </div>
    </div>
  );
};

export default Campaign;
