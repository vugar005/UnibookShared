import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';


const appRoutes: Routes = [
  { path: 'profile-edit', component: ProfileEditComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}



