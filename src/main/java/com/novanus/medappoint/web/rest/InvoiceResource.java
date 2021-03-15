package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.domain.enumeration.InvoiceStatus;
import com.novanus.medappoint.service.BusinessService;
import com.novanus.medappoint.service.InvoicePDFService;
import com.novanus.medappoint.service.InvoiceService;
import com.novanus.medappoint.service.dto.BusinessDTO;
import com.novanus.medappoint.service.dto.InvoiceDTO;
import com.novanus.medappoint.service.dto.InvoiceFilterDTO;
import com.novanus.medappoint.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.novanus.medappoint.domain.Invoice}.
 */
@RestController
@RequestMapping("/api")
public class InvoiceResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceResource.class);

    private static final String ENTITY_NAME = "invoice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvoiceService invoiceService;
    private final InvoicePDFService invoicePDFService;
    private final BusinessService businessService;

    public InvoiceResource(InvoiceService invoiceService, InvoicePDFService invoicePDFService, BusinessService businessService) {
        this.invoiceService = invoiceService;
        this.invoicePDFService = invoicePDFService;
        this.businessService = businessService;
    }

    /**
     * {@code POST  /invoices} : Create a new invoice.
     *
     * @param invoiceDTO the invoiceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invoiceDTO, or with status {@code 400 (Bad Request)} if the invoice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @Transactional
    @PostMapping("/invoices")
    public ResponseEntity<InvoiceDTO> createInvoice(@RequestBody InvoiceDTO invoiceDTO) throws URISyntaxException {
        log.debug("REST request to save Invoice : {}", invoiceDTO);
        if (invoiceDTO.getId() != null) {
            throw new BadRequestAlertException("A new invoice cannot already have an ID", ENTITY_NAME, "idexists");
        }

        // TODO change entity usage to HQL
        Long invoiceNumber = invoiceDTO.getInvoiceNumber();
        Long businessId = invoiceDTO.getBusinessId();
        Optional<BusinessDTO> businessDTO = businessService.findOne(businessId);
        businessDTO.get().setInvoiceNumber(invoiceNumber);
        businessService.updateNumber(businessDTO);

        invoiceDTO.setInvoiceStatus(InvoiceStatus.DRAFT);

        InvoiceDTO result = invoiceService.save(invoiceDTO);
        return ResponseEntity.created(new URI("/api/invoices/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /invoices} : Updates an existing invoice.
     *
     * @param invoiceDTO the invoiceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceDTO,
     * or with status {@code 400 (Bad Request)} if the invoiceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoiceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @Transactional
    @PutMapping("/invoices")
    public ResponseEntity<InvoiceDTO> updateInvoice(@RequestBody InvoiceDTO invoiceDTO) throws URISyntaxException {
        log.debug("REST request to update Invoice : {}", invoiceDTO);
        if (invoiceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Long invoiceID = invoiceDTO.getId();
        Optional<InvoiceDTO> invoiceDTO1 = invoiceService.findOne(invoiceID);
        if (invoiceDTO1.get().getInvoiceStatus() == InvoiceStatus.IMMUTABLE) {
            return new ResponseEntity("The Invoice Status is immutable and can't be updated", HttpStatus.FORBIDDEN);
        }

        InvoiceDTO result = invoiceService.save(invoiceDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, invoiceDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /invoices/{id}/canceled} : Updates an existing invoice status to canceled.
     *
     * @param invoiceDTO the invoiceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceDTO,
     * or with status {@code 400 (Bad Request)} if the invoiceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoiceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @Transactional
    @PutMapping("/invoices/{id}/cancel")
    public ResponseEntity<InvoiceDTO> updateInvoiceStatus(InvoiceDTO invoiceDTO, @PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to update Invoice status to CANCELED : {}", invoiceDTO);
        if (invoiceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Optional<InvoiceDTO> invoiceDTO1 = invoiceService.findOne(id);
        invoiceDTO1.get().setInvoiceStatus(InvoiceStatus.CANCELED);

        InvoiceDTO result = invoiceService.updateInvoiceStatus(invoiceDTO1);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, invoiceDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /invoices} : get all the invoices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoices in body.
     */
    @GetMapping("/invoices")
    public List<InvoiceDTO> getAllInvoices(@RequestParam(name = "patientId", required = false) Long patientId) {
        log.debug("REST request to get all Invoices for patient ID {}", patientId);
        if (patientId != null) {
            return invoiceService.findByPatient(patientId);
        }
        return invoiceService.findAll();
    }

    /**
     * {@code GET  /invoices} : get all the invoices filtered.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoices in body.
     */
    @PostMapping("/invoices/filter")
    public List<InvoiceDTO> getAllInvoicesFiltered(@RequestBody InvoiceFilterDTO invoiceFilterDTO) {
        log.debug("REST request to get all Invoices filtered");
        return invoiceService.findAllFiltered(invoiceFilterDTO);
    }

    /**
     * {@code GET  /invoices/:id} : get the "id" invoice.
     *
     * @param id the id of the invoiceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoiceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invoices/{id}")
    public ResponseEntity<InvoiceDTO> getInvoice(@PathVariable Long id) {
        log.debug("REST request to get Invoice : {}", id);
        Optional<InvoiceDTO> invoiceDTO = invoiceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(invoiceDTO);
    }

    /**
     * {@code GET  /invoices_pdf/:id} : get the "id" invoice.
     *
     * @param id the id of the invoiceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoiceDTO, or with status {@code 404 (Not Found)}.
     */
    @Transactional
    @GetMapping("/invoices_pdf/{id}")
    public ResponseEntity<byte[]> getInvoicePDF(@PathVariable Long id) {
        log.debug("REST request to get Invoice : {}", id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        String filename = "invoice.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        byte[] contents = invoicePDFService.getPDF(id);
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);

        // Set invoice status to IMMUTABLE after get invoice_pdf
        Optional<InvoiceDTO> invoiceDTO = invoiceService.findOne(id);
        invoiceDTO.get().setInvoiceStatus(InvoiceStatus.IMMUTABLE);
        invoiceService.saveFromPDF(invoiceDTO);

        return response;
    }

    /**
     * {@code DELETE  /invoices/:id} : delete the "id" invoice.
     *
     * @param id the id of the invoiceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        log.debug("REST request to delete Invoice : {}", id);
        invoiceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/invoices/filter/u/{uid}/r")
    public List<InvoiceDTO> getAllFilteredInvoices(@PathVariable Long uid) {
        log.debug("REST request to get all Invoices");

        return invoiceService.findAll();
    }
}
