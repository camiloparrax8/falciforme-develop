const Section = ({ title, children }) => {
    return (
      <div className="mb-4">
        <h6 className="text-md font-semibold mb-2">{title}</h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {children}
        </div>
      </div>
    );
  };
  
  export default Section;
  