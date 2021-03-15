package com.novanus.medappoint.web.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.novanus.medappoint.service.RemarkService;
import com.novanus.medappoint.service.dto.RemarkDTO;
import com.novanus.medappoint.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.novanus.medappoint.domain.Remark}.
 */
@RestController
@RequestMapping("/api")
public class RemarkResource {

    private final Logger log = LoggerFactory.getLogger(RemarkResource.class);

    private static final String ENTITY_NAME = "remark";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RemarkService remarkService;

    private final ObjectMapper objectMapper;

    public RemarkResource(RemarkService remarkService, ObjectMapper objectMapper) {
        this.remarkService = remarkService;
        this.objectMapper = objectMapper;
    }

    /**
     * {@code POST  /remarks} : Create a new remark.
     *
     * @param remarkDTO the remarkDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new remarkDTO, or with status {@code 400 (Bad Request)} if the remark has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/remarks")
    public ResponseEntity<RemarkDTO> createRemark(@RequestBody RemarkDTO remarkDTO) throws URISyntaxException {
        log.debug("REST request to save Remark : {}", remarkDTO);
        if (remarkDTO.getId() != null) {
            throw new BadRequestAlertException("A new remark cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RemarkDTO result = remarkService.save(remarkDTO);
        return ResponseEntity.created(new URI("/api/remarks/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code POST  /remarks} : Create a new remark.
     *
     * @param remark      the remarkDTO to create.
     * @param attachments optional multipart files for remark attachments
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new remarkDTO, or with status {@code 400 (Bad Request)} if the remark has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping(value = "/remarks", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RemarkDTO> createRemark(@RequestPart("remark") String remark,
                                                  @RequestPart(value = "attachments", required = false) MultipartFile[] attachments)
            throws URISyntaxException, JsonProcessingException {

        RemarkDTO remarkDTO = objectMapper.readValue(remark, RemarkDTO.class);

        log.debug("REST request to save Remark : {}", remarkDTO);
        if (remarkDTO.getId() != null) {
            throw new BadRequestAlertException("A new remark cannot already have an ID", ENTITY_NAME, "idexists");
        }

        RemarkDTO result = remarkService.save(remarkDTO, attachments);

        return ResponseEntity.created(new URI("/api/remarks/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /remarks} : Updates an existing remark.
     *
     * @param remarkDTO the remarkDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated remarkDTO,
     * or with status {@code 400 (Bad Request)} if the remarkDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the remarkDTO couldn't be updated.
     */
    @PutMapping("/remarks")
    public ResponseEntity<RemarkDTO> updateRemark(@RequestBody RemarkDTO remarkDTO) {
        log.debug("REST request to update Remark : {}", remarkDTO);
        if (remarkDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RemarkDTO result = remarkService.save(remarkDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, remarkDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /remarks} : get all the remarks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of remarks in body.
     */
    @GetMapping("/remarks")
    public List<RemarkDTO> getAllRemarks(@RequestParam(name = "patientId", required = false) Long patientId) {
        log.debug("REST request to get all Remarks for patient ID {}", patientId);
        if (patientId != null) {
            return remarkService.findByPatient(patientId);
        }
        return remarkService.findAll();
    }

    /**
     * {@code GET  /remarks/:id} : get the "id" remark.
     *
     * @param id the id of the remarkDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the remarkDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/remarks/{id}")
    public ResponseEntity<RemarkDTO> getRemark(@PathVariable Long id) {
        log.debug("REST request to get Remark : {}", id);
        Optional<RemarkDTO> remarkDTO = remarkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(remarkDTO);
    }

    /**
     * {@code DELETE  /remarks/:id} : delete the "id" remark.
     *
     * @param id the id of the remarkDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/remarks/{id}")
    public ResponseEntity<Void> deleteRemark(@PathVariable Long id) {
        log.debug("REST request to delete Remark : {}", id);
        remarkService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
