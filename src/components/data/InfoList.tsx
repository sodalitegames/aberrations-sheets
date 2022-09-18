import React from 'react';
import NewlineText from '../NewlineText';
import Tooltip from '../Tooltip';

export interface InfoListItem {
  tooltip?: string[];
  value: string;
  clamp?: boolean;
}

interface InfoListProps {
  list: string[] | InfoListItem[];
}

const InfoList: React.FC<InfoListProps> = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((item, index: number) => {
        if (!item) {
          return (
            <span key={index} className="mt-1 text-sm text-gray-600">
              undefined (info list error)
            </span>
          );
        }

        // Check if item is a string
        if (typeof item === 'string') {
          return (
            <span key={index} className="mt-1 text-sm text-gray-600">
              <NewlineText text={String(item || '')} />
            </span>
          );
        }

        return (
          <Tooltip key={index} message={item.tooltip || []}>
            <span className="mt-1 text-sm text-gray-600 line-clamp-2">
              <NewlineText text={String(item.value || '')} />
            </span>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
};

export default InfoList;
