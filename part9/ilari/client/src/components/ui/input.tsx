interface InputProps {
  name: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ value, name, onChange }: InputProps) => (
  <input 
    type="text" 
    placeholder={name}
    name={name}
    value={value}
    onChange={onChange}
    className="bg-zinc-500 text-white font-bold pl-2 rounded-sm"
  />
)

export default Input