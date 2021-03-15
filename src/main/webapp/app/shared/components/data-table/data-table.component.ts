import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SortableHeaderDirective } from 'app/shared/directives/sortable.directive';
import { WindowResizeService } from '../../services/window-resize.service';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as moment from 'moment';
import { EntityFromDialogComponent } from '../entity-form/entity-from-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import * as lodash from 'lodash';

@Component({
  selector: 'jhi-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('tbody') tbody!: ElementRef;
  @ViewChildren(SortableHeaderDirective) sortingHeaders!: QueryList<SortableHeaderDirective>;
  @ViewChild('modalContainer') modalContainer: ElementRef;
  @ViewChild(PerfectScrollbarDirective, { static: false })
  directiveRef?: PerfectScrollbarDirective;

  private mainData: any[];
  displayData: any[];
  links: any;
  windowResizeStream!: Subscription;
  totalItems = 0;
  selectedMode: string | number = 'fit';
  pageSizeToggle = false;
  tableModeItems = ['fit', 5, 50];
  itemsPerPage = 0;
  paginationPage = 1;
  predicate: string;
  ascending: boolean;
  isSelectAll = false;
  toggleSearchBox: boolean;
  isOpenModal: boolean;

  dateRange = {
    startDate: moment(new Date(Date.now())).format('LL'),
    endDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)).format('LL')
  };

  selectedRows: any = {};

  resizableColData = { width: 'auto', index: null };

  @Input() title!: any;
  @Input() searchBy!: any;
  @Input() tableHeaders!: any;
  @Input() data!: any[];
  @Input() dataCount = 3;
  @Input() selectActions;
  @Input() searchByDate;
  @Input() isModal;
  @Input() isCreated = true;
  @Input() isDeleted = true;
  @Input() isOnlyView = false;
  @Input() formFields;


  @Output() selectedEmit = new EventEmitter();
  @Output() selectedActionsEmit = new EventEmitter();
  @Output() actionEmit = new EventEmitter();

  @Output() updateEmit = new EventEmitter();
  @Output() deleteEmit = new EventEmitter();

  columnPercentages: string[] = [];

  constructor(
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    private router: Router,
    private translate: TranslateService,
    public resizeService: WindowResizeService
  ) {
    this.data = [];
    this.displayData = [];
    this.mainData = [];
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  sortData({ column, direction }: any): any {
    this.sortingHeaders.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '' || column === '') {
      return this.data;
    } else {
      const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      this.data.sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
      this.getDisplayData();
    }
  }

  onScroll(scrollTo?: string) {
    if (scrollTo) {
      debugger;
    }
    if (this.displayData.length === this.mainData.length) {
      return;
    } else {
      this.displayData = [...this.displayData, ...this.mainData.slice(this.displayData.length, this.displayData.length + this.dataCount)];
    }
  }

  onScrollTest() {
    this.directiveRef.scrollToBottom(100, 100)
  }

  getAction(action) {
    console.log(action);
  }

  ngOnInit(): void {
    this.tableHeaders.forEach((headers: any) => {
      this.columnPercentages.push(headers.width)
    });
    if (this.resizeService.isDesktop) {
      this.toggleSearchBox = true;
      this.getWindowResize();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.mainData = this.data;
      this.totalItems = this.data.length;
      if (!changes.data.firstChange) {
        if (this.resizeService.isDesktop) {
          this.displayData = this.data;
          if (this.selectedMode === 'fit') {
            this.changeMode('fit');
          }
        } else {
          this.displayData = this.data.slice(0, this.dataCount);
        }
      }
    }
  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  getDateRange() {
    this.displayData = this.mainData.filter(v =>
      moment(this.dateRange.startDate).diff(v.date, 'days') <= 0 &&
      moment(this.dateRange.endDate).diff(v.date, 'days') >= 0);
  }

  navigateToCreate() {
    if (this.isModal) {
      this.isOpenModal = true;
      this.openEntityFromDialog();
    } else {
      this.router.navigate([this.router.url, 'new']);
    }
  }

  navigateToCollection(row: any, isNavigate: string, url: number, event: Event) {
    if (!isNavigate) return;
    this.router.navigate([`/${isNavigate}`, row[url], 'view']);
    this.getStopPropagation(event);
  }

  navigateAction(id: any, action: any) {
    if (this.isOnlyView) { return }
    if (this.isModal) {
      this.openEntityFromDialog(id);
    } else {
      this.router.navigate([this.router.url, id, action]);
    }
  }

  openEntityFromDialog(id?: string) {
    const modalRef = this.modalService.open(EntityFromDialogComponent, { backdrop: false, windowClass: 'entity-form-dialog', container: this.modalContainer.nativeElement });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = `global.menu.entities.${this.title}`;
    modalRef.componentInstance.fields = this.getFormFields(id);
    modalRef.componentInstance.updateEmit.subscribe(data => data === null ? null : this.updateEmit.emit(data));
    modalRef.result.then(() => { }, () => { this.isOpenModal = false })
  }

  getFormFields(id?: number | string) {
    this.isOpenModal = true;
    const result = lodash.cloneDeep(this.formFields);
    if (id) {
      const data = this.displayData.find(v => v.id === id);
      for (let i = 0; i < this.formFields.length; i++) {
        result[i].defaultValue = data[this.formFields[i].templateOptions.keyCode];
      }
    }
    return result;
  }

  getTranslatedText(preffix: string) {
    return this.translate.instant(preffix);
  }

  getToggleSearchBox() {
    this.toggleSearchBox = !this.toggleSearchBox;
  }

  getFilteredValue(data: any[]) {
    if (data.length) {
      this.data = data;
    } else {
      this.data = [...this.mainData];
    }
    this.changeMode(this.selectedMode);
  }

  getColumnData(rowSizeData: any, index: any) {
    if (this.columnPercentages.length !== 0) {
      this.resizableColData = rowSizeData;
      this.columnPercentages[index] = rowSizeData.width;
    }
  }

  selectAllData() {
    if (!this.isSelectAll) {
      this.displayData.forEach((row) => this.selectedRows[row.id] = true);
      // this.selectActions.forEach((action) => action.disabled = false);
      this.selectedActionsEmit.emit(this.selectedRows);
    } else {
      this.selectedRows = {};
      this.selectActions.forEach((action) => action.disabled = true);
    }
  }

  getSelectedRow(row) {
    // row[this.tableHeaders.find(v => v.isIcon).columnsValue].disabled = !this.selectedRows[row.id];
    this.selectedActionsEmit.emit(this.selectedRows);
  }

  emitAction(row) {
    // if (row[this.tableHeaders.find(v => v.isIcon).columnsValue].disabled) { return; }
    this.actionEmit.emit(row);
    console.log(row);
  }

  deleteRows() {
    this.selectedEmit.emit(this.selectedRows);
    this.selectedRows = {};
    this.isSelectAll = false;
  }

  emitSelectedActions(method) {
    this.selectedEmit.emit({ method: method, rows: this.selectedRows });
    this.selectedRows = {};
  }

  getWindowResize() {
    if (this.selectedMode === 'fit') {
      this.windowResizeStream = this.resizeService.resizeStream$.pipe(
        debounceTime(600),
        map((e: any) => e.target['innerHeight']),
        distinctUntilChanged()
      ).subscribe(e => {
        if (this.selectedMode === 'fit') {
          this.itemsPerPage = 0;
          this.changeMode('fit');
        }
      });
    }
  }

  getPageChange() {
    this.getDisplayData();
  }

  changeMode(mode: string | number) {
    this.selectedMode = mode;
    this.paginationPage = 1;
    if (mode !== 'fit') {
      this.itemsPerPage = mode as number;
    } else {
      const tbodyHeight = document.getElementsByClassName('data-table-container')[0]['offsetHeight'];
      this.itemsPerPage = Math.round((tbodyHeight - 260) / 53);
    }
    this.totalItems = this.data.length;
    this.getDisplayData();
  }

  getStopPropagation(event) {
    event.stopPropagation();
  }

  getDisplayData() {
    this.displayData = this.data.slice((this.paginationPage - 1) * this.itemsPerPage, (this.paginationPage - 1) * this.itemsPerPage + this.itemsPerPage);
  }

  deleteData(data: any): void {
    this.deleteEmit.emit(data);
  }

  ngOnDestroy(): void {
    if (this.windowResizeStream) {
      this.windowResizeStream.unsubscribe();
    }
  }

}
