import {
    Component,
    ViewEncapsulation,
    Output,
    EventEmitter,
    OnInit,
    Input,
    OnDestroy,
    ChangeDetectionStrategy,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    template: `
        <div class="w-100 text-center filter-content">
            <input 
                jhiTranslate="medappointApp.patient.detail.title"
                id="searchInp"
                class="form-control filter-control" 
                [(ngModel)]="defaultValue" 
                [placeholder]="placeholder" 
                [disabled]="disabled"
                autocomplete="off"
                type="text" 
                (keyup)="searchTerm$.next(defaultValue)">
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() data: any;
    @Input() searchBy!: string | number;
    @Input() multiple = true;
    @Input() placeholder = '';
    @Input() defaultValue;
    @Input() disabled;

    @Output() emitMultipleFilteredValue = new EventEmitter();
    @Output() emitBasicFilteredValue = new EventEmitter();
    @Output() emitFocusEvent = new EventEmitter();

    termSub!: Subscription;
    searchTerm$ = new Subject<any>();
    constructor(private renderer: Renderer2) { }

    ngOnInit() {
        this.termSub = this.searchTerm$.pipe(distinctUntilChanged(), debounceTime(600))
            .subscribe((event: any) => {
                const result = event;
                if (this.searchBy) {
                    let filteredData;
                    if (result.trim() === '') {
                        filteredData = [];
                    } else {
                        filteredData = this.data.filter((value: any) => {
                            if (!!value[this.searchBy]) {
                                return this.multiple ? value[this.searchBy].toLowerCase().indexOf(result.toLowerCase()) !== -1 ? value : null : value[this.searchBy].toLowerCase() === result.toLowerCase();
                            }
                        });
                    }
                    this.multiple ? this.emitMultipleFilteredValue.emit(filteredData) : this.emitBasicFilteredValue.emit(filteredData);
                }
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            var elem = this.renderer.selectRootElement("#searchInp");
            this.renderer.listen(elem, "focus", () => {
                this.emitFocusEvent.emit(true);
            });
        }, 100);
    }

    ngOnDestroy() {
        if (this.termSub) {
            this.termSub.unsubscribe();
        }
    }
}
