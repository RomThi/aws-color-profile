import { Config } from "../type";

export default function EnvironementList({ config }: { config: Config }) {
  return (
    <div>
      <h1>Environement List</h1>
      <ul>
        {Object.keys(config).map((key, index) => {
          return (
            <li key={index}>
              {key}: {config[key]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
