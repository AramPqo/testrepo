package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.TreatmentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Treatment}.
 */
public interface TreatmentService {

    /**
     * Save a treatment.
     *
     * @param treatmentDTO the entity to save.
     * @return the persisted entity.
     */
    TreatmentDTO save(TreatmentDTO treatmentDTO);

    /**
     * Get all the treatments.
     *
     * @return the list of entities.
     */
    List<TreatmentDTO> findAll();

    /**
     * Get the "id" treatment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TreatmentDTO> findOne(Long id);

    /**
     * Delete the "id" treatment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
