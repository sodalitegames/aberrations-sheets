import classNames from '../utils/classNames';

interface ButtonProps {
  onClick?: () => void;
  classes?: string;
  text?: boolean;
  dark?: boolean;
  rounded?: boolean;
  alert?: boolean;
  small?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
}

const Button: React.FC<ButtonProps> = ({ children, classes, text, rounded, alert, small, dark, onClick, disabled, disabledMessage, ...props }) => {
  if (text) {
    return (
      <button
        className={classNames('w-full flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-600', classes ? classes : '')}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <button
        className={classNames(
          rounded
            ? 'inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 leading-5 font-medium rounded-full'
            : 'w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md',
          alert
            ? 'text-white bg-red-900/80 hover:bg-red-800/80'
            : dark
            ? 'text-white bg-dark hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-200'
            : 'text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
          small ? 'text-xs' : 'text-sm',
          classes ? classes : ''
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
      {disabled && disabledMessage ? <p className="text-sm italic text-gray-400">{disabledMessage}</p> : null}
    </>
  );
};

export default Button;
