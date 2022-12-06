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
  columns?: number;
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
              <dd key={index} className={classNames(item.columns === 2 ? 'grid grid-cols-2' : item.columns === 3 ? 'grid grid-cols-3' : '', 'mt-1 text-sm text-gray-900')}>
                {item.values.map((value, index) => {
                  if (value === undefined) {
                    return <span key={index}>[undefined]</span>;
                  }

                  if (typeof value === 'string' || typeof value === 'number') {
                    return (
                      <span key={index} className="">
                        <NewlineText text={String(value)} />
                      </span>
                    );
                  }

                  return (
                    <Tooltip key={index} message={value.tooltip || []}>
                      <span>
                        <NewlineText text={String(value.value)} />
                      </span>
                    </Tooltip>
                  );
                })}
              </dd>
            </div>
          )
      )}
    </dl>
  );
};

export default DescriptionList;
