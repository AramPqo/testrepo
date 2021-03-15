import { IAppointment } from 'app/shared/model/appointment.model';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { IPatient } from 'app/shared/model/patient.model';
import { ITreatment } from 'app/shared/model/treatment.model';

@Component({
  selector: 'jhi-invoice-update',
  templateUrl: './invoice-update.component.html',
})
export class InvoiceUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[];
  appointments: IAppointment[];
  treatments: ITreatment[];

  editForm = this.fb.group({
    id: [],
    invoiceNumber: [null, [Validators.required]],
    recipientName: [null, [Validators.required]],
    recipientCity: [null, [Validators.required]],
    invoiceStatus: [null, [Validators.required]],
    paymentType: [null, [Validators.required]],
    paymentStatus: [null, [Validators.required]],
    patientId: [],
    appointmentId: [null, [Validators.required]],
    treatmentId: [null, [Validators.required]],
    invoiceTotal: [null, [Validators.required]]
  });

  constructor(private invoiceService: InvoiceService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoice, patients, appointments, treatments }) => {
      this.patients = patients;
      this.appointments = appointments;
      this.treatments = treatments;
      this.updateForm(invoice);
    });
  }

  updateForm(invoice: IInvoice): void {
    this.editForm.patchValue({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      recipientName: invoice.recipientName,
      recipientCity: invoice.recipientCity,
      invoiceStatus: invoice.invoiceStatus,
      paymentType: invoice.paymentType,
      paymentStatus: invoice.paymentStatus,
      patientId: invoice.patientId,
      appointmentId: invoice.appointmentId,
      treatmentId: invoice.treatmentId,
      invoiceTotal: invoice.invoiceTotal
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (invoice.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  private createFromForm(): IInvoice {
    return {
      ...new Invoice(),
      id: this.editForm.get(['id'])!.value,
      invoiceNumber: this.editForm.get(['invoiceNumber'])!.value,
      recipientName: this.editForm.get(['recipientName'])!.value,
      recipientCity: this.editForm.get(['recipientCity'])!.value,
      invoiceStatus: this.editForm.get(['invoiceStatus'])!.value,
      paymentType: this.editForm.get(['paymentType'])!.value,
      paymentStatus: this.editForm.get(['paymentStatus'])!.value,
      patientId: this.editForm.get(['patientId'])!.value,
      appointmentId: this.editForm.get(['appointmentId'])!.value,
      treatmentId: this.editForm.get(['treatmentId'])!.value,
      invoiceTotal: this.editForm.get(['invoiceTotal'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
