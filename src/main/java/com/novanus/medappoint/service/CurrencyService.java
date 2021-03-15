package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.CurrencyDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Currency}.
 */
public interface CurrencyService {

    /**
     * Save a currency.
     *
     * @param currencyDTO the entity to save.
     * @return the persisted entity.
     */
    CurrencyDTO save(CurrencyDTO currencyDTO);

    /**
     * Get all the currencies.
     *
     * @return the list of entities.
     */
    List<CurrencyDTO> findAll();


    /**
     * Get the "id" currency.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CurrencyDTO> findOne(Long id);

    /**
     * Delete the "id" currency.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
