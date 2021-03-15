package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.AppointmentCalendarDTO;
import com.novanus.medappoint.service.dto.AppointmentDTO;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Appointment}.
 */
public interface AppointmentService {

    /**
     * Save a appointment.
     *
     * @param appointmentDTO the entity to save.
     * @return the persisted entity.
     */
    AppointmentDTO save(AppointmentDTO appointmentDTO);

    /**
     * Get all the appointments.
     *
     * @return the list of entities.
     */
    List<AppointmentDTO> findAll();

    /**
     * Get the appointments by dates.
     *
     * @param fromDate  the starting date
     * @param toDate    the ending date
     * @param patientId the patient ID (nullable)
     * @return the list of entities.
     */
    List<AppointmentDTO> findByDates(Instant fromDate, Instant toDate, Long patientId);

    /**
     * Get the appointments by dates.
     *
     * @param patientId the patient ID (nullable)
     * @return the list of entities.
     */
    List<AppointmentDTO> findByPatient(Long patientId);

    /**
     * Get the "id" appointment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppointmentDTO> findOne(Long id);

    /**
     * Delete the "id" appointment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Check date range of appointment.
     *
     * @param from, to, userId the id of the user.
     */
    boolean searchForDateRange(Instant from, Instant to, Long userId);

    // AppointmentCalendarDTO service

    Optional<AppointmentCalendarDTO> findOneCalendar(Long id);

    List<AppointmentCalendarDTO> findAllCalendar();

    List<AppointmentCalendarDTO> findByPatientDTO(Long patientId);

    List<AppointmentCalendarDTO> findByDatesCalendar(Instant fromDate, Instant toDate, Long patientId);
}
