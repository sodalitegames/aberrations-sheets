import classNames from '../../utils/classNames';

const Chip = ({ color, children, classes }) => {
  return (
    <div
      className={classNames(
        color === 'red' ? 'bg-red-100 text-red-800' : '',
        color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : '',
        color === 'green' ? 'bg-green-100 text-green-800' : '',
        'inline-flex justify-center items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-0',
        classes
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
