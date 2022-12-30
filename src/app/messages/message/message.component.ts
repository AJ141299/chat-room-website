import { Component, Input } from '@angular/core';
import { Message } from 'src/app/state/models/models';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: Message;
  dateTime: Date;
  displayTime: string;

  ngOnInit() {
    this.dateTime = new Date(this.message.createdAt);
    this.displayTime = `${this.dateTime.getHours()}:${this.dateTime.getMinutes()}`
  }
}
