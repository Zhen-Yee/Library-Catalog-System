import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class PasswordService {

    private passwordSource = new BehaviorSubject<string>("default");
    currentPassword = this.passwordSource.asObservable();

    constructor() {}

    changePassword(pass: string) {
        this.passwordSource.next(pass);
        console.log(pass);
    }

}
