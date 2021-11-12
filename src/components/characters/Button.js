import classNames from '../../utils/classNames';

const Button = ({ children, classes, rounded, ...props }) => {
  return (
    <button
      className={classNames(
        rounded
          ? 'inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'
          : 'w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
        classes
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
