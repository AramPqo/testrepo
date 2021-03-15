package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.InsurerDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Insurer}.
 */
public interface InsurerService {

    /**
     * Save a insurer.
     *
     * @param insurerDTO the entity to save.
     * @return the persisted entity.
     */
    InsurerDTO save(InsurerDTO insurerDTO);

    /**
     * Get all the insurers.
     *
     * @return the list of entities.
     */
    List<InsurerDTO> findAll();


    /**
     * Get the "id" insurer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InsurerDTO> findOne(Long id);

    /**
     * Delete the "id" insurer.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
