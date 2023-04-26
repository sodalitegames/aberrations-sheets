import { useEffect, useState } from 'react';
import Row from './Row';
import Tooltip from '../../Tooltip';
import { Field } from 'formik';

const CHECKBOX_STYLES = 'w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900';

export const BasicCheckbox = ({ heading, description, name, checked }) => {
  const [selected, setSelected] = useState(checked);

  useEffect(() => {
    setSelected(checked);
  }, [checked]);

  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input className={CHECKBOX_STYLES} type="checkbox" name={name} checked={selected} onChange={() => setSelected(!selected)} />
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

export const FormikCheckbox = ({ name, value, heading, description }) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <Field type="checkbox" name={name} value={value} className={CHECKBOX_STYLES} />
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
