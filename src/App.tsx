import { useEffect, useState } from "react";
import Chrome from "@uiw/react-color-chrome";
import { ChromeMessage, Config, Sender } from "./type";
import Input from "./components/Input";
import EnvironementList from "./components/EnvironementList";
import Button from "./components/Button";
import { GithubPlacement } from "@uiw/react-color-github";

function App() {
  const [environnement, setEnvironnement] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [config, setConfig] = useState<Config>({ test: "#83aee6" });
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  async function getConfig() {
    const message: ChromeMessage = {
      from: Sender.React,
      type: "GET_CONFIG",
    };
    const config = await chrome.runtime.sendMessage(message);
    setConfig(config);
  }

  useEffect(() => {
    getConfig();
  }, []);

  const saveConfig = async () => {
    console.log("Save config button clicked");
    const config = { [environnement]: color };
    const message: ChromeMessage = {
      from: Sender.React,
      type: "SAVE_CONFIG",
      data: config,
    };
    const saveConfigStatus = await chrome.runtime.sendMessage(message);
    console.log("saveConfigStatus", saveConfigStatus);
    await getConfig();
  };

  const deleteConfig = (key: string) => {
    return async () => {
      const message: ChromeMessage = {
        from: Sender.React,
        type: "DELETE_CONFIG",
        data: key,
      };
      await chrome.runtime.sendMessage(message);
      await getConfig();
    };
  };

  const editConfig = async (key: string, color: string) => {
    const config = { [key]: color };
    const message: ChromeMessage = {
      from: Sender.React,
      type: "SAVE_CONFIG",
      data: config,
    };
    const saveConfigStatus = await chrome.runtime.sendMessage(message);
    console.log("saveConfigStatus", saveConfigStatus);
    await getConfig();
  };

  return (
    <div className="flex items-center min-h-screen flex-col justify-around">
      <div>
        <h1 className="text-3xl font-bold">Configuration</h1>
        <div>
          <Input
            label="Environnement"
            require={true}
            onChangeValue={setEnvironnement}
          />
          <Input
            label="Color"
            require={true}
            onChangeValue={setColor}
            value={color}
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          />
          {displayColorPicker && (
            <Chrome
              placement={GithubPlacement.TopRight}
              color={color}
              onChange={(color) => setColor(color.hex)}
            />
          )}
        </div>
        <div className="py-2">
          <Button onClick={saveConfig}>Save</Button>
        </div>
      </div>
      <EnvironementList
        config={config}
        onDel={deleteConfig}
        onEdit={editConfig}
      />
    </div>
  );
}

export default App;
