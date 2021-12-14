import classNames from '../../utils/classNames';

const PanelSection = ({ title, colSpan, rowSpan, children }) => {
  return (
    <section
      className={classNames(
        colSpan === 1 ? 'col-span-1' : '',
        colSpan === 2 ? 'col-span-2' : '',
        colSpan === 3 ? 'col-span-3' : '',
        colSpan === 4 ? 'col-span-4' : '',
        !colSpan ? 'col-span-1' : '',
        rowSpan === 1 ? 'row-span-1' : '',
        rowSpan === 2 ? 'row-span-2' : '',
        rowSpan === 3 ? 'row-span-3' : '',
        rowSpan === 4 ? 'row-span-4' : '',
        !rowSpan ? 'row-span-1' : ''
      )}
    >
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          {title ? <h2 className="text-base font-medium text-gray-900 mb-2">{title}</h2> : null}
          <div className="flow-root">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default PanelSection;
