package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

/**
 * Spring Data  repository for the Appointment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("select appointment from Appointment appointment where appointment.user.login = ?#{principal.username}")
    List<Appointment> findByUserIsCurrentUser();

    List<Appointment> findByStartDateBetween(Instant fromDate, Instant toDate);

    List<Appointment> findByStartDateBetweenAndPatientId(Instant fromDate, Instant toDate, Long patientId);

    List<Appointment> findByPatientId(Long patientId);

    @Query("select appointment from Appointment appointment where appointment.user.id = :user_id and ((appointment.startDate >= :end_date and appointment.startDate <= :end_date) or (appointment.endDate >= :start_date and appointment.endDate <= :end_date))")
    List<Appointment> findExistingDate(@Param("start_date") Instant startDate, @Param("end_date") Instant endDate, @Param("user_id") Long userId);

}
