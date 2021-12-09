import classNames from '../../utils/classNames';

export const LoadingSpinner = ({ dark }) => {
  return (
    <svg className={classNames(dark ? 'text-black dark:text-white' : 'text-white', 'animate-spin -ml-1 mr-3 h-5 w-5')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

const SubmitButton = ({ type, text, loadingText, loading, classes, notFull }) => {
  if (loading) {
    return (
      <button type="button" className={classNames(`btn-${type}`, notFull ? 'py-2 px-4' : 'w-full', classes)}>
        <LoadingSpinner />
        {loadingText || 'Processing'}
      </button>
    );
  }

  return (
    <button type="submit" className={classNames(`btn-${type}`, notFull ? 'py-2 px-4' : 'w-full', classes)}>
      {text}
    </button>
  );
};

export default SubmitButton;
