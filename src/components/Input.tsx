type InputProps = {
  label: string;
  require?: boolean;
  defaultValue?: string;
  value?: string;
  onChangeValue: (value: string) => void;
  onClick?: () => void;
};

export default function Input({
  label,
  require,
  defaultValue,
  value,
  onChangeValue,
  onClick,
}: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        required={require}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        onClick={onClick}
        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
      />
    </>
  );
}
