import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UserComponent } from './user/user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { PageNotFoundComponent } from './other/pageNotFound.component';
import { HomeComponent } from './home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';
import { UserCountComponent } from './user-count/user-count.component';


const appRoutes: Routes = [
  { path: 'user', component: ListUserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user/:id', component: AddUserComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, UserComponent, ListUserComponent, UserCountComponent,
    PageNotFoundComponent, HomeComponent, AddUserComponent],
  bootstrap: [AppComponent],
  providers: [UserService],
})
export class AppModule { }
