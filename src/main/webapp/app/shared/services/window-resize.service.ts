import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class WindowResizeService {

    public isDesktop: boolean;
    public resizeStream$: Observable<any>;

    constructor() {
        this.isDesktop = window.innerWidth > 630 ? true : false;
        this.resizeStream$ = fromEvent(window, 'resize')
            .pipe(debounceTime(600), distinctUntilChanged());
        this.resizeStream$
            .subscribe((v: any) => {
                this.isDesktop = v.target.innerWidth > 630 ? true : false;
            });
    }
}
