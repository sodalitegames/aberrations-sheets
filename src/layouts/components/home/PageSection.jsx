const PageSection = ({ heading, children }) => {
  return (
    <section>
      <h2 className="text-lg leading-6 font-medium">{heading}</h2>
      {children}
    </section>
  );
};

export default PageSection;
