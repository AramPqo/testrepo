package com.novanus.medappoint.service.dto;

import com.novanus.medappoint.domain.enumeration.AppointmentType;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Appointment} entity.
 */
public class AppointmentCalendarDTO implements Serializable {

    private Long id;

    private Instant startDate;

    private Instant endDate;

    private String title;

    private Boolean cancelled;

    private String colorCode;

    private Boolean missed;

    private String notes;

    private AppointmentType appointmentType;


    private UserDTO userDTO;

    private PatientDTO patientDTO;

    private TreatmentDTO treatmentDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean isCancelled() {
        return cancelled;
    }

    public void setCancelled(Boolean cancelled) {
        this.cancelled = cancelled;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public Boolean isMissed() {
        return missed;
    }

    public void setMissed(Boolean missed) {
        this.missed = missed;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public PatientDTO getPatientDTO() {
        return patientDTO;
    }

    public void setPatientDTO(PatientDTO patientDTO) {
        this.patientDTO = patientDTO;
    }

    public TreatmentDTO getTreatmentDTO() {
        return treatmentDTO;
    }

    public void setTreatmentDTO(TreatmentDTO treatmentDTO) {
        this.treatmentDTO = treatmentDTO;
    }

    public AppointmentType getAppointmentType() {
        return appointmentType;
    }

    public void setAppointmentType(AppointmentType appointmentType) {
        this.appointmentType = appointmentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppointmentCalendarDTO)) {
            return false;
        }

        return id != null && id.equals(((AppointmentCalendarDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppointmentDTO{" +
                "id=" + getId() +
                ", startDate='" + getStartDate() + "'" +
                ", endDate='" + getEndDate() + "'" +
                ", title='" + getTitle() + "'" +
                ", cancelled='" + isCancelled() + "'" +
                ", colorCode='" + getColorCode() + "'" +
                ", missed='" + isMissed() + "'" +
                ", notes='" + getNotes() + "'" +
                ", userDTO=" + getUserDTO() +
                ", patientDTO=" + getPatientDTO() +
                ", treatmentDTO=" + getTreatmentDTO() +
                ", appointmentType=" + getAppointmentType() +
                "}";
    }
}
