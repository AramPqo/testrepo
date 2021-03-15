package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.OpeningHoursDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.OpeningHours}.
 */
public interface OpeningHoursService {

    /**
     * Save a openingHours.
     *
     * @param openingHoursDTO the entity to save.
     * @return the persisted entity.
     */
    OpeningHoursDTO save(OpeningHoursDTO openingHoursDTO);

    /**
     * Get all the openingHours.
     *
     * @return the list of entities.
     */
    List<OpeningHoursDTO> findAll();


    /**
     * Get the "id" openingHours.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OpeningHoursDTO> findOne(Long id);

    /**
     * Delete the "id" openingHours.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
