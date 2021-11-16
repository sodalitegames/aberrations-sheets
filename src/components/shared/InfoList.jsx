import React from 'react';

const InfoList = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((item, index) => {
        // check if it has a title
        if (item.title) {
          return (
            <p key={index} title={item.title} className="mt-1 text-sm text-gray-600 truncate">
              {item.value}
            </p>
          );
        }

        return (
          <p key={index} className="mt-1 text-sm text-gray-600">
            {item}
          </p>
        );
      })}
    </React.Fragment>
  );
};

export default InfoList;
