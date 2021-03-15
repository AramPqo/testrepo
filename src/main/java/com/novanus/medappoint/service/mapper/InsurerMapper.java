package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Insurer;
import com.novanus.medappoint.service.dto.InsurerDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Insurer} and its DTO {@link InsurerDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InsurerMapper extends EntityMapper<InsurerDTO, Insurer> {


    default Insurer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Insurer insurer = new Insurer();
        insurer.setId(id);
        return insurer;
    }
}
