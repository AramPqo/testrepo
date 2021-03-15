import * as moment from 'moment';

export const FormFields =
{
    remark: [
        {
            key: 'title',
            type: 'input',
            tskey: 'medappointApp.remark.detail.title',
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
            tskey: 'medappointApp.remark.content',
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
            remarkId: '',
            tskey: 'medappointApp.remark.file',
            templateOptions: {
                keyCode: null
            }
        }],
    appointment: [
        {
            key: 'startDate',
            type: 'medappointDate',
            tskey: 'medappointApp.appointment.startDate',
            defaultValue: moment().startOf('day'),
            templateOptions: {
                keyCode: 'startDate',
                label: 'Day'
            }
        },
        {
            key: 'timeFrom',
            type: 'medappointTime',
            tskey: 'medappointApp.appointment.detail.timeFrom',
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
            tskey: 'medappointApp.appointment.detail.timeTo',
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
            tskey: 'medappointApp.appointment.user',
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
            tskey: 'medappointApp.appointment.detail.title',
            defaultValue: '',
            templateOptions: {
                keyCode: 'title',
                label: 'Title'
            }
        },
        // {
        //     key: 'colorCode',
        //     type: 'medappointColor',
        //     tskey: 'medappointApp.appointment.colorCode',
        //     defaultValue: '#000000',
        //     templateOptions: {
        //         keyCode: 'colorCode',
        //         label: 'Color'
        //     }
        // },
        {
            key: 'treatmentId',
            type: 'medappointDropdown',
            tskey: 'medappointApp.appointment.treatment',
            defaultValue: '',
            templateOptions: {
                keyCode: 'treatmentId',
                label: 'Treatment',
                service: 'TreatmentService',
                displayName: 'description'
            }
        },
        {
            key: 'notes',
            type: 'textarea',
            tskey: 'medappointApp.appointment.notes',
            defaultValue: '',
            templateOptions: {
                keyCode: 'notes',
                label: 'notes'
            }
        }
    ],
    invoice: [
        {
            key: 'paymentType',
            type: 'medappointDropdown',
            tskey: 'medappointApp.invoice.detail.paymentType',
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
            tskey: 'medappointApp.invoice.appointment',
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
            tskey: 'medappointApp.invoice.treatment',
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
            tskey: 'medappointApp.invoice.invoiceItem',
            defaultValue: [],
            templateOptions: {
                keyCode: 'invoiceItems',
                label: 'Invoice Items',
                service: 'InvoiceService'
            }
        },
        {
            key: 'invoiceTotal',
            type: 'input',
            tskey: 'medappointApp.invoice.invoiceTotal',
            symbol: '€',
            defaultValue: '',
            wrappers: ["form-field-horizontal"],
            className: 'invoice-total-field',
            templateOptions: {
                keyCode: 'invoiceTotal',
                label: 'Invoice Total',
                addonLeft: {
                    class: 'formly-symbol eur',
                }
            }
        },
    ]
}

