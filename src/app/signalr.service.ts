import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Store } from "@ngrx/store";
import { first, tap } from "rxjs";
import { addTypingUser, receiveMessage, removeTypingUser } from "./state/actions/ui.actions";
import { Message, AppState, TypingStatus } from "./state/models/models";
import { selectUsername } from "./state/selectors/user.selectors";

@Injectable({providedIn: "root"})
export class SignalRService {
  constructor(private store: Store<AppState>) {}

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://chat-room-server20230107234625.azurewebsites.net:443/chatHub")
    .withAutomaticReconnect()
    .build();

  public sendMessage(message: Message) {
    this.connection.invoke("SendMessage", message);
  }

  public sendTypingStatus(isTyping: boolean) {
    this.store.select(selectUsername).pipe(
      first(),
      tap((username: string) => {
        const typingStatus: TypingStatus = {
          username: username,
          isTyping: isTyping
        }
        this.connection.invoke("UserIsTyping", typingStatus);
      })
    ).subscribe();
  }

  public async start() {
    return this.connection.start();
  }

  public configure() {
    this.connection.on('ReceiveMessage', (message: Message) => {
      this.store.dispatch(receiveMessage(message));
    });

    this.connection.on('UserIsTyping', (typingStatus: TypingStatus) => {
      if (typingStatus.isTyping) {
        console.log("Adding typing")
        this.store.dispatch(addTypingUser(typingStatus));
      } else {
        console.log("Removing typing")
        this.store.dispatch(removeTypingUser(typingStatus));
      }
    })
  }
}
