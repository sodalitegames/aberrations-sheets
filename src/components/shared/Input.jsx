const Input = ({ label, changeHandler, value, name, slideOver, uneditable, ...otherProps }) => {
  if (uneditable) {
    return (
      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
            {label}
          </label>
        </div>
        <div className="sm:col-span-2">
          <input className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" name={name} value={value} {...otherProps} />
        </div>
      </div>
    );
  }

  if (slideOver) {
    return (
      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
            {label}
          </label>
        </div>
        <div className="sm:col-span-2">
          <input
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            name={name}
            value={value}
            onChange={e => changeHandler(e.target.value)}
            {...otherProps}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
        {label}
      </label>
      <div className="mt-2">
        <input
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          name={name}
          value={value}
          onChange={e => changeHandler(e.target.value)}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default Input;
