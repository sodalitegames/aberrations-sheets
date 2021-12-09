import React from 'react';

import classNames from '../../utils/classNames';

import Row from './Row';

export const SelectInput = ({ name, value, options, changeHandler, ...otherProps }) => {
  return (
    <select
      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      name={name}
      value={value}
      onChange={e => changeHandler(e)}
      {...otherProps}
    >
      <option className="text-sm" value="">
        Select One
      </option>
      {options.map((opt, index) => {
        return (
          <React.Fragment key={index}>
            <option className={classNames(opt.children ? 'text-xs uppercase font-semibold text-gray-700 bg-gray-100' : 'text-sm')} value={opt.id || ''} disabled={!!opt.children || opt.disabled}>
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
  );
};

const Select = ({ label, changeHandler, value, name, options, slideOver, ...otherProps }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      <SelectInput name={name} value={value} options={options} changeHandler={changeHandler} {...otherProps} />
    </Row>
  );
};

export default Select;
