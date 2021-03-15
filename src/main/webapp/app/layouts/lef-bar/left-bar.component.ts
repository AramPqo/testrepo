import { Component, Input } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { WindowResizeService } from 'app/shared/services/window-resize.service';

@Component({
    selector: 'jhi-left-bar',
    templateUrl: './left-bar.component.html',
    styleUrls: ['left-bar.component.scss'],
})
export class LeftBarComponent {

    @Input() isOpen = true;
    menuItems = ['calendar', 'patient'];

    constructor(private accountService: AccountService, public resizeService: WindowResizeService) { }

    isAuthenticated(): boolean {
        return this.accountService.isAuthenticated();
    }

    collapseNavbar() {

    }

    toggleLeftbar() {
        this.isOpen = !this.isOpen;
    }
}


