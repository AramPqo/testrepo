package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.service.ServiceItemService;
import com.novanus.medappoint.service.dto.ServiceItemDTO;
import com.novanus.medappoint.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.novanus.medappoint.domain.ServiceItem}.
 */
@RestController
@RequestMapping("/api")
public class ServiceItemResource {

    private final Logger log = LoggerFactory.getLogger(ServiceItemResource.class);

    private static final String ENTITY_NAME = "serviceItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceItemService serviceItemService;

    public ServiceItemResource(ServiceItemService serviceItemService) {
        this.serviceItemService = serviceItemService;
    }

    /**
     * {@code POST  /service-items} : Create a new serviceItem.
     *
     * @param serviceItemDTO the serviceItemDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceItemDTO, or with status {@code 400 (Bad Request)} if the serviceItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-items")
    public ResponseEntity<ServiceItemDTO> createServiceItem(@RequestBody ServiceItemDTO serviceItemDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceItem : {}", serviceItemDTO);
        if (serviceItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceItemDTO result = serviceItemService.save(serviceItemDTO);
        return ResponseEntity.created(new URI("/api/service-items/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /service-items} : Updates an existing serviceItem.
     *
     * @param serviceItemDTO the serviceItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceItemDTO,
     * or with status {@code 400 (Bad Request)} if the serviceItemDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-items")
    public ResponseEntity<ServiceItemDTO> updateServiceItem(@RequestBody ServiceItemDTO serviceItemDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceItem : {}", serviceItemDTO);
        if (serviceItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceItemDTO result = serviceItemService.save(serviceItemDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceItemDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /service-items} : get all the serviceItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceItems in body.
     */
    @GetMapping("/service-items")
    public List<ServiceItemDTO> getAllServiceItems() {
        log.debug("REST request to get all ServiceItems");
        return serviceItemService.findAll();
    }

    /**
     * {@code GET  /service-items/:id} : get the "id" serviceItem.
     *
     * @param id the id of the serviceItemDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceItemDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-items/{id}")
    public ResponseEntity<ServiceItemDTO> getServiceItem(@PathVariable Long id) {
        log.debug("REST request to get ServiceItem : {}", id);
        Optional<ServiceItemDTO> serviceItemDTO = serviceItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(serviceItemDTO);
    }

    /**
     * {@code DELETE  /service-items/:id} : delete the "id" serviceItem.
     *
     * @param id the id of the serviceItemDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-items/{id}")
    public ResponseEntity<Void> deleteServiceItem(@PathVariable Long id) {
        log.debug("REST request to delete ServiceItem : {}", id);
        serviceItemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
