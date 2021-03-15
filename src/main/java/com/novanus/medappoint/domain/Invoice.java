package com.novanus.medappoint.domain;

import com.novanus.medappoint.domain.enumeration.InvoiceStatus;
import com.novanus.medappoint.domain.enumeration.PaymentStatus;
import com.novanus.medappoint.domain.enumeration.PaymentType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Invoice.
 */
@Entity
@DynamicUpdate
@Table(name = "invoice")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "invoice_number")
    private Long invoiceNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "invoice_status")
    private InvoiceStatus invoiceStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "recipient_address")
    private String recipientAddress;

    @Column(name = "recipient_postal_code")
    private String recipientPostalCode;

    @Column(name = "recipient_city")
    private String recipientCity;

    @Column(name = "invoice_total")
    private Integer invoiceTotal;

    @OneToOne
    @JoinColumn(unique = true)
    private Business business;

    @OneToOne
    @JoinColumn(unique = true)
    private Currency currency;

    @OneToOne
    @JoinColumn(unique = true)
    private Patient patient;

    @OneToOne
    @JoinColumn(unique = true)
    private Appointment appointment;

    @OneToOne
    @JoinColumn(unique = true)
    private Treatment treatment;

    @OneToMany(mappedBy = "invoice")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<InvoiceItem> invoiceItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Invoice createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Long getInvoiceNumber() {
        return invoiceNumber;
    }

    public Invoice invoiceNumber(Long invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
        return this;
    }

    public void setInvoiceNumber(Long invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public InvoiceStatus getInvoiceStatus() {
        return invoiceStatus;
    }

    public Invoice invoiceStatus(InvoiceStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
        return this;
    }

    public void setInvoiceStatus(InvoiceStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public Invoice paymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
        return this;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public Invoice paymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public Invoice recipientName(String recipientName) {
        this.recipientName = recipientName;
        return this;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientAddress() {
        return recipientAddress;
    }

    public Invoice recipientAddress(String recipientAddress) {
        this.recipientAddress = recipientAddress;
        return this;
    }

    public void setRecipientAddress(String recipientAddress) {
        this.recipientAddress = recipientAddress;
    }

    public String getRecipientPostalCode() {
        return recipientPostalCode;
    }

    public Invoice recipientPostalCode(String recipientPostalCode) {
        this.recipientPostalCode = recipientPostalCode;
        return this;
    }

    public void setRecipientPostalCode(String recipientPostalCode) {
        this.recipientPostalCode = recipientPostalCode;
    }

    public String getRecipientCity() {
        return recipientCity;
    }

    public Invoice recipientCity(String recipientCity) {
        this.recipientCity = recipientCity;
        return this;
    }

    public void setRecipientCity(String recipientCity) {
        this.recipientCity = recipientCity;
    }

    public Integer getInvoiceTotal() {
        return invoiceTotal;
    }

    public Invoice invoiceTotal(Integer invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
        return this;
    }

    public void setInvoiceTotal(Integer invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }

    public Business getBusiness() {
        return business;
    }

    public Invoice business(Business business) {
        this.business = business;
        return this;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Invoice currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Patient getPatient() {
        return patient;
    }

    public Invoice patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public Invoice appointment(Appointment appointment) {
        this.appointment = appointment;
        return this;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Treatment getTreatment() {
        return treatment;
    }

    public Invoice treatment(Treatment treatment) {
        this.treatment = treatment;
        return this;
    }

    public void setTreatment(Treatment treatment) {
        this.treatment = treatment;
    }

    public Set<InvoiceItem> getInvoiceItems() {
        return invoiceItems;
    }

    public Invoice invoiceItems(Set<InvoiceItem> invoiceItem) {
        this.invoiceItems = invoiceItem;
        return this;
    }

    public Invoice addInvoiceItems(InvoiceItem invoiceItem) {
        this.invoiceItems.add(invoiceItem);
        invoiceItem.setInvoice(this);
        return this;
    }

    public Invoice removeInvoiceItems(InvoiceItem invoiceItem) {
        this.invoiceItems.remove(invoiceItem);
        invoiceItem.setInvoice(null);
        return this;
    }

    public void setInvoiceItems(Set<InvoiceItem> invoiceItems) {
        this.invoiceItems = invoiceItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invoice{" +
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
                "}";
    }
}
