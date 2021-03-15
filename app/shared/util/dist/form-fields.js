"use strict";
exports.__esModule = true;
exports.FormFields = void 0;
var moment = require("moment");
exports.FormFields = {
    remark: [
        {
            key: 'title',
            type: 'input',
            readonly: true,
            defaultValue: '',
            templateOptions: {
                keyCode: 'title',
                required: true,
                label: 'title'
            }
        },
        {
            key: 'content',
            type: 'textarea',
            defaultValue: '',
            templateOptions: {
                keyCode: 'content',
                required: true,
                label: 'content'
            }
        },
        {
            key: 'file',
            type: 'file',
            templateOptions: {
                keyCode: null
            }
        }
    ],
    appointment: [
        {
            key: 'startDate',
            type: 'medappointDate',
            defaultValue: moment().startOf('day'),
            templateOptions: {
                keyCode: 'startDate',
                label: 'Day'
            }
        },
        {
            key: 'timeFrom',
            type: 'medappointTime',
            className: 'time-field-content time-from',
            defaultValue: '10:00',
            templateOptions: {
                keyCode: 'startDate',
                calendarKeyCode: 'start',
                label: 'Time From'
            }
        },
        {
            key: 'timeTo',
            type: 'medappointTime',
            className: 'time-field-content time-to',
            defaultValue: '11:00',
            templateOptions: {
                keyCode: 'endDate',
                calendarKeyCode: 'end',
                label: 'Time To'
            }
        },
        {
            key: 'userId',
            type: 'medappointDropdown',
            defaultValue: '',
            templateOptions: {
                keyCode: 'userId',
                label: 'User',
                service: 'UserService',
                displayName: 'firstName'
            }
        },
        {
            key: 'title',
            type: 'input',
            defaultValue: '',
            templateOptions: {
                keyCode: 'title',
                label: 'Title'
            }
        },
        {
            key: 'colorCode',
            type: 'medappointColor',
            defaultValue: '#000000',
            templateOptions: {
                keyCode: 'colorCode',
                label: 'Color'
            }
        },
        {
            key: 'notes',
            type: 'textarea',
            defaultValue: '',
            templateOptions: {
                keyCode: 'notes',
                required: true,
                label: 'notes'
            }
        }
    ],
    invoice: [
        {
            key: 'paymentType',
            type: 'medappointDropdown',
            defaultValue: [],
            templateOptions: {
                keyCode: 'paymentType',
                isCustom: true,
                data: [
                    'TRANSFER',
                    'CARD',
                    'CASH'
                ],
                label: 'Payment Type',
                displayName: ''
            }
        },
        {
            key: 'appointmentId',
            type: 'medappointAppointmentDropdown',
            defaultValue: '',
            templateOptions: {
                keyCode: 'appointmentId',
                label: 'Appointment',
                service: 'AppointmentService',
                displayName: ''
            }
        },
        {
            key: 'treatmentId',
            type: 'medappointDropdown',
            defaultValue: '',
            templateOptions: {
                keyCode: 'treatmentId',
                label: 'Treatment',
                service: 'TreatmentService',
                displayName: 'description'
            }
        },
        {
            key: 'invoiceId',
            type: 'serviceItemControl',
            defaultValue: '',
            templateOptions: {
                keyCode: 'id',
                label: 'Invoice Items'
            }
        },
        {
            key: 'invoiceTotal',
            type: 'input',
            symbol: '€',
            readonly: true,
            defaultValue: '',
            className: 'readonly invoiceTotal-field',
            templateOptions: {
                keyCode: 'invoiceTotal',
                label: 'Invoice Total'
            }
        },
    ]
};
