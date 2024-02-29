export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    type: string,
    data?: any
}

export type Config = { [key: string]: string }