import Input from '@/components/ui/Input'
const Field = ({ label, value, span = 1 }) => {
    return (
      <div className={`col-span-${span}`}>
        <label className="block text-sm font-bold mb-1">{label}</label>
        <Input size="sm" disabled value={value} />
      </div>
    );
  };
  
  export default Field;