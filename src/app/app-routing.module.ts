import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateMessagesPage } from './guards/canActivateMessagesPage';
import { CanActivateUserPage } from './guards/canActivateUserPage';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsernameExists } from "src/utilities/helpers";
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  { path: '', component: UserDetailsComponent, canActivate: [CanActivateUserPage] },
  { path: 'available-rooms', component: RoomsComponent, canActivate: [CanActivateMessagesPage] },
  { path: 'messages', component: MessagesComponent, canActivate: [CanActivateMessagesPage] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateMessagesPage, CanActivateUserPage, UsernameExists]
})
export class AppRoutingModule { }
