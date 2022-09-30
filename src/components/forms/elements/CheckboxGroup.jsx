import { useState } from 'react';
import Row from './Row';
import Tooltip from '../../Tooltip';

export const Checkbox = ({ heading, description, name, checked }) => {
  const [selected, setSelected] = useState(checked);
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900" type="checkbox" name={name} checked={selected} onChange={() => setSelected(!selected)} />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {heading}
        </label>
        <Tooltip message={[description]}>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </Tooltip>
      </div>
    </div>
  );
};

const CheckboxGroup = ({ label, children, slideOver }) => {
  return (
    <Row label={label} slideOver={slideOver}>
      <div className="space-y-4">{children}</div>
    </Row>
  );
};

export default CheckboxGroup;
