package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Country;
import com.novanus.medappoint.service.dto.CountryDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Country} and its DTO {@link CountryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CountryMapper extends EntityMapper<CountryDTO, Country> {


    default Country fromId(Long id) {
        if (id == null) {
            return null;
        }
        Country country = new Country();
        country.setId(id);
        return country;
    }
}
