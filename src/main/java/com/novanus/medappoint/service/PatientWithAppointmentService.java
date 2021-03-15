package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.PatientWithAppointmentDTO;

import java.util.List;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.PatientWithAppointment}.
 */
public interface PatientWithAppointmentService {

    /**
     * Get all the patients along with their upcoming appointments.
     *
     * @return the list of entities.
     */
    List<PatientWithAppointmentDTO> findAll();
}
