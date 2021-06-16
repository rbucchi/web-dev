import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { IMessage } from '../../models/imessage';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input('chat-title') public title: string = '';
  public messages: IMessage<string>[] = [];
  public chatNumber: string | null = "0";

  constructor(
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    ) {
      // subscribe(
      //   next ?: ((value: ParamMap) => void) | undefined,
      //   error ?: ((error: any) => void) | undefined,
      //   complete ?: (() => void) | undefined
      // )
      // : Subscription

    this.activatedRoute.paramMap.subscribe(
      (value: ParamMap) => this.chatNumber = value.get('chatNumber'),
      (error: any) => console.error(error),
    )
    this.activatedRoute.paramMap.subscribe(
      (value: ParamMap) => this.loadMessages(),
      (error: any) => console.error(error),
    )
    this.loadMessages();
  }

  ngOnInit(): void {
  }

  public send($event: string): void {
    console.log($event)
    this.loadMessages();
  }

  public loadMessages(): void {
    this.messagesService.GetMessages(Number(this.chatNumber)).then(result => {
      this.messages = result;
    });
  }

  public delete(message: IMessage<string>): void {
    this.messagesService.DeleteMessage(message.id).then(x => {
      this.loadMessages();
    });
  }

  public openDialog(message: IMessage<string>): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '250px',
      data: message
    });
  }
}
