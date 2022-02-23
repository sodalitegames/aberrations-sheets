interface NewlineTextProps {
  text?: string;
  children?: string;
}

const NewlineText: React.FC<NewlineTextProps> = ({ text, children }) => {
  return (
    <span className="space-y-1">
      {String(children || text)
        .split('\n')
        .map((string, index) => (
          <p key={index}>{string}</p>
        ))}
    </span>
  );
};

export default NewlineText;
