package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.InvoiceItemDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.InvoiceItem}.
 */
public interface InvoiceItemService {

    /**
     * Save a serviceItem.
     *
     * @param invoiceItemDTO the entity to save.
     * @return the persisted entity.
     */
    InvoiceItemDTO save(InvoiceItemDTO invoiceItemDTO);

    /**
     * Get all the serviceItems.
     *
     * @return the list of entities.
     */
    List<InvoiceItemDTO> findAll();


    /**
     * Get the "id" serviceItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InvoiceItemDTO> findOne(Long id);

    /**
     * Delete the "id" serviceItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
