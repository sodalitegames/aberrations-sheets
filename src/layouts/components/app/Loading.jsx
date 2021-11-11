import classNames from '../../../utils/classNames';

const Loading = ({ fullScreen }) => {
  return (
    <div className={classNames(fullScreen ? 'w-screen h-screen' : 'w-full h-full', 'flex justify-center items-center py-16')}>
      <div className="animated-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
