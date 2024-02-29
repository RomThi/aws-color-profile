import { ChromeMessage, Sender } from "../type";

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

    if(message.type === 'SAVE_CONFIG') {
        response('Config saved');
    }

    if (isValidated) {
        response(document.title);
    }

}

const main = () => {
    console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    // chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

main();