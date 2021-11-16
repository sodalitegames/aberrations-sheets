const PanelSection = ({ title, colSpan, rowSpan, children }) => {
  return (
    <section className={`col-span-${colSpan || 1} row-span-${rowSpan || 1}`}>
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
