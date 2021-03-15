package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Appointment;
import com.novanus.medappoint.repository.AppointmentRepository;
import com.novanus.medappoint.service.AppointmentService;
import com.novanus.medappoint.service.dto.AppointmentCalendarDTO;
import com.novanus.medappoint.service.dto.AppointmentDTO;
import com.novanus.medappoint.service.mapper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Appointment}.
 */
@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

    private final AppointmentRepository appointmentRepository;

    private final AppointmentMapper appointmentMapper;

    private final AppointmentCalendarMapper appointmentCalendarMapper;

    private final PatientMapper patientMapper;

    private final TreatmentMapper treatmentMapper;

    private final UserMapper userMapper;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, AppointmentMapper appointmentMapper, AppointmentCalendarMapper appointmentCalendarMapper, PatientMapper patientMapper, TreatmentMapper treatmentMapper, UserMapper userMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
        this.appointmentCalendarMapper = appointmentCalendarMapper;
        this.patientMapper = patientMapper;
        this.treatmentMapper = treatmentMapper;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean searchForDateRange(Instant from, Instant to, Long userId) {
        log.debug("Request to get Appointments by dates from:{} to:{}", from, to);
        return appointmentRepository.findExistingDate(from, to, userId).isEmpty();
    }

    @Override
    public AppointmentDTO save(AppointmentDTO appointmentDTO) {
        log.debug("Request to save Appointment : {}", appointmentDTO);
        Appointment appointment = appointmentMapper.toEntity(appointmentDTO);
        appointment = appointmentRepository.save(appointment);
        return appointmentMapper.toDto(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentDTO> findAll() {
        log.debug("Request to get all Appointments");
        return appointmentRepository.findAll().stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentDTO> findByPatient(Long patientId) {
        log.debug("Request to get Appointments by patient ID {}", patientId);
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentDTO> findByDates(Instant from, Instant to, Long patientId) {
        log.debug("Request to get Appointments by dates from:{} to:{} and patient ID {}", from, to, patientId);
        if (patientId != null) {
            return appointmentRepository.findByStartDateBetweenAndPatientId(from, to, patientId).stream()
                    .map(appointmentMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        } else {
            return appointmentRepository.findByStartDateBetween(from, to).stream()
                    .map(appointmentMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppointmentDTO> findOne(Long id) {
        log.debug("Request to get Appointment : {}", id);
        return appointmentRepository.findById(id)
                .map(appointmentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Appointment : {}", id);
        appointmentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppointmentCalendarDTO> findOneCalendar(Long id) {
        log.debug("Request to get Appointment : {}", id);

        Optional<Appointment> appointment = appointmentRepository.findById(id);

        Optional<AppointmentCalendarDTO> appointmentCalendarDTOOptional = appointment.map(appointmentCalendarMapper::toDto);

        appointmentCalendarDTOOptional.ifPresent(appointmentCalendarDTO -> appointmentCalendarDTO.setPatientDTO(patientMapper.toDto(appointment.get().getPatient())));
        appointmentCalendarDTOOptional.ifPresent(appointmentCalendarDTO -> appointmentCalendarDTO.setTreatmentDTO(treatmentMapper.toDto(appointment.get().getTreatment())));
        appointmentCalendarDTOOptional.ifPresent(appointmentCalendarDTO -> appointmentCalendarDTO.setUserDTO(userMapper.userToUserDTO(appointment.get().getUser())));

        return appointmentCalendarDTOOptional;
    }

    @Override
    public List<AppointmentCalendarDTO> findAllCalendar() {
        log.debug("Request to get all Appointments Calendar");
        return appointmentRepository.findAll().stream()
                .map(appointmentCalendarMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<AppointmentCalendarDTO> findByPatientDTO(Long patientId) {
        log.debug("Request to get Appointments by patient ID {}", patientId);
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(appointmentCalendarMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<AppointmentCalendarDTO> findByDatesCalendar(Instant fromDate, Instant toDate, Long patientId) {
        log.debug("Request to get Appointments by dates from:{} to:{} and patient ID {}", fromDate, toDate, patientId);
        if (patientId != null) {
            return appointmentRepository.findByStartDateBetweenAndPatientId(fromDate, toDate, patientId).stream()
                    .map(appointmentCalendarMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        } else {
            return appointmentRepository.findByStartDateBetween(fromDate, toDate).stream()
                    .map(appointmentCalendarMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        }
    }
}
