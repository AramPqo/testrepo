package com.novanus.medappoint.service.dto;

import com.novanus.medappoint.domain.enumeration.Gender;
import com.novanus.medappoint.domain.enumeration.Language;
import com.novanus.medappoint.domain.enumeration.PaymentType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Patient} entity.
 */
public class PatientDTO implements Serializable {

    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String title;

    private Gender gender;

    private Instant dateOfBirth;

    private String email;

    private String phone;

    private String mobile;

    private Language language;

    private String insuranceNumber;

    private String occupation;

    private String employer;

    private String initialDiagnose;

    private LocationDTO location;

    private String workPhone;

    private Boolean bluePrescription;

    private Boolean yearlyReceipt;

    private PaymentType paymentType;

    private Long insurerId;

    private Long businessId;

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
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

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getEmployer() {
        return employer;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public String getInitialDiagnose() {
        return initialDiagnose;
    }

    public void setInitialDiagnose(String initialDiagnose) {
        this.initialDiagnose = initialDiagnose;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public Long getInsurerId() {
        return insurerId;
    }

    public void setInsurerId(Long insurerId) {
        this.insurerId = insurerId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PatientDTO)) {
            return false;
        }

        return id != null && id.equals(((PatientDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PatientDTO{" +
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
                ", location=(" + getLocation() + ")" +
                ", insurerId=" + getInsurerId() +
                ", businessId=" + getBusinessId() +
                "}";
    }
}
