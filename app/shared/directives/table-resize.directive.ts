import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
    selector: '[tableResize]'
})
export class TableResizeDirective implements OnInit {

    @Input() index!: number;
    @Input() columnPercentages!: string[];
    @Input() tr!: HTMLTableRowElement;
    @Input() th!: any;
    @Output() columnDataEmit = new EventEmitter();

    lastThElement!: HTMLElement;
    startX!: number;
    startWidth!: string | number;
    currentWidth!: string;
    mousedown$!: Observable<Event>;
    mouseup$!: Observable<Event>;
    mouseleave$!: Observable<Event>;
    mousemove$!: Observable<Event>;
    mousehold$!: Observable<Event>;
    mousemoveSub!: Subscription;
    resetResize!: any;

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.mousedown$ = fromEvent(this.element.nativeElement, 'mousedown');
        this.mousedown$.subscribe((event: any) => {
            this.startWidth = parseInt(this.th.style.width);
            this.startX = event.pageX;
            this.renderer.addClass(this.tr, 'resize');
        });

        this.mouseup$ = fromEvent(this.tr, 'mouseup');
        this.mouseleave$ = fromEvent(this.tr, 'mouseleave');

        this.resetResize = merge(this.mouseleave$, this.mouseup$).pipe(
            tap(() => {
                this.renderer.removeClass(this.tr, 'resize');
                this.unsub();
                this.register();
            })
        );

        this.mousemove$ = fromEvent(this.tr, 'mousemove');
        this.register();
    }

    register() {
        this.mousehold$ = this.mousedown$.pipe(
            switchMap(() => this.mousemove$),
            takeUntil(this.resetResize)
        );
        this.mousemoveSub = this.mousehold$.subscribe((event:any) => {
            this.getResize(event);
        });
    }

    getResize(event: MouseEvent) {
        let handleWidth;
        if (!!window['chrome'] && (!!window['chrome'].webstore || !!window['chrome'].runtime)) {
            handleWidth = +this.startWidth + (event.pageX - this.startX) / 10 + '%';
        }
        if (typeof window['InstallTrigger'] !== 'undefined') {
            handleWidth = +this.startWidth + (event.pageX - this.startX) / 7 + '%';
        }
        let children: Element[] | number[] = Array.from(this.tr.children).filter((v, i) => i !== 0);
        children = children.map(v => v.getBoundingClientRect().width);
        for (const width of children) {
            if (width < 50) {
                this.unsub();
                this.register();
                handleWidth = this.startWidth + '%';
            }
        }
        this.getResizeData(handleWidth, this.index);
    }

    getResizeData(width: string | undefined, index: number) {
        this.columnDataEmit.emit({ width, index });
    }

    unsub() {
        if (this.mousemoveSub) {
            this.mousemoveSub.unsubscribe();
            this.tr.style.cursor = 'default';
        }
    }

}
