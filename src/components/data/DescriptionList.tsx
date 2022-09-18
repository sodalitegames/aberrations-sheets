import NewlineText from '../NewlineText';
import Tooltip from '../Tooltip';

import classNames from '../../utils/classNames';

interface ValuesListItem {
  tooltip?: string[];
  value: string;
}

interface DescriptionListItem {
  name: string;
  values: (string | number)[] | ValuesListItem[];
  half?: boolean;
}

interface DescriptionListProps {
  list: DescriptionListItem[];
  classes?: string;
}

const DescriptionList: React.VFC<DescriptionListProps> = ({ list, classes }) => {
  return (
    <dl className={classNames('grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2', classes || '')}>
      {list.map(
        (item, index) =>
          item && (
            <div key={index} className={classNames(item.half ? 'sm:col-span-1' : 'sm:col-span-2')}>
              <dt className="text-xs text-gray-500 font-base">{item.name}</dt>
              {item.values.map((value, index) => {
                if (value === undefined) {
                  return (
                    <dd key={index} className="mt-1 text-sm text-gray-900">
                      [undefined]
                    </dd>
                  );
                }

                if (typeof value === 'string' || typeof value === 'number') {
                  return (
                    <dd key={index} className="mt-1 text-sm text-gray-900">
                      <NewlineText text={String(value)} />
                    </dd>
                  );
                }

                return (
                  <Tooltip key={index} message={value.tooltip || []}>
                    <dd key={index} className="mt-1 text-sm text-gray-900">
                      <NewlineText text={String(value.value)} />
                    </dd>
                  </Tooltip>
                );
              })}
            </div>
          )
      )}
    </dl>
  );
};

export default DescriptionList;
