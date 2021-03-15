package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.PatientWithAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Patient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatientWithAppointmentRepository extends JpaRepository<PatientWithAppointment, Long> {
}
