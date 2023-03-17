import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';
import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';

import ListInteractables, { ListInteractablesMessage } from '../../../../components/sections/ListInteractables';

const InteractablesPageContent = ({ sheetType, show, id, list, type, label, interactable, Display, Actions }) => {
  return (
    <SheetPageContent title={`${label}s`} columns={4}>
      {/* Showing Archived Interactables Notice */}
      <ListInteractablesMessage show={show} interactableType={type} />

      {/* Interactables List */}
      <SheetPagePanel title={`Manage ${label}s`}>
        <div className="flow-root mt-2">
          <ListInteractables sheetType={sheetType} interactableType={type} id={id} interactablesList={list} label={label} show={show} />
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
