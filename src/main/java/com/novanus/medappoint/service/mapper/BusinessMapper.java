package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Business;
import com.novanus.medappoint.service.dto.BusinessDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;

/**
 * Mapper for the entity {@link Business} and its DTO {@link BusinessDTO}.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class, LocationMapper.class})
public interface BusinessMapper extends EntityMapper<BusinessDTO, Business> {

    @Mapping(source = "currency.id", target = "currencyId")
    @Mapping(source = "location.id", target = "locationId")
    BusinessDTO toDto(Business business);

    @Mapping(source = "currencyId", target = "currency")
    @Mapping(source = "locationId", target = "location")
    Business toEntity(BusinessDTO businessDTO);

    default Business fromId(Long id) {
        if (id == null) {
            return null;
        }
        Business business = new Business();
        business.setId(id);
        return business;
    }

    Business toEntity(Optional<BusinessDTO> businessDTO);
}
