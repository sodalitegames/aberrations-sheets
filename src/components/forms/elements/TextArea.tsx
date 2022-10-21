import { Field, useField, ErrorMessage } from 'formik';
import Row from './Row';

import classNames from '../../../utils/classNames';

const TEXT_AREA_STYLES = 'block w-full text-gray-900 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-gray-900 focus:border-gray-900';

interface BasicTextAreaProps {
  value: string;
  name: string;
  rows: number;
  changeHandler: Function;
}

export const BasicTextArea: React.FC<BasicTextAreaProps> = ({ name, value, rows, changeHandler }) => {
  return <textarea className={TEXT_AREA_STYLES} name={name} value={value} rows={rows} onChange={e => changeHandler(e.target.value)} />;
};

interface FormikTextAreaProps {
  name: string;
  rows: number;
}

const FormikTextArea: React.FC<FormikTextAreaProps> = ({ name, rows }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <Field as="textarea" name={name} rows={rows} className={classNames(TEXT_AREA_STYLES, meta.error && meta.touched ? 'border-red-700 focus:ring-red-700 focus:border-red-700' : '')} />
      <ErrorMessage name={name}>{message => <p className="mt-1 text-xs text-right text-red-700">{message}</p>}</ErrorMessage>
    </>
  );
};

interface TextAreaProps {
  label: string;
  name: string;
  changeHandler?: Function;
  value?: string;
  slideOver?: boolean;
  formik?: boolean;
  rows: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, changeHandler, value, name, slideOver, formik, rows = 4 }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      {formik ? <FormikTextArea name={name} rows={rows} /> : <BasicTextArea name={name} value={value!} changeHandler={changeHandler!} rows={rows} />}
    </Row>
  );
};

export default TextArea;
