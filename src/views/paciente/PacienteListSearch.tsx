import { forwardRef } from 'react';
import DebouceInput from '@/components/shared/DebouceInput';
import { TbSearch } from 'react-icons/tb';

type PacienteListSearchProps = {
  onInputChange: (value: string) => void;
  onEnter?: (value: string) => void; 
};

const PacienteListSearch = forwardRef<
  HTMLInputElement,
  PacienteListSearchProps
>((props, ref) => {
  const { onInputChange, onEnter } = props;

  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(e.currentTarget.value); 
    }
  };

  return (
    <DebouceInput
      ref={ref}
      placeholder="Buscar paciente..."
      suffix={<TbSearch className="text-lg" />}
      onChange={(e) => onInputChange(e.target.value)} 
      onKeyPress={handleKeyPress} 
    />
  );
});

PacienteListSearch.displayName = 'PacienteListSearch';

export default PacienteListSearch;
