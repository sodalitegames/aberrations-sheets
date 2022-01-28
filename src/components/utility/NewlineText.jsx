const NewlineText = ({ text, children }) => {
  return (
    <span className="space-y-1">
      {(text || children || 'a newline text error occurred').split('\n').map((string, index) => (
        <p key={index}>{string}</p>
      ))}
    </span>
  );
};

export default NewlineText;
