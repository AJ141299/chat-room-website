import { Component, Input } from '@angular/core';
import { Message } from 'src/app/state/models/models';
import { get12HourTime } from 'src/utilities/helpers';

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
    this.dateTime = new Date(Number(this.message.createdAt));
    this.displayTime = get12HourTime(this.dateTime);
  }
}
