import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Message } from "./state/models/models";

@Injectable({providedIn: "root"})
export class SignalRService {
  constructor() {}

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7255/chatHub")
    .withAutomaticReconnect()
    .build();

  public sendMessage(message: Message) {
    this.connection.invoke("sendMessage", message);
  }
}
