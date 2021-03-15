"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MedappointSharedModule = void 0;
var user_service_1 = require("./../core/user/user.service");
var core_1 = require("@angular/core");
var medappoint_date_pipe_1 = require("./pipes/medappoint-date.pipe");
var medappoint_collection_pipe_1 = require("./pipes/medappoint.collection.pipe");
var medappoint_appointment_dropdown_component_1 = require("./medappoint-form-field/medappoint-appointment-dropdown/medappoint-appointment-dropdown.component");
var service_Item_control_component_1 = require("./medappoint-form-field/service-item-control/service-Item-control.component");
var invoice_service_1 = require("app/entities/invoice/invoice.service");
var data_table_component_1 = require("./data-table/data-table.component");
var shared_libs_module_1 = require("./shared-libs.module");
var medappoint_dropdown_component_1 = require("./medappoint-form-field/medappoint-dropdown/medappoint-dropdown.component");
var medappoint_colorpicker_component_1 = require("./medappoint-form-field/medappoint-colorpicker/medappoint-colorpicker.component");
var medappoint_datepicker_component_1 = require("./medappoint-form-field/medappoint-datepicker/medappoint-datepicker.component");
var medappoint_timepicker_component_1 = require("./medappoint-form-field/medappoint-timepicker/medappoint-timepicker.component");
var find_language_from_key_pipe_1 = require("./language/find-language-from-key.pipe");
var file_uppload_component_1 = require("./medappoint-form-field/file-uppload/file-uppload.component");
var alert_component_1 = require("./alert/alert.component");
var alert_error_component_1 = require("./alert/alert-error.component");
var login_component_1 = require("./login/login.component");
var has_any_authority_directive_1 = require("./auth/has-any-authority.directive");
var filter_component_1 = require("./filter/filter.component");
var resize_directive_1 = require("app/shared/directives/table-resize.directive");
var sortable_directive_1 = require("app/shared/directives/sortable.directive");
var file_drag_drop_directive_1 = require("./directives/file-drag-drop.directive");
var patient_control_dialog_component_1 = require("app/entities/patient/patient-control-dialog/patient-control-dialog.component");
var invoice_control_dialog_component_1 = require("app/entities/patient/invoice-control-dialog/invoice-control-dialog.component");
var core_2 = require("@ngx-formly/core");
var remark_service_1 = require("app/entities/remark/remark.service");
var appointment_service_1 = require("app/entities/appointment/appointment.service");
var treatment_service_1 = require("app/entities/treatment/treatment.service");
var MedappointSharedModule = /** @class */ (function () {
    function MedappointSharedModule() {
    }
    MedappointSharedModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_libs_module_1.MedappointSharedLibsModule,
                core_2.FormlyModule.forChild({
                    types: [
                        { name: 'file', component: file_uppload_component_1.FileUpploadComponent },
                        { name: 'medappointDate', component: medappoint_datepicker_component_1.MedappointDatepickerComponent },
                        { name: 'medappointTime', component: medappoint_timepicker_component_1.MedappointTimepickerComponent },
                        { name: 'medappointDropdown', component: medappoint_dropdown_component_1.MedappointDropdownComponent },
                        { name: 'medappointColor', component: medappoint_colorpicker_component_1.MedappointColorPickerComponent },
                        { name: 'medappointAppointmentDropdown', component: medappoint_appointment_dropdown_component_1.MedappointAppointmentDropdownComponent },
                        { name: 'serviceItemControl', component: service_Item_control_component_1.ServiceItemControlComponent }
                    ]
                })
            ],
            declarations: [
                find_language_from_key_pipe_1.FindLanguageFromKeyPipe,
                patient_control_dialog_component_1.PatientControlDialogComponent,
                filter_component_1.FilterComponent,
                medappoint_date_pipe_1.MedappointDatePipe,
                medappoint_collection_pipe_1.MedAppintCollectionValuePipe,
                alert_component_1.AlertComponent,
                file_uppload_component_1.FileUpploadComponent,
                medappoint_datepicker_component_1.MedappointDatepickerComponent,
                medappoint_appointment_dropdown_component_1.MedappointAppointmentDropdownComponent,
                service_Item_control_component_1.ServiceItemControlComponent,
                medappoint_timepicker_component_1.MedappointTimepickerComponent,
                medappoint_dropdown_component_1.MedappointDropdownComponent,
                invoice_control_dialog_component_1.InvoiceControlDialogComponent,
                medappoint_colorpicker_component_1.MedappointColorPickerComponent,
                alert_error_component_1.AlertErrorComponent,
                data_table_component_1.DataTableComponent,
                file_drag_drop_directive_1.FileDragDropDirective,
                resize_directive_1.TableResizeDirective,
                sortable_directive_1.SortableHeaderDirective,
                login_component_1.LoginModalComponent,
                has_any_authority_directive_1.HasAnyAuthorityDirective
            ],
            entryComponents: [login_component_1.LoginModalComponent, patient_control_dialog_component_1.PatientControlDialogComponent, invoice_control_dialog_component_1.InvoiceControlDialogComponent],
            exports: [
                shared_libs_module_1.MedappointSharedLibsModule,
                find_language_from_key_pipe_1.FindLanguageFromKeyPipe,
                filter_component_1.FilterComponent,
                medappoint_date_pipe_1.MedappointDatePipe,
                medappoint_collection_pipe_1.MedAppintCollectionValuePipe,
                file_drag_drop_directive_1.FileDragDropDirective,
                patient_control_dialog_component_1.PatientControlDialogComponent,
                invoice_control_dialog_component_1.InvoiceControlDialogComponent,
                medappoint_appointment_dropdown_component_1.MedappointAppointmentDropdownComponent,
                service_Item_control_component_1.ServiceItemControlComponent,
                alert_component_1.AlertComponent,
                alert_error_component_1.AlertErrorComponent,
                data_table_component_1.DataTableComponent,
                resize_directive_1.TableResizeDirective,
                sortable_directive_1.SortableHeaderDirective,
                login_component_1.LoginModalComponent,
                has_any_authority_directive_1.HasAnyAuthorityDirective
            ],
            providers: [
                {
                    provide: 'UserService',
                    useExisting: user_service_1.UserService
                },
                {
                    provide: 'AppointmentService',
                    useExisting: appointment_service_1.AppointmentService
                },
                {
                    provide: 'RemarkService',
                    useExisting: remark_service_1.RemarkService
                },
                {
                    provide: 'InvoiceService',
                    useExisting: invoice_service_1.InvoiceService
                },
                {
                    provide: 'TreatmentService',
                    useExisting: treatment_service_1.TreatmentService
                }
            ]
        })
    ], MedappointSharedModule);
    return MedappointSharedModule;
}());
exports.MedappointSharedModule = MedappointSharedModule;
