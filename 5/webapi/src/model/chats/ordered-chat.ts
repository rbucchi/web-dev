import { GUID } from "../GUID";
import { IMessage } from "../messages/imessage";
import { IChat } from "./ichat";


/**
 * Implementazione di Chat ordinata.
 *
 * @export
 * @class OrderedChat
 * @implements {IChat}
 */
export class OrderedChat implements IChat {
    id: string;
    messages: IMessage<any>[] = [];
    private _createdOn: Date;

    constructor() {
        this._createdOn = new Date();
        this.id = GUID.GetGUID();
        this.messages = [];
    }

    public CreatedOn(): Date {
        return this._createdOn;
    }

    public Push(msg: string): IMessage<any> {
        const id = this.messages.length;
        const res = { id: id, timeStamp: new Date(), content: msg };
        this.messages.push(res);
        return res;
    }

    public Get(id: number): IMessage<any> | undefined {
        return this.messages.find(x => x.id === id);
    }

    public GetTop(top: number): IMessage<any>[] {
        return this.messages.slice(-25);
    }

    public Edit(id: number, msg: string): IMessage<any> {
        const res = this.Get(id);
        res.content = msg;
        res.timeStamp = new Date();
        return res;
    }

    public Delete(id: number): void {
        this.messages = this.messages.filter(message => message.id !== id);
    }

}