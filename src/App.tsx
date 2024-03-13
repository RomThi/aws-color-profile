import { useEffect, useState } from "react";
import { ChromeMessage, Config, Sender } from "./type";
import Input from "./components/Input";
import EnvironementList from "./components/EnvironementList";
import Button from "./components/Button";
import ColorPicker from "./components/ColorPicker";

function App() {
  const [environnement, setEnvironnement] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [config, setConfig] = useState<Config>({});
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
    setDisplayColorPicker(false);
    const config = { [environnement]: color };
    const message: ChromeMessage = {
      from: Sender.React,
      type: "SAVE_CONFIG",
      data: config,
    };
    const saveConfigStatus = await chrome.runtime.sendMessage(message);
    setEnvironnement("");
    setColor("#ffffff");
    console.log("saveConfigStatus", saveConfigStatus);
    await getConfig();
  };

  const deleteConfig = async (key: string) => {
    const message: ChromeMessage = {
      from: Sender.React,
      type: "DELETE_CONFIG",
      data: key,
    };
    await chrome.runtime.sendMessage(message);
    await getConfig();
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
            value={environnement}
          />
          <Input
            label="Color"
            require={true}
            onChangeValue={setColor}
            value={color}
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          />
          {displayColorPicker && (
            <ColorPicker color={color} onChange={setColor} />
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
