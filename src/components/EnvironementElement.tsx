import { useState } from "react";
import { FaCheck, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import ColorPicker from "./ColorPicker";

type Props = {
  index: number;
  label: string;
  color: string;
  onDel: Function;
  onEdit: Function;
};

export default function EnvironementElement({
  index,
  label,
  color,
  onDel,
  onEdit,
}: Props) {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editedColor, setEditedColor] = useState<string>(color);

  const editConfig = () => {
    setEdit(true);
  };

  const saveConfig = () => {
    setEdit(false);
    onEdit(label, editedColor);
  };

  return (
    <div key={index} className="grid grid-cols-3 py-1">
      <div className="my-auto">{label}</div>
      {edit && <ColorPicker color={editedColor} onChange={setEditedColor} />}
      <div className="w-5 h-5 m-auto" style={{ background: color }}></div>
      <div className="grid grid-cols-2">
        <div className="m-auto">
          {edit ? (
            <FaCheck onClick={saveConfig} />
          ) : (
            <FaRegPenToSquare onClick={editConfig} />
          )}
        </div>
        <div className="m-auto">
          {edit ? <></> : <FaRegTrashCan onClick={() => onDel(label)} />}
        </div>
      </div>
    </div>
  );
}
