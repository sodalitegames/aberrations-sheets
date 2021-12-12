import classNames from '../../utils/classNames';

const Button = ({ children, classes, text, rounded, alert, small, dark, ...props }) => {
  if (text) {
    return (
      <button
        className={classNames('w-full flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-600', classes)}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={classNames(
        rounded
          ? 'inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 leading-5 font-medium rounded-full'
          : 'w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md',
        alert
          ? 'text-gray-100 bg-red-900 hover:bg-red-800'
          : dark
          ? 'text-white bg-dark hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-200'
          : 'text-gray-700 bg-white hover:bg-gray-50',
        small ? 'text-xs' : 'text-sm',
        classes
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
