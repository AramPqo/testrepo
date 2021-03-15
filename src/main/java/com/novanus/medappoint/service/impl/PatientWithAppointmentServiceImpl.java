package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.PatientWithAppointment;
import com.novanus.medappoint.repository.PatientWithAppointmentRepository;
import com.novanus.medappoint.service.PatientWithAppointmentService;
import com.novanus.medappoint.service.dto.PatientWithAppointmentDTO;
import com.novanus.medappoint.service.mapper.PatientWithAppointmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PatientWithAppointment}.
 */
@Service
@Transactional
public class PatientWithAppointmentServiceImpl implements PatientWithAppointmentService {

    private final Logger log = LoggerFactory.getLogger(PatientWithAppointmentServiceImpl.class);

    private final PatientWithAppointmentRepository patientWithAppointmentRepository;

    private final PatientWithAppointmentMapper patientWithAppointmentMapper;

    public PatientWithAppointmentServiceImpl(PatientWithAppointmentRepository patientWithAppointmentRepository, PatientWithAppointmentMapper patientWithAppointmentMapper) {
        this.patientWithAppointmentRepository = patientWithAppointmentRepository;
        this.patientWithAppointmentMapper = patientWithAppointmentMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatientWithAppointmentDTO> findAll() {
        log.debug("Request to get all Patients");
        return patientWithAppointmentRepository.findAll().stream()
                .map(patientWithAppointmentMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }
}
