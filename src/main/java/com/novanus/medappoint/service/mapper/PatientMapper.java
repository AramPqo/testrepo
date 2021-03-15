package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Patient;
import com.novanus.medappoint.service.dto.PatientDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Patient} and its DTO {@link PatientDTO}.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, InsurerMapper.class})
public interface PatientMapper extends EntityMapper<PatientDTO, Patient> {

    @Mapping(source = "location", target = "location")
    @Mapping(source = "insurer.id", target = "insurerId")
    PatientDTO toDto(Patient patient);

    @Mapping(target = "remarks", ignore = true)
    @Mapping(target = "removeRemarks", ignore = true)
    @Mapping(source = "location", target = "location")
    @Mapping(source = "insurerId", target = "insurer")
    Patient toEntity(PatientDTO patientDTO);

    default Patient fromId(Long id) {
        if (id == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setId(id);
        return patient;
    }
}
