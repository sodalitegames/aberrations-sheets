import React from 'react';
import { Field, useField, ErrorMessage } from 'formik';

import classNames from '../../../utils/classNames';

import Row from './Row';

const SELECT_STYLES = 'w-full text-gray-900 border-gray-300 rounded-md shadow-sm lock sm:text-sm focus:ring-gray-900 focus:border-gray-900';
export interface SelectOption {
  id: string;
  name: string;
  displayName?: string;
  disabled?: boolean;
  children?: SelectOption[];
}

const SelectOptions = ({ options }: { options: SelectOption[] }) => {
  return (
    <>
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
    </>
  );
};

interface BasicSelectProps {
  name: string;
  value: string;
  options: SelectOption[];
  changeHandler: Function;
  required?: boolean;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({ name, value, options, changeHandler, required }) => {
  return (
    <select className={SELECT_STYLES} name={name} value={value} onChange={e => changeHandler(e.target.value)} required={required}>
      <SelectOptions options={options} />
    </select>
  );
};

interface FormikSelectProps {
  name: string;
  options: SelectOption[];
}

export const FormikSelect: React.VFC<FormikSelectProps> = ({ name, options }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <Field as="select" name={name} className={classNames(SELECT_STYLES, meta.error && meta.touched ? 'border-red-700 focus:ring-red-700 focus:border-red-700' : '')}>
        <SelectOptions options={options} />
      </Field>
      <ErrorMessage name={name}>{message => <p className="mt-1 text-xs text-right text-red-700">{message}</p>}</ErrorMessage>
    </>
  );
};

interface SelectProps {
  label: string;
  name: string;
  value?: string;
  options: SelectOption[];
  changeHandler?: Function;
  slideOver?: boolean;
  formik?: boolean;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ label, changeHandler, value, name, options, formik, slideOver, required }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      {formik ? <FormikSelect name={name} options={options} /> : <BasicSelect name={name} value={value!} options={options} changeHandler={changeHandler!} required={required} />}
    </Row>
  );
};

export default Select;
