import classNames from '../../utils/classNames';

const Button = ({ children, classes, ...props }) => {
  return (
    <button
      className={classNames('w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50', classes)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
