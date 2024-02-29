import React, { useEffect, useState } from "react";
import "./App.css";
import { ChromeMessage, Config, Sender } from "./type";
import Input from "./components/Input";
import EnvironementList from "./components/EnvironementList";

function App() {
  const [responseFromContent, setResponseFromContent] = useState<string>("");

  const [environnement, setEnvironnement] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [config, setConfig] = useState<Config>({});

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

  return (
    <div className="App">
      <header className="App-header">
        <p>Response from content:</p>
        <p>{responseFromContent}</p>
        <div>
          <div>
            <Input
              label="Environnement"
              require={true}
              onChangeValue={setEnvironnement}
            />
          </div>
          <div>
            <Input label="Color" require={true} onChangeValue={setColor} />
          </div>
          <div>
            <button onClick={saveConfig}>Save</button>
          </div>
          <EnvironementList config={config} />
        </div>
      </header>
    </div>
  );
}

export default App;
