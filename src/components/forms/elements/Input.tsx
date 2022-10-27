import { Field, ErrorMessage, useField } from 'formik';

import Row from './Row';

import classNames from '../../../utils/classNames';

const INPUT_STYLES = 'block w-full text-gray-900 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-gray-900 focus:border-gray-900';

interface BasicInputProps {
  changeHandler: Function;
  value: string | number;
  name: string;
  type: string;
}

export const BasicInput: React.VFC<BasicInputProps> = ({ name, value, type, changeHandler }) => {
  return <input className={INPUT_STYLES} name={name} value={value} type={type} onChange={e => changeHandler(e.target.value)} />;
};

interface FormikInputProps {
  name: string;
  type: string;
}

export const FormikInput: React.VFC<FormikInputProps> = ({ name, type }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <Field as="input" name={name} type={type} className={classNames(INPUT_STYLES, meta.error && meta.touched ? 'border-red-700 focus:ring-red-700 focus:border-red-700' : '')} />
      <ErrorMessage name={name}>{message => <p className="mt-1 text-xs text-right text-red-700">{message}</p>}</ErrorMessage>
    </>
  );
};

interface InputProps {
  label: string;
  name: string;
  type: 'number' | 'text';
  changeHandler?: Function;
  value?: string | number;
  slideOver?: boolean;
  formik?: boolean;
}

const Input: React.VFC<InputProps> = ({ label, changeHandler, value, name, slideOver, formik, type }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      {formik ? <FormikInput name={name} type={type} /> : <BasicInput name={name} value={value!} type={type} changeHandler={changeHandler!} />}
    </Row>
  );
};

export default Input;
