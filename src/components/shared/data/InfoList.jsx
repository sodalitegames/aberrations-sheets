import React from 'react';
import NewlineText from '../../utility/NewlineText';

const InfoList = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((item, index) => {
        // check if it has a title
        if (item.title || item.clamp) {
          return (
            <span key={index} title={item.title === undefined ? 'an info list error occurred' : item.title} className="mt-1 text-sm text-gray-600 line-clamp-2">
              <NewlineText text={String(item.value === undefined ? 'an info list error occurred' : item.value)} />
            </span>
          );
        }

        return (
          <span key={index} className="mt-1 text-sm text-gray-600">
            <NewlineText text={String(item === undefined ? 'an info list error occurred' : item)} />
          </span>
        );
      })}
    </React.Fragment>
  );
};

export default InfoList;
