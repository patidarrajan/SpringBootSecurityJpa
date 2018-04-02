import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-count',
    templateUrl: './user-count.component.html',
    styleUrls: ['./user-count.component.css'],
})
export class UserCountComponent {
    selectedUserCountRadioOption = 'All';

    @Output()
    countRadioButtonChanged: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    all: number;
    @Input()
    admin: number;
    @Input()
    user: number;

    onChangeListenerRadioOption() {
        this.countRadioButtonChanged.emit(this.selectedUserCountRadioOption);
        console.log(this.selectedUserCountRadioOption);
    }
}
