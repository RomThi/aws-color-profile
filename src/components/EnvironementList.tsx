import { Config } from "../type";

export default function EnvironementList({ config }: { config: Config }) {
  console.log("config", config);
  if (Object.keys(config).length === 0) {
    return <div className="grow">No config found</div>;
  }
  return (
    <div className="grow">
      <h2 className="text-2xl font-bold">Environement List</h2>
      <div className="flex flex-col">
        {Object.keys(config).map((key, index) => {
          return (
            <div key={index} className="grow flex justify-around">
              {key}: {config[key]}
              <div
                className="w-5 h-5"
                style={{ background: config[key] }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
