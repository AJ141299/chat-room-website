import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Store } from "@ngrx/store";
import { first, tap } from "rxjs";
import { baseUrl } from "./app.component";
import { addAnnouncement, addTypingUser, clearMessages, receiveMessage, removeAnnouncement, removeTypingUser, setConnectedCount } from "./state/actions/ui.actions";
import { Message, AppState, TypingStatus, Announcement } from "./state/models/models";
import { selectUsername } from "./state/selectors/user.selectors";

@Injectable({providedIn: "root"})
export class SignalRService {
  constructor(private store: Store<AppState>) {}

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(baseUrl + "/chatHub")
    .withAutomaticReconnect()
    .build();

  public async start() {
    return this.connection.start().then(() => this.configure());
  }

  public close() {
    return this.connection.stop();
  }

  public reset() {
    this.close().then(() => {
      this.start();
    })
  }

  public getConnectionStatus() {
    return this.connection.state;
  }

  public configure() {
    this.configureMessageReceival()
    this.configureUserTyping();
    this.configureJoiningUsers();
    this.configureConnectedCount();
    this.configureAdminMode();
    this.configureClearingMessages();
  }

  public addUser(username: string) {
    this.connection.invoke("AddConnectedUser", username);
  }

  public logout() {
    this.connection.invoke("RemoveConnectedUser");
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

  public clearMessages() {
    this.connection.invoke("ClearMessages");
  }

  private configureAdminMode() {
    this.connection.on('EnableAdminMode', () => {
      console.log("Admin is here")
    });
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
    this.connection.on('AnnounceUser', (announcement: Announcement) => {
      this.store.dispatch(addAnnouncement({announcement: announcement}));
    });
  }

  private configureClearingMessages() {
    this.connection.on("ClearMessages", () => {
      this.store.dispatch(clearMessages());
    })
  }

  private configureConnectedCount() {
    this.connection.on('RefreshConnectedCount', (count: number) => {
      this.store.dispatch(setConnectedCount({count: count}));
    });
  }
}
