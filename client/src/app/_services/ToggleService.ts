import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class ToggleService {

    private toggleSource = new BehaviorSubject<boolean>(false);
    currentToggle = this.toggleSource.asObservable();

    constructor() {}

    changeToggle(toggle_: boolean) {
        this.toggleSource.next(toggle_);
    }

}
