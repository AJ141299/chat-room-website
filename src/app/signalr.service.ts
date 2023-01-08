import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Store } from "@ngrx/store";
import { first, tap } from "rxjs";
import { addJoiningUser, addTypingUser, receiveMessage, removeJoiningUser, removeTypingUser, setConnectedCount } from "./state/actions/ui.actions";
import { Message, AppState, TypingStatus } from "./state/models/models";
import { selectUsername } from "./state/selectors/user.selectors";

@Injectable({providedIn: "root"})
export class SignalRService {
  constructor(private store: Store<AppState>) {}

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://chat-room-server20230107234625.azurewebsites.net:443/chatHub")
    .withAutomaticReconnect()
    .build();

  public async start() {
    return this.connection.start();
  }

  public configure() {
    this.configureMessageReceival()
    this.configureUserTyping();
    this.configureJoiningUsers();
    this.configureConnectedCount();
  }

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

  public announceJoin(username: string) {
    this.connection.invoke("AnnounceUser", username);
  }

  public incrementConnectedCount() {
    this.connection.invoke("IncrementConnectedCount");
  }

  private configureMessageReceival() {
    this.connection.on('ReceiveMessage', (message: Message) => {
      this.store.dispatch(receiveMessage(message));
    });
  }

  private configureUserTyping() {
    this.connection.on('UserIsTyping', (typingStatus: TypingStatus) => {
      if (typingStatus.isTyping) {
        this.store.dispatch(addTypingUser(typingStatus));
      } else {
        this.store.dispatch(removeTypingUser(typingStatus));
      }
    })
  }

  private configureJoiningUsers() {
    this.connection.on('AnnounceUser', (username: string) => {
      this.store.dispatch(addJoiningUser({username: username}));
      setTimeout(() => {
        this.store.dispatch(removeJoiningUser({username: username}));
      }, 2000)
    });
  }

  private configureConnectedCount() {
    this.connection.on('RefreshConnectedCount', (count: number) => {
      this.store.dispatch(setConnectedCount({count: count}));
    });
  }
}
