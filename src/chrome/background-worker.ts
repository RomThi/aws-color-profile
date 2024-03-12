import { ChromeMessage, Config } from "../type";

async function getConfig(): Promise<Config> {
    const config = await chrome.storage.local.get(['aws-color-config']);
    return config['aws-color-config'] || {};
}

async function setConfig(config: Config): Promise<Boolean> {
    try {
        const currentConfig = await getConfig();
        await chrome.storage.local.set({ 'aws-color-config': { ...currentConfig, ...config } });
        return true;
    } catch (error) {
        return false;
    }
}

async function deleteConfig(key: string): Promise<void> {
    try {
        const currentConfig = await getConfig();
        delete currentConfig[key];
        await chrome.storage.local.set({ 'aws-color-config': currentConfig });
    } catch (error) {
        console.error(error)
    }
}

function main() {
    console.log('[background-worker.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, sendResponse) => {
        console.log('[background-worker.ts] onMessage', message, sender)
        if (message.type === 'SAVE_CONFIG') {
            console.log('Config saved', message.data)
            setConfig(message.data).then((status) => {
                sendResponse({ status: status ? true : false });
            });
        }

        if (message.type === 'GET_CONFIG') {
            console.log('Get config')
            getConfig().then((config) => {
                console.log('configFetch', config);
                sendResponse(config);
            });
        }

        if(message.type === 'DELETE_CONFIG') {
            console.log('Delete config', message.data)
            deleteConfig(message.data).then(() => {
                sendResponse({ status: true });
            });
        }
        return true;
    });
}

main()
