import EmptyState from './EmptyState';

import Button from './Button';
import classNames from '../../utils/classNames';

const ListContainer = ({ list, button, empty, classes, children }) => {
  if (empty && !list.length) {
    return <EmptyState heading={empty.heading} message={empty.message} button={empty.button} />;
  }

  return (
    <>
      {button ? (
        <div className="mb-4">
          <Button onClick={button.click}>{button.text}</Button>
        </div>
      ) : null}
      <ul className={classNames('divide-y divide-gray-200', classes)}>{children}</ul>
    </>
  );
};

export default ListContainer;
