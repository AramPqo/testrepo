package com.novanus.medappoint.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.novanus.medappoint.domain.enumeration.Gender;
import com.novanus.medappoint.domain.enumeration.Language;
import com.novanus.medappoint.domain.enumeration.PaymentType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "mobile")
    private String mobile;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @Column(name = "insurance_number")
    private String insuranceNumber;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "employer")
    private String employer;

    @Column(name = "initial_diagnose")
    private String initialDiagnose;

    @Column(name = "work_phone")
    private String workPhone;

    @Column(name = "blue_prescription")
    private Boolean bluePrescription;

    @Column(name = "yearly_receipt")
    private Boolean yearlyReceipt;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "patients", allowSetters = true)
    private Location location;

    @ManyToOne
    @JsonIgnoreProperties(value = "patients", allowSetters = true)
    private Insurer insurer;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Remark> remarks = new HashSet<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "appointments", allowSetters = true)
    private Set<Appointment> appointments;

    @ManyToOne
    @JsonIgnoreProperties(value = "patients", allowSetters = true)
    private Business business;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Business getBusiness() {
        return business;
    }

    public Patient business(Business business) {
        this.business = business;
        return this;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Patient firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Patient lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTitle() {
        return title;
    }

    public Patient title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Gender getGender() {
        return gender;
    }

    public Patient gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public Patient dateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public Patient email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public Patient phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public Patient mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Language getLanguage() {
        return language;
    }

    public Patient language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public Patient insuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
        return this;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getOccupation() {
        return occupation;
    }

    public Patient occupation(String occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getEmployer() {
        return employer;
    }

    public Patient employer(String employer) {
        this.employer = employer;
        return this;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public String getInitialDiagnose() {
        return initialDiagnose;
    }

    public Patient initialDiagnose(String initialDiagnose) {
        this.initialDiagnose = initialDiagnose;
        return this;
    }

    public void setInitialDiagnose(String initialDiagnose) {
        this.initialDiagnose = initialDiagnose;
    }

    public Location getLocation() {
        return location;
    }

    public Patient location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Insurer getInsurer() {
        return insurer;
    }

    public Patient insurer(Insurer insurer) {
        this.insurer = insurer;
        return this;
    }

    public void setInsurer(Insurer insurer) {
        this.insurer = insurer;
    }

    public Set<Remark> getRemarks() {
        return remarks;
    }

    public Patient remarks(Set<Remark> remarks) {
        this.remarks = remarks;
        return this;
    }

    public Patient addRemarks(Remark remark) {
        this.remarks.add(remark);
        remark.setPatient(this);
        return this;
    }

    public Patient removeRemarks(Remark remark) {
        this.remarks.remove(remark);
        remark.setPatient(null);
        return this;
    }

    public void setRemarks(Set<Remark> remarks) {
        this.remarks = remarks;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public Patient appointments(Set<Appointment> appointments) {
        this.appointments = appointments;
        return this;
    }

    public Patient addAppointment(Appointment appointment) {
        this.appointments.add(appointment);
        appointment.setPatient(this);
        return this;
    }

    public Patient removeAppointment(Appointment appointment) {
        this.appointments.remove(appointment);
        appointment.setPatient(null);
        return this;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    public String getWorkPhone() {
        return workPhone;
    }

    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }

    public Boolean getBluePrescription() {
        return bluePrescription;
    }

    public void setBluePrescription(Boolean bluePrescription) {
        this.bluePrescription = bluePrescription;
    }

    public Boolean getYearlyReceipt() {
        return yearlyReceipt;
    }

    public void setYearlyReceipt(Boolean yearlyReceipt) {
        this.yearlyReceipt = yearlyReceipt;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Patient)) {
            return false;
        }
        return id != null && id.equals(((Patient) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Patient{" +
                "id=" + getId() +
                ", firstName='" + getFirstName() + "'" +
                ", lastName='" + getLastName() + "'" +
                ", title='" + getTitle() + "'" +
                ", gender='" + getGender() + "'" +
                ", dateOfBirth='" + getDateOfBirth() + "'" +
                ", email='" + getEmail() + "'" +
                ", phone='" + getPhone() + "'" +
                ", mobile='" + getMobile() + "'" +
                ", language='" + getLanguage() + "'" +
                ", insuranceNumber='" + getInsuranceNumber() + "'" +
                ", occupation='" + getOccupation() + "'" +
                ", employer='" + getEmployer() + "'" +
                ", initialDiagnose='" + getInitialDiagnose() + "'" +
                ", business='" + getBusiness() + "'" +
                "}";
    }
}
