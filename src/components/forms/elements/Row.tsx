interface Props {
  name: string;
  label: string;
  slideOver?: boolean;
}

const Row: React.FC<Props> = ({ name, label, children, slideOver }) => {
  if (slideOver) {
    return (
      <div className="px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
            {label}
          </label>
        </div>
        <div className="sm:col-span-2">{children}</div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default Row;
