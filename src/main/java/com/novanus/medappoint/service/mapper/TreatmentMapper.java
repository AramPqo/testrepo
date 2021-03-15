package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Treatment;
import com.novanus.medappoint.service.dto.TreatmentDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Treatment} and its DTO {@link TreatmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {BusinessMapper.class})
public interface TreatmentMapper extends EntityMapper<TreatmentDTO, Treatment> {

    default Treatment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Treatment treatment = new Treatment();
        treatment.setId(id);
        return treatment;
    }
}
