import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '../models/imessage';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) { }

  private readonly API_ENDPOINT = 'http://localhost:3000/api/messages';

  // http://localhost:3000/api/messages?chat=1
  public GetMessages(chatNumber: number = 0): Promise<IMessage<string>[]> {
    return this.httpClient
      .get<IMessage<string>[]>(this.API_ENDPOINT, {
        params: {
          chat: `${chatNumber}`,
        },
      })
      .toPromise<IMessage<string>[]>();
  }

  public DeleteMessage(id: number, chatNumber: number = 0): Promise<boolean> {
    return this.httpClient.delete(this.API_ENDPOINT + '/' + id, {
      params: {
        chat: `${chatNumber}`,
      },
    })
      .toPromise()
      .then(x => true)
      .catch(x => false);
  }

  public CreateMessage(content: string, chatNumber: number = 0): Promise<IMessage<string>> {
    return this.httpClient
      .post<IMessage<string>>(this.API_ENDPOINT, { text: content }, {
        params: {
          chat: `${chatNumber}`,
        },
      })
      .toPromise();
  }
}
