type EditInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
};

export default function EditInput({ placeholder, onChange }: EditInputProps) {
  return (
    <>
      <input
        type="text"
        required
        defaultValue={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
      />
    </>
  );
}
