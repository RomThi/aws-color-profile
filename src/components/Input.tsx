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
      />
    </>
  );
}
