import { IChat } from "./model/chats/ichat";
import { OrderedChat } from "./model/chats/ordered-chat";


export interface IApp {
    GetChat(id: string): IChat | null;
    GetChatGUIDs(): string[]
}

class App implements IApp {
    private readonly chat1 = new OrderedChat();
    private readonly chat2 = new OrderedChat();

    public GetChat(id: string): IChat | null {
        if (this.chat1.id === id) return this.chat1;
        if (this.chat2.id === id) return this.chat2;
        return null;
    }

    public GetChatGUIDs(): string[] {
        return [this.chat1.id, this.chat2.id];
    }
}
const app = new App();

export { app };