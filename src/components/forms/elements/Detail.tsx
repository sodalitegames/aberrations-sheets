import classNames from '../../../utils/classNames';
import NewlineText from '../../NewlineText';

interface DetailProps {
  label: string;
  detail: string;
  status?: 'error' | 'success';
  slideOver?: boolean;
}

const Detail: React.FC<DetailProps> = ({ label, detail, status, slideOver }) => {
  if (slideOver) {
    return (
      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <div>
          <h4 className={classNames(status === 'error' ? 'text-red-700' : 'text-gray-900', 'block text-sm font-medium sm:mt-px')}>{label}</h4>
        </div>
        <div className="sm:col-span-2">
          <span className={classNames(status === 'error' ? 'text-red-700' : 'text-gray-900', 'sm:text-sm')}>
            <NewlineText text={String(detail)} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h4 className={classNames(status === 'error' ? 'text-red-700' : 'text-gray-900', 'block text-sm font-medium sm:mt-px sm:pt-2')}>{label}</h4>
      <div className="mt-2">
        <span className={classNames(status === 'error' ? 'text-red-700' : 'text-gray-900', 'sm:text-sm')}>
          <NewlineText text={String(detail)} />
        </span>
      </div>
    </div>
  );
};

export default Detail;
