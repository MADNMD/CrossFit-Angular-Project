import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message { text: string, type: MessageType }

export enum MessageType {
  Success,
  Error,
}

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private messageSubject$ = new Subject<Message>;

  onNewMessage$ = this.messageSubject$.asObservable(); // ще уведомяваме потребителя когато дойде ново съобщение;

  constructor() { }


  notifyForMessage(message: Message) {
    this.messageSubject$.next(message);
  }
}
