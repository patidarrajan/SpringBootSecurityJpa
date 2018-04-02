import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/user';
import { UserService } from '../user.service';

import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/delay';
@Component({
    selector: 'app-user-list',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
    searchText: String = '';
    selectedUserTypeRadioOption: String = 'All';
    statusMessage: String = 'Loading Data... Please Wait.';

    userList: IUser[];
    constructor(private _userService: UserService) {
    }

    ngOnInit() {
        this._userService.getUsers()
            .retryWhen((err) => {
                return err.scan((retryCount) => {
                    retryCount += 1;
                    if (retryCount <= 5) {
                        this.statusMessage = 'Failed to get user list from server. Retrying to get user list from server: # ' + retryCount;
                        return retryCount;
                    } else {
                        throw (err);
                    }
                }, 0).delay(1000);
            })
            .subscribe((userData) => this.userList = userData, (error) => this.statusMessage = 'Problem in loading Data.');
    }

    getTotalUserCount(): number {
        return this.userList.length;
    }

    getAdminUserCount(): number {
        return this.userList.filter(user => user.role === 'ROLE_ADMIN').length;
    }

    getNormalUserCount(): number {
        return this.userList.filter(user => user.role === 'ROLE_USER').length;
    }

    changeListAsPerSelectedUserTypeRadioOption(selectedUserTyepRadioOption1: string) {
        this.selectedUserTypeRadioOption = selectedUserTyepRadioOption1;
    }
}
