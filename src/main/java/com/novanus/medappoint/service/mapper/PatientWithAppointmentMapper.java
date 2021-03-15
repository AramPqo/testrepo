package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.PatientWithAppointment;
import com.novanus.medappoint.service.dto.PatientWithAppointmentDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link PatientWithAppointment} and its DTO {@link PatientWithAppointmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PatientWithAppointmentMapper extends EntityMapper<PatientWithAppointmentDTO, PatientWithAppointment> {

    default PatientWithAppointment fromId(Long id) {
        if (id == null) {
            return null;
        }
        PatientWithAppointment patient = new PatientWithAppointment();
        patient.setId(id);
        return patient;
    }
}
