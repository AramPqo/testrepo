package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.service.OpeningHoursService;
import com.novanus.medappoint.service.dto.OpeningHoursDTO;
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
 * REST controller for managing {@link com.novanus.medappoint.domain.OpeningHours}.
 */
@RestController
@RequestMapping("/api")
public class OpeningHoursResource {

    private final Logger log = LoggerFactory.getLogger(OpeningHoursResource.class);

    private static final String ENTITY_NAME = "openingHours";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OpeningHoursService openingHoursService;

    public OpeningHoursResource(OpeningHoursService openingHoursService) {
        this.openingHoursService = openingHoursService;
    }

    /**
     * {@code POST  /opening-hours} : Create a new openingHours.
     *
     * @param openingHoursDTO the openingHoursDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new openingHoursDTO, or with status {@code 400 (Bad Request)} if the openingHours has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/opening-hours")
    public ResponseEntity<OpeningHoursDTO> createOpeningHours(@RequestBody OpeningHoursDTO openingHoursDTO) throws URISyntaxException {
        log.debug("REST request to save OpeningHours : {}", openingHoursDTO);
        if (openingHoursDTO.getId() != null) {
            throw new BadRequestAlertException("A new openingHours cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OpeningHoursDTO result = openingHoursService.save(openingHoursDTO);
        return ResponseEntity.created(new URI("/api/opening-hours/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /opening-hours} : Updates an existing openingHours.
     *
     * @param openingHoursDTO the openingHoursDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated openingHoursDTO,
     * or with status {@code 400 (Bad Request)} if the openingHoursDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the openingHoursDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/opening-hours")
    public ResponseEntity<OpeningHoursDTO> updateOpeningHours(@RequestBody OpeningHoursDTO openingHoursDTO) throws URISyntaxException {
        log.debug("REST request to update OpeningHours : {}", openingHoursDTO);
        if (openingHoursDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OpeningHoursDTO result = openingHoursService.save(openingHoursDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, openingHoursDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /opening-hours} : get all the openingHours.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of openingHours in body.
     */
    @GetMapping("/opening-hours")
    public List<OpeningHoursDTO> getAllOpeningHours() {
        log.debug("REST request to get all OpeningHours");
        return openingHoursService.findAll();
    }

    /**
     * {@code GET  /opening-hours/:id} : get the "id" openingHours.
     *
     * @param id the id of the openingHoursDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the openingHoursDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/opening-hours/{id}")
    public ResponseEntity<OpeningHoursDTO> getOpeningHours(@PathVariable Long id) {
        log.debug("REST request to get OpeningHours : {}", id);
        Optional<OpeningHoursDTO> openingHoursDTO = openingHoursService.findOne(id);
        return ResponseUtil.wrapOrNotFound(openingHoursDTO);
    }

    /**
     * {@code DELETE  /opening-hours/:id} : delete the "id" openingHours.
     *
     * @param id the id of the openingHoursDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/opening-hours/{id}")
    public ResponseEntity<Void> deleteOpeningHours(@PathVariable Long id) {
        log.debug("REST request to delete OpeningHours : {}", id);
        openingHoursService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
