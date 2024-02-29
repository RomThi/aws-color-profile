import { ChromeMessage, Config, Sender } from "../type";

type MessageResponse = (response?: any) => void

const validateSender = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender
) => {
    return sender.id === chrome.runtime.id && message.from === Sender.React;
}

const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: MessageResponse
) => {

    const isValidated = validateSender(message, sender);

    if (message.type === 'SAVE_CONFIG') {
        response('Config saved');
    }

    if (isValidated) {
        response(document.title);
    }

}

const main = () => {
    console.log('[content.ts] Main')

    const message: ChromeMessage = {
        from: Sender.React,
        type: "GET_CONFIG",
    };
    chrome.runtime.sendMessage(message).then((response: Config) => {
        console.log('response', response)
        window.addEventListener('resize', () => {
            const globalHeader: HTMLElement | null = document.querySelector('[aria-label="Global"]');

            if (globalHeader) {
                const userElement = globalHeader.querySelector('[aria-controls="menu--account"]');
                const user = userElement ? userElement.getAttribute('aria-label') : null;
                console.log('user', user);
                if (user) {
                    const configKeys = Object.keys(response);
                    const match = configKeys.filter(c => user.includes(c));

                    if (match.length > 0) {
                        globalHeader.style.backgroundColor = response[match[0]];
                    }
                }
            }
        })
    });
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    // chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

main();
