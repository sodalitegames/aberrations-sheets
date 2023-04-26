import { ModalContainer } from '../Modal';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';

import { Belonging, BelongingType, SheetType } from '../../../models/sheet';
import { Consumable, Usable, Weapon, Wearable } from '../../../models/sheet/resources';

import { getBelongingTypeCapitalized } from '../../../utils/helpers/belongings';

interface Props {
  nested?: boolean;
  data: {
    belongingType: BelongingType;
    belonging: Belonging;
  };
}

const ShowBelonging: React.FC<Props> = ({ data, nested }) => {
  return (
    <ModalContainer title={`View ${getBelongingTypeCapitalized(data.belongingType)}`} nested={nested}>
      {data.belongingType === 'weapons' ? (
        <DisplayWeapon weapon={data.belonging as Weapon} sheetType={SheetType.characters} />
      ) : data.belongingType === 'wearables' ? (
        <DisplayWearable wearable={data.belonging as Wearable} sheetType={SheetType.characters} />
      ) : data.belongingType === 'consumables' ? (
        <DisplayConsumable consumable={data.belonging as Consumable} sheetType={SheetType.characters} />
      ) : data.belongingType === 'usables' ? (
        <DisplayUsable usable={data.belonging as Usable} sheetType={SheetType.characters} />
      ) : (
        'Error loading belonging...'
      )}
    </ModalContainer>
  );
};

export default ShowBelonging;
