import { IMessage } from "./imessage";

export class TxtMessage implements IMessage<string> {
    public timeStamp: Date;
    public id: number;
    public content: string;
}