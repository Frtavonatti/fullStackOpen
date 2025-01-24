interface RadioProps {
  name: string;
  value: string,
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ name, value, checked, onChange }: RadioProps) => (
  <label className="font-semibold ml-1">
    <input className="radio"
    type="radio" name={name} value={value} checked={checked} onChange={onChange} />
    { value }
  </label>
)

export default Radio
