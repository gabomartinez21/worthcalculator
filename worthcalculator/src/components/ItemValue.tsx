import { ChangeEvent, useState, useRef, useEffect } from 'react'
import { formatCount } from '../helpers';

interface PropItemValue {
  value: number;
  currency: string;
  index: number;
  handleChange: (event:ChangeEvent<HTMLInputElement>, i:number) => void;
}

export const ItemValue = ({value, currency, handleChange, index}:PropItemValue) => {

  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event:MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowEdit(false)
    }
  };

  return (
    <div className="col" onClick={() => setShowEdit(true)} ref={ref}>
      {showEdit ? (
        <div className="formEdit">
          <input 
            type="text" 
            value={value}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ) : (
        <p>{formatCount(value, currency)}</p>
      )}
    </div>
  )
}
