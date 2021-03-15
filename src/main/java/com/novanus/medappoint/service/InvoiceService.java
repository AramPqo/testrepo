package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.InvoiceDTO;
import com.novanus.medappoint.service.dto.InvoiceFilterDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Invoice}.
 */
public interface InvoiceService {

    /**
     * Save a invoice.
     *
     * @param invoiceDTO the entity to save.
     * @return the persisted entity.
     */
    InvoiceDTO save(InvoiceDTO invoiceDTO);

    /**
     * Get all the invoices.
     *
     * @return the list of entities.
     */
    List<InvoiceDTO> findAll();

    /**
     * Get the invoices by patient
     *
     * @param patientId the patient ID (nullable)
     * @return the list of entities.
     */
    List<InvoiceDTO> findByPatient(Long patientId);

    /**
     * Get all the invoices filtered.
     *
     * @return the list of entities.
     */
    List<InvoiceDTO> findAllFiltered(InvoiceFilterDTO invoiceFilterDTO);

    /**
     * Get the "id" invoice.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InvoiceDTO> findOne(Long id);

    /**
     * Delete the "id" invoice.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    // save updated Invoice status to CANCELED
    InvoiceDTO updateInvoiceStatus(Optional<InvoiceDTO> invoiceDTO);

    // save Invoice status to IMMUTABLE when get the Invoice PDF
    InvoiceDTO saveFromPDF(Optional<InvoiceDTO> invoiceDTO);
}
