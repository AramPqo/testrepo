package com.novanus.medappoint.service.dto;

import com.novanus.medappoint.domain.enumeration.InvoiceStatus;
import com.novanus.medappoint.domain.enumeration.PaymentStatus;
import com.novanus.medappoint.domain.enumeration.PaymentType;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Invoice} entity.
 */
public class InvoiceDTO implements Serializable {

    private Long id;

    private Instant createdAt;

    private Long invoiceNumber;

    private InvoiceStatus invoiceStatus;

    private PaymentStatus paymentStatus;

    private PaymentType paymentType;

    private String recipientName;

    private String recipientAddress;

    private String recipientPostalCode;

    private String recipientCity;

    private Integer invoiceTotal;


    private Long businessId;

    private Long currencyId;

    private Long patientId;

    private Long appointmentId;

    private Long treatmentId;

    private Set<InvoiceItemDTO> invoiceItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Long getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(Long invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public InvoiceStatus getInvoiceStatus() {
        return invoiceStatus;
    }

    public void setInvoiceStatus(InvoiceStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientAddress() {
        return recipientAddress;
    }

    public void setRecipientAddress(String recipientAddress) {
        this.recipientAddress = recipientAddress;
    }

    public String getRecipientPostalCode() {
        return recipientPostalCode;
    }

    public void setRecipientPostalCode(String recipientPostalCode) {
        this.recipientPostalCode = recipientPostalCode;
    }

    public String getRecipientCity() {
        return recipientCity;
    }

    public void setRecipientCity(String recipientCity) {
        this.recipientCity = recipientCity;
    }

    public Integer getInvoiceTotal() {
        return invoiceTotal;
    }

    public void setInvoiceTotal(Integer invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Long getTreatmentId() {
        return treatmentId;
    }

    public void setTreatmentId(Long treatmentId) {
        this.treatmentId = treatmentId;
    }

    public Set<InvoiceItemDTO> getInvoiceItems() {
        return invoiceItems;
    }

    public void setInvoiceItems(Set<InvoiceItemDTO> invoiceItems) {
        this.invoiceItems = invoiceItems;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvoiceDTO)) {
            return false;
        }

        return id != null && id.equals(((InvoiceDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceDTO{" +
                "id=" + getId() +
                ", createdAt='" + getCreatedAt() + "'" +
                ", invoiceNumber=" + getInvoiceNumber() +
                ", invoiceStatus='" + getInvoiceStatus() + "'" +
                ", paymentStatus='" + getPaymentStatus() + "'" +
                ", paymentType='" + getPaymentType() + "'" +
                ", recipientName='" + getRecipientName() + "'" +
                ", recipientAddress='" + getRecipientAddress() + "'" +
                ", recipientPostalCode='" + getRecipientPostalCode() + "'" +
                ", recipientCity='" + getRecipientCity() + "'" +
                ", invoiceTotal=" + getInvoiceTotal() +
                ", businessId=" + getBusinessId() +
                ", currencyId=" + getCurrencyId() +
                ", patientId=" + getPatientId() +
                ", appointmentId=" + getAppointmentId() +
                ", treatmentId=" + getTreatmentId() +
                "}";
    }
}
