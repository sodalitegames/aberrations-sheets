import classNames from '../../utils/classNames';

const DescriptionList = ({ list, classes }) => {
  return (
    <dl className={classNames('grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2', classes)}>
      {list.map(
        (item, index) =>
          item && (
            <div key={index} className={classNames(item.half ? 'sm:col-span-1' : 'sm:col-span-2')}>
              <dt className="text-xs font-base text-gray-500">{item.name}</dt>
              {item.values.map((value, index) => (
                <dd key={index} className="mt-1 text-sm text-gray-900">
                  {value}
                </dd>
              ))}
            </div>
          )
      )}
    </dl>
  );
};

export default DescriptionList;
