import { Component, Input } from '@angular/core';

@Component({
  selector: 'available-user',
  templateUrl: './available-user.component.html',
  styleUrls: ['./available-user.component.scss']
})
export class AvailableUserComponent {
  @Input() username: string = "";
}
