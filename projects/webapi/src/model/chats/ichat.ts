import { IMessage } from "../messages/imessage";

export interface IChat {
    id: string;
    messages: IMessage<any>[];

    CreatedOn(): Date;
    Push(msg: any): IMessage<any>;
    Get(id: number): IMessage<any> | undefined;
    GetTop(top: number): IMessage<any>[];
    Edit(id: number, msg: string): IMessage<any>;
    Delete(id: number): void;
}