import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  @Output('on-send') public OnSent: EventEmitter<string> = new EventEmitter<string>();
  public inputText: string = '';
  private chatNumber: string | null = "0";
  constructor(
    private messagesServices: MessagesService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.paramMap.subscribe(
      (value: ParamMap) => this.chatNumber = value.get('chatNumber'),
      (error: any) => console.error(error),
    )
  }

  ngOnInit(): void { }

  public send(value: string): void {
    this.messagesServices.CreateMessage(value, Number(this.chatNumber)).then(x => {
      this.OnSent.emit(value);
    });
  }
}
