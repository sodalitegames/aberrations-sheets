import EmptyState from './EmptyState';

const ListContainer = ({ list, empty, children }) => {
  if (empty && !list.length) {
    return <EmptyState heading={empty.heading} message={empty.message} button={empty.button} />;
  }

  return <ul className="-my-5 divide-y divide-gray-200">{children}</ul>;
};

export default ListContainer;
