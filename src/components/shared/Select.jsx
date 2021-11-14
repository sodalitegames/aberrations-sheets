import React from 'react';

import classNames from '../../utils/classNames';

const Select = ({ label, changeHandler, value, name, options, slideOver, ...otherProps }) => {
  if (slideOver) {
    return (
      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
            {label}
          </label>
        </div>
        <div className="sm:col-span-2">
          <select className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" name={name} onChange={e => changeHandler(e)} {...otherProps}>
            <option className="text-sm" value="">
              Select One
            </option>
            {options.map((opt, index) => {
              return (
                <React.Fragment key={index}>
                  <option className={classNames(opt.children ? 'text-xs uppercase font-semibold text-gray-700 bg-gray-100' : 'text-sm')} value={opt.id || ''} disabled={!!opt.children}>
                    {opt.displayName || opt.name}
                  </option>
                  {opt.children &&
                    opt.children.map((childOpt, index) => {
                      return (
                        <option key={index} className="text-sm" value={childOpt.id} disabled={childOpt.disabled}>
                          {childOpt.displayName || childOpt.name}
                        </option>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </select>
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
        <select className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" name={name} onChange={e => changeHandler(e)} {...otherProps}>
          <option className="text-sm" value="">
            Select One
          </option>
          {options.map((opt, index) => {
            return (
              <React.Fragment key={index}>
                <option className="text-xs uppercase font-semibold text-gray-700 bg-gray-100" value={opt.id} disabled={!!opt.children}>
                  {opt.displayName || opt.name}
                </option>
                {opt.children &&
                  opt.children.map((childOpt, index) => {
                    return (
                      <option key={index} className="text-sm" value={childOpt.id} disabled={childOpt.disabled}>
                        {childOpt.displayName || childOpt.name}
                      </option>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
