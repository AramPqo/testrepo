import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
    selector: '[fileDragDrop]'
})

export class FileDragDropDirective {
    @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
    @HostBinding('style.background') private background = '#eee';
    @HostBinding('style.border') private borderStyle = '1px dashed';
    @HostBinding('style.border-color') private borderColor = '#696D7D';

    constructor() { }

    @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'lightgray';
        this.borderColor = '#60daaa';
        this.borderStyle = '3px solid';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
        this.borderColor = '#696D7D';
        this.borderStyle = '2px dashed';
    }

    @HostListener('drop', ['$event']) public onDrop(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
        this.borderColor = '#696D7D';
        this.borderStyle = '2px dashed';
        let files = evt.dataTransfer.files;
        let valid_files: Array<File> = files;
        this.filesChangeEmiter.emit(valid_files);
    }
}