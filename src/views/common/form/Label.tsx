
function Label({ htmlFor, text, className = '' }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-bold mb-2 ${className}`}
        >
            {text}
        </label>
    );
}

export default Label;
