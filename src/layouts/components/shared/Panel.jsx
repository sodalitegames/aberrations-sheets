const Panel = ({ children }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {/* Panel header */}
      <div></div>
      {/* Panel content */}
      <div className="p-5">{children}</div>
      {/* Panel footer */}
      <div className="bg-gray-50 px-5 py-3">
        {/* <div className="text-sm">
            <button className="font-medium text-cyan-700 hover:text-cyan-900">View all</button>
          </div> */}
      </div>
    </div>
  );
};

export default Panel;
