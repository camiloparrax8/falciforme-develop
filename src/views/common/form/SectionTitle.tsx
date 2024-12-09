const SectionTitle = ({ text, className }) => {
    return (
        <div className={className}>
            <h3 className="text-lg font-semibold mt-4 mb-4 border-b-2 border-blue-500 inline-block">
                {text}
            </h3>
        </div>
    );
};

export default SectionTitle;