package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.ServiceItemDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.ServiceItem}.
 */
public interface ServiceItemService {

    /**
     * Save a serviceItem.
     *
     * @param serviceItemDTO the entity to save.
     * @return the persisted entity.
     */
    ServiceItemDTO save(ServiceItemDTO serviceItemDTO);

    /**
     * Get all the serviceItems.
     *
     * @return the list of entities.
     */
    List<ServiceItemDTO> findAll();


    /**
     * Get the "id" serviceItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ServiceItemDTO> findOne(Long id);

    /**
     * Delete the "id" serviceItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
