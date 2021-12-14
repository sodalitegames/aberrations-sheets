import { Link } from 'react-router-dom';

import Button from '../../../components/shared/Button';

const PagePanel = ({ heading, subheading, children, link, footer }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      {/* Panel header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{heading}</h3>
          {subheading ? <p className="mt-1 max-w-2xl text-sm text-gray-500">{subheading}</p> : null}
        </div>
        {link ? (
          <div>
            <Link to={link.to}>
              <Button>{link.text}</Button>
            </Link>
          </div>
        ) : null}
      </div>
      {/* Panel content */}
      {children ? <div className="border-t border-gray-100 px-4 py-5 sm:px-6">{children}</div> : null}
      {/* Panel footer */}
      {footer ? (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-5 flex justify-end">
          {footer.map((link, index) => {
            return (
              <div key={index} className="text-base">
                {link.external ? (
                  <a href={link.to} target="_blank" rel="noreferrer" className="font-medium text-cyan-700 hover:text-cyan-900 p-2">
                    {link.text} &rarr;
                  </a>
                ) : (
                  <Link to={link.to}>
                    <button className="font-medium text-cyan-700 hover:text-cyan-900 p-2">{link.text}</button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PagePanel;
