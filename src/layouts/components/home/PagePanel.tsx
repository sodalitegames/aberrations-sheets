import { Link } from 'react-router-dom';

import Button from '../../../components/Button';

type PPLink = {
  to: string;
  text: string;
  external?: boolean;
};

interface PagePanelProps {
  heading: string;
  subheading?: string;
  link?: PPLink;
  footer?: PPLink[];
}

const PagePanel: React.FC<PagePanelProps> = ({ heading, subheading, children, link, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
          {subheading ? <p className="max-w-2xl mt-1 text-sm text-gray-500">{subheading}</p> : null}
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
      {children ? <div className="px-4 py-5 border-t border-gray-100 sm:px-6">{children}</div> : null}
      {/* Panel footer */}
      {footer ? (
        <div className="flex justify-end px-5 py-5 border-t border-gray-100 bg-gray-50">
          {footer.map((link, index) => {
            return (
              <div key={index} className="text-base">
                {link.external ? (
                  <a href={link.to} target="_blank" rel="noreferrer" className="p-2 font-medium text-cyan-700 hover:text-cyan-900">
                    {link.text} &rarr;
                  </a>
                ) : (
                  <Link to={link.to}>
                    <button className="p-2 font-medium text-cyan-700 hover:text-cyan-900">{link.text}</button>
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
