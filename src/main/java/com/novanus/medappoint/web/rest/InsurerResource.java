package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.service.InsurerService;
import com.novanus.medappoint.service.dto.InsurerDTO;
import com.novanus.medappoint.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.novanus.medappoint.domain.Insurer}.
 */
@RestController
@RequestMapping("/api")
public class InsurerResource {

    private final Logger log = LoggerFactory.getLogger(InsurerResource.class);

    private static final String ENTITY_NAME = "insurer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InsurerService insurerService;

    public InsurerResource(InsurerService insurerService) {
        this.insurerService = insurerService;
    }

    /**
     * {@code POST  /insurers} : Create a new insurer.
     *
     * @param insurerDTO the insurerDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new insurerDTO, or with status {@code 400 (Bad Request)} if the insurer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/insurers")
    public ResponseEntity<InsurerDTO> createInsurer(@Valid @RequestBody InsurerDTO insurerDTO) throws URISyntaxException {
        log.debug("REST request to save Insurer : {}", insurerDTO);
        if (insurerDTO.getId() != null) {
            throw new BadRequestAlertException("A new insurer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InsurerDTO result = insurerService.save(insurerDTO);
        return ResponseEntity.created(new URI("/api/insurers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /insurers} : Updates an existing insurer.
     *
     * @param insurerDTO the insurerDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated insurerDTO,
     * or with status {@code 400 (Bad Request)} if the insurerDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the insurerDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/insurers")
    public ResponseEntity<InsurerDTO> updateInsurer(@Valid @RequestBody InsurerDTO insurerDTO) throws URISyntaxException {
        log.debug("REST request to update Insurer : {}", insurerDTO);
        if (insurerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InsurerDTO result = insurerService.save(insurerDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, insurerDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /insurers} : get all the insurers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of insurers in body.
     */
    @GetMapping("/insurers")
    public List<InsurerDTO> getAllInsurers() {
        log.debug("REST request to get all Insurers");
        return insurerService.findAll();
    }

    /**
     * {@code GET  /insurers/:id} : get the "id" insurer.
     *
     * @param id the id of the insurerDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the insurerDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/insurers/{id}")
    public ResponseEntity<InsurerDTO> getInsurer(@PathVariable Long id) {
        log.debug("REST request to get Insurer : {}", id);
        Optional<InsurerDTO> insurerDTO = insurerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(insurerDTO);
    }

    /**
     * {@code DELETE  /insurers/:id} : delete the "id" insurer.
     *
     * @param id the id of the insurerDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/insurers/{id}")
    public ResponseEntity<Void> deleteInsurer(@PathVariable Long id) {
        log.debug("REST request to delete Insurer : {}", id);
        insurerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
