import Row from './Row';

export const Checkbox = ({ heading, description, name }) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" type="checkbox" name={name} />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {heading}
        </label>
        <p className="text-sm text-gray-500 line-clamp-2" title={description}>
          {description}
        </p>
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
