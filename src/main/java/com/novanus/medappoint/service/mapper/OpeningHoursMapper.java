package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.OpeningHours;
import com.novanus.medappoint.service.dto.OpeningHoursDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link OpeningHours} and its DTO {@link OpeningHoursDTO}.
 */
@Mapper(componentModel = "spring", uses = {BusinessMapper.class})
public interface OpeningHoursMapper extends EntityMapper<OpeningHoursDTO, OpeningHours> {

    @Mapping(source = "business.id", target = "businessId")
    OpeningHoursDTO toDto(OpeningHours openingHours);

    @Mapping(source = "businessId", target = "business")
    OpeningHours toEntity(OpeningHoursDTO openingHoursDTO);

    default OpeningHours fromId(Long id) {
        if (id == null) {
            return null;
        }
        OpeningHours openingHours = new OpeningHours();
        openingHours.setId(id);
        return openingHours;
    }
}
