import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import { Config } from "../type";

export default function EnvironementList({
  config,
  onDel,
  onEdit,
}: {
  config: Config;
  onDel: (key: string) => () => void;
  onEdit: (key: string) => () => void;
}) {
  if (Object.keys(config).length === 0) {
    return <div className="grow">No config found</div>;
  }
  return (
    <div className="grow">
      <h2 className="text-2xl font-bold">Environement List</h2>
      <div className="flex flex-col">
        {Object.keys(config).map((key, index) => {
          return (
            <div key={index} className="grid grid-cols-3 py-1">
              <div className="my-auto">{key}</div>
              <div
                className="w-5 h-5 m-auto"
                style={{ background: config[key] }}
              ></div>
              <div className="grid grid-cols-2">
                <div className="m-auto">
                  <FaRegPenToSquare />
                </div>
                <div className="m-auto">
                  <FaRegTrashCan onClick={onDel(key)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
