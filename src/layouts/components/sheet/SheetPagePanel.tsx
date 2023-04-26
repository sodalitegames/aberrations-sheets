import classNames from '../../../utils/classNames';

interface Props {
  title?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
  classes?: string;
}

const SheetPagePanel: React.FC<Props> = ({ title, colSpan, rowSpan, classes, children }) => {
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
        !rowSpan ? 'row-span-1' : '',
        classes || ''
      )}
    >
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {title ? <h2 className="mb-2 text-base font-medium text-gray-900">{title}</h2> : null}
          <div className="flow-root">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SheetPagePanel;
