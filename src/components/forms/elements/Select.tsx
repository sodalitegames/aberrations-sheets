import React from 'react';

import classNames from '../../../utils/classNames';

import Row from './Row';

export interface SelectOption {
  id: string;
  name: string;
  displayName?: string;
  disabled?: boolean;
  children?: SelectOption[];
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  changeHandler: ($event: React.ChangeEvent<HTMLSelectElement>) => void;
  slideOver?: boolean;
}

interface SelectInputProps {
  name: string;
  value: string;
  options: SelectOption[];
  changeHandler: ($event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, value, options, changeHandler, ...otherProps }) => {
  return (
    <select
      className="w-full text-gray-900 border-gray-300 rounded-md shadow-sm lock sm:text-sm focus:ring-gray-900 focus:border-gray-900"
      name={name}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeHandler(event)}
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

const Select: React.FC<SelectProps> = ({ label, changeHandler, value, name, options, slideOver, ...otherProps }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      <SelectInput name={name} value={value} options={options} changeHandler={changeHandler} {...otherProps} />
    </Row>
  );
};

export default Select;
