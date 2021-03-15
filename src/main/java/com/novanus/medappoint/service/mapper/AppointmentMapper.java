package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Appointment;
import com.novanus.medappoint.service.dto.AppointmentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Appointment} and its DTO {@link AppointmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PatientMapper.class, TreatmentMapper.class})
public interface AppointmentMapper extends EntityMapper<AppointmentDTO, Appointment> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "treatment.id", target = "treatmentId")
    AppointmentDTO toDto(Appointment appointment);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "patientId", target = "patient")
    @Mapping(source = "treatmentId", target = "treatment")
    Appointment toEntity(AppointmentDTO appointmentDTO);

    default Appointment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setId(id);
        return appointment;
    }
}
