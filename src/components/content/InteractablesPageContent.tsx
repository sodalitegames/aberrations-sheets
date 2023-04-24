import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';
import SheetPagePanel from '../../layouts/components/sheet/SheetPagePanel';

import ListInteractables, { ListInteractablesMessage } from './ListInteractables';

import { Interactable, InteractableType, SheetType } from '../../models/sheet';

interface Props {
  sheetType: SheetType;
  sheetId: string;
  list: Interactable[];
  interactable: Interactable;
  type: InteractableType;
  label: string;
  show: string | null;
  id: string;
  Display: React.FC;
  Actions: React.FC;
  List?: React.FC;
}

const InteractablesPageContent: React.FC<Props> = ({ sheetType, sheetId, show, id, list, type, label, interactable, Display, Actions, List }) => {
  return (
    <SheetPageContent title={`${label}s`} columns={4}>
      {/* Showing Archived Interactables Notice */}
      <ListInteractablesMessage show={show} interactableType={type} />

      {/* Interactables List */}
      <SheetPagePanel title={`Manage ${label}s`} classes="col-span-2 lg:col-span-1">
        <div className="flow-root mt-2">
          {List !== undefined ? <List /> : <ListInteractables sheetType={sheetType} sheetId={sheetId} interactableType={type} id={id} interactablesList={list} label={label} show={show} />}
        </div>
      </SheetPagePanel>

      {/* Selected Interactable */}
      <SheetPagePanel title={`Selected ${label}`} colSpan={3}>
        {interactable ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <Display />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              <Actions />
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a {label} to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default InteractablesPageContent;
