package com.novanus.medappoint.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

public class PatientWithAppointmentDTO implements Serializable {

    private Long id;

    @NotNull
    private String fullName;

    private Instant dateOfBirth;

    private String phone;

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
        if (!(o instanceof com.novanus.medappoint.service.dto.PatientWithAppointmentDTO)) {
            return false;
        }

        return id != null && id.equals(((com.novanus.medappoint.service.dto.PatientWithAppointmentDTO) o).id);
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
                ", firstName='" + getFullName() + "'" +
                ", dateOfBirth='" + getDateOfBirth() + "'" +
                ", phone='" + getPhone() + "'" +
                ", startDate='" + getStartDate() + "'" +
                "}";
    }
}
