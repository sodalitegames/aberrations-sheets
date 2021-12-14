const NewlineText = ({ text }) => {
  return (
    <span className="space-y-4">
      {text.split('\n').map((string, index) => (
        <p key={index}>{string}</p>
      ))}
    </span>
  );
};

export default NewlineText;
