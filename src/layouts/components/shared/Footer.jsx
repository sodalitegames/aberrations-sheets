import classNames from '../../../utils/classNames';

const Footer = ({ classes }) => {
  return (
    <footer>
      <div className={classNames('mx-auto px-4 sm:px-6 lg:px-8', classes)}>
        <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
          <span className="block sm:inline">&copy; 2021 Aberrations RPG by Sodalite Games.</span> <span className="block sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
