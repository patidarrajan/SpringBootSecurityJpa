import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/user';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  user: IUser = new IUser();
  statusMessage: string;
  userAdded: IUser;
  enabled: boolean;
  isUpdate: boolean;
  constructor(public _userService: UserService, private _activatedRoute: ActivatedRoute, private _router: Router) {

  }

  ngOnInit() {
    console.log(this._activatedRoute.snapshot.params['id']);
    if (this._activatedRoute.snapshot.params['id'] != null) {
      const userCode: string = this._activatedRoute.snapshot.params['id'];
      this._userService.getUserById(userCode).then((userData) => {
        this.user = userData;
        this.enabled = userData.enabled !== 1 ? false : true;
        this.isUpdate = true;
        console.log(this.user);
      }
      ).catch(error => {
        this.statusMessage = 'error in getting user information';
        console.log(error);
      });

    } else {
      console.log('Add User Request');
    }
  }

  onAddUser() {
    this.statusMessage = '';
    const enable: number = this.enabled ? 1 : 0;
    this.user = {
      id: this.user.id, userName: this.user.userName, password: this.user.password,
      fullName: this.user.fullName, country: this.user.country
      , role: this.user.role, enabled: enable
    };

    this._userService.addUser(this.user).subscribe((user1) => {
      this.userAdded = user1;
      if (user1 != null) {
        this.statusMessage = 'User ' + (this.isUpdate ? 'Updated' : 'Added') + ' Successfully.';
      }
    }
      , (error) => this.statusMessage = 'Error from server in adding user.');
  }
}
