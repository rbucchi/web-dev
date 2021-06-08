import { IChat } from "./model/chats/ichat";
import { OrderedChat } from "./model/chats/ordered-chat";


export interface IApp {
    GetChat(id: string): IChat | null;
    GetChatGUIDs(): string[]
}

class App implements IApp {
    private readonly chat = new OrderedChat();

    public GetChat(id: string): IChat | null {
        if (this.chat.id === id) return this.chat;
        return null;
    }

    public GetChatGUIDs(): string[] {
        return [this.chat.id];
    }
}
const app = new App();

export { app };