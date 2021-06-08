import { IMessage } from "./imessage";

export class ImgMessage implements IMessage<string> {
    public timeStamp: Date;
    public id: number;
    public content: string;
}