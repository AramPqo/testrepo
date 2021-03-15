package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Currency;
import com.novanus.medappoint.service.dto.CurrencyDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Currency} and its DTO {@link CurrencyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CurrencyMapper extends EntityMapper<CurrencyDTO, Currency> {

    default Currency fromId(Long id) {
        if (id == null) {
            return null;
        }
        Currency currency = new Currency();
        currency.setId(id);
        return currency;
    }
}
