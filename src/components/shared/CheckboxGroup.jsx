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
  if (slideOver) {
    return (
      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <div>
          <label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">{label}</label>
        </div>
        <div className="sm:col-span-2 space-y-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default CheckboxGroup;
