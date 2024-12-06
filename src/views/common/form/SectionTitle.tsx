import React from 'react';

const SectionTitle = ({ text }) => {
    return (
        <div className="col-span-4">
            <h3 className="text-lg font-semibold mb-4">{text}</h3>
        </div>
    );
};

export default SectionTitle;
