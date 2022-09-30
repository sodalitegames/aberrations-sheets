interface TooltipProps {
  message: string[];
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="relative flex flex-col items-start group">
      {children}
      <div className="absolute bottom-0 flex-col items-center hidden mb-6 bg-gray-600 rounded-md shadow-lg group-hover:flex">
        {message.map(line =>
          line
            .split('\n')
            .filter(line => line)
            .map((line, index) => {
              return (
                <p key={index} className="relative z-10 p-2 text-sm leading-none text-white whitespace-no-wrap ">
                  {line}
                </p>
              );
            })
        )}
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
};

export default Tooltip;
