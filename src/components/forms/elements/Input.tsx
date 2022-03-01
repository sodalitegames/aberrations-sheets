import Row from './Row';

interface InputElProps {
  changeHandler: Function;
  value: string | number;
  name: string;
}

export const InputEl: React.VFC<InputElProps> = ({ name, value, changeHandler, ...otherProps }) => {
  return (
    <input
      className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-gray-900 focus:border-gray-900"
      name={name}
      value={value}
      onChange={e => changeHandler(e.target.value)}
      {...otherProps}
    />
  );
};

interface InputProps {
  label: string;
  changeHandler: Function;
  value: string | number;
  name: string;
  slideOver?: boolean;
  type: 'number' | 'text';
}

const Input: React.VFC<InputProps> = ({ label, changeHandler, value, name, slideOver, ...otherProps }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      <InputEl name={name} value={value} changeHandler={changeHandler} {...otherProps} />
    </Row>
  );
};

export default Input;
