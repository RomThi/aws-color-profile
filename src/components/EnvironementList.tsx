import { Config } from "../type";
import EnvironementElement from "./EnvironementElement";

export default function EnvironementList({
  config,
  onDel,
  onEdit,
}: {
  config: Config;
  onDel: (key: string) => () => void;
  onEdit: (key: string, color: string) => Promise<void>;
}) {
  if (Object.keys(config).length === 0) {
    return <div className="grow">No config found</div>;
  }

  return (
    <div className="grow">
      <h2 className="text-2xl font-bold">Environement List</h2>
      <div className="flex flex-col">
        {Object.keys(config).map((label, index) => {
          return (
            <EnvironementElement
              label={label}
              index={index}
              color={config[label]}
              onDel={onDel}
              onEdit={onEdit}
            />
          );
        })}
      </div>
    </div>
  );
}
