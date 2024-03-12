type InputProps = {
  label: string;
  require?: boolean;
  defaultValue?: string;
  onChangeValue: (value: string) => void;
};

export default function Input({
  label,
  require,
  defaultValue,
  onChangeValue,
}: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        required={require}
        defaultValue={defaultValue}
        onChange={(e) => onChangeValue(e.target.value)}
        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
      />
    </>
  );
}
