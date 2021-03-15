package com.novanus.medappoint.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Patient.
 */
@Entity
@Immutable
@Table(name = "patient_with_appointment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PatientWithAppointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "phone")
    private String phone;

    @Column(name = "start_date")
    private Instant startDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PatientWithAppointment)) {
            return false;
        }
        return id != null && id.equals(((PatientWithAppointment) o).id);
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
                ", fullName='" + getFullName() + "'" +
                ", dateOfBirth='" + getDateOfBirth() + "'" +
                ", phone='" + getPhone() + "'" +
                ", startDate='" + getStartDate() + "'" +
                "}";
    }
}
