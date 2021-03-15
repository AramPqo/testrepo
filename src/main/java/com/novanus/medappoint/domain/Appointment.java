package com.novanus.medappoint.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.novanus.medappoint.domain.enumeration.AppointmentType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Appointment.
 */
@Entity
@Table(name = "appointment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "title")
    private String title;

    @Column(name = "cancelled")
    private Boolean cancelled;

    @Column(name = "color_code")
    private String colorCode;

    @Column(name = "missed")
    private Boolean missed;

    @Column(name = "notes")
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_type")
    private AppointmentType appointmentType;

    @ManyToOne
    @JsonIgnoreProperties(value = "appointments", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "appointments", allowSetters = true)
    private Patient patient;

    @ManyToOne
    @JsonIgnoreProperties(value = "appointments", allowSetters = true)
    private Treatment treatment;

    @ManyToOne
    @JsonIgnoreProperties(value = "appointments", allowSetters = true)
    private Business business;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Business getBusiness() {
        return business;
    }

    public Appointment business(Business business) {
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

    public Instant getStartDate() {
        return startDate;
    }

    public Appointment startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Appointment endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getTitle() {
        return title;
    }

    public Appointment title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean isCancelled() {
        return cancelled;
    }

    public Appointment cancelled(Boolean cancelled) {
        this.cancelled = cancelled;
        return this;
    }

    public void setCancelled(Boolean cancelled) {
        this.cancelled = cancelled;
    }

    public String getColorCode() {
        return colorCode;
    }

    public Appointment colorCode(String colorCode) {
        this.colorCode = colorCode;
        return this;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public Boolean isMissed() {
        return missed;
    }

    public Appointment missed(Boolean missed) {
        this.missed = missed;
        return this;
    }

    public void setMissed(Boolean missed) {
        this.missed = missed;
    }

    public String getNotes() {
        return notes;
    }

    public Appointment notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getUser() {
        return user;
    }

    public Appointment user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Patient getPatient() {
        return patient;
    }

    public Appointment patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Treatment getTreatment() {
        return treatment;
    }

    public Appointment treatment(Treatment treatment) {
        this.treatment = treatment;
        return this;
    }

    public void setTreatment(Treatment treatment) {
        this.treatment = treatment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    public AppointmentType getAppointmentType() {
        return appointmentType;
    }

    public Appointment appointmentType(AppointmentType appointmentType) {
        this.appointmentType = appointmentType;
        return this;
    }

    public void setAppointmentType(AppointmentType appointmentType) {
        this.appointmentType = appointmentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Appointment)) {
            return false;
        }
        return id != null && id.equals(((Appointment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + getId() +
                ", startDate='" + getStartDate() + "'" +
                ", endDate='" + getEndDate() + "'" +
                ", title='" + getTitle() + "'" +
                ", cancelled='" + isCancelled() + "'" +
                ", colorCode='" + getColorCode() + "'" +
                ", missed='" + isMissed() + "'" +
                ", notes='" + getNotes() + "'" +
                ", appointmentType='" + getAppointmentType() + "'" +
                ", business='" + getBusiness() + "'" +
                "}";
    }
}
