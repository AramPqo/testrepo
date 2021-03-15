package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Appointment;
import com.novanus.medappoint.service.dto.AppointmentCalendarDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Appointment} and its DTO {@link com.novanus.medappoint.service.dto.AppointmentCalendarDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PatientMapper.class, TreatmentMapper.class})
public interface AppointmentCalendarMapper extends EntityMapper<AppointmentCalendarDTO, Appointment> {

    default Appointment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setId(id);
        return appointment;
    }
}
