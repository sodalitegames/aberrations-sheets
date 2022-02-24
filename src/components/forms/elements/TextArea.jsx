import Row from './Row';

export const TextAreaInput = ({ name, value, changeHandler, ...otherProps }) => {
  return (
    <textarea
      className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-gray-900 focus:border-gray-900"
      name={name}
      value={value}
      onChange={e => changeHandler(e.target.value)}
      {...otherProps}
    />
  );
};

const TextArea = ({ label, changeHandler, value, name, slideOver, ...otherProps }) => {
  return (
    <Row name={name} label={label} slideOver={slideOver}>
      <TextAreaInput name={name} value={value} changeHandler={changeHandler} {...otherProps} />
    </Row>
  );
};

export default TextArea;
