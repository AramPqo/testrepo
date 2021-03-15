package com.novanus.medappoint.web.rest;

import com.novanus.medappoint.service.AttachmentFileService;
import com.novanus.medappoint.service.dto.AttachmentFileDTO;
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
 * REST controller for managing {@link com.novanus.medappoint.domain.AttachmentFile}.
 */
@RestController
@RequestMapping("/api")
public class AttachmentFileResource {

    private final Logger log = LoggerFactory.getLogger(AttachmentFileResource.class);

    private static final String ENTITY_NAME = "attachmentFile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttachmentFileService attachmentFileService;

    public AttachmentFileResource(AttachmentFileService attachmentFileService) {
        this.attachmentFileService = attachmentFileService;
    }

    /**
     * {@code POST  /attachment-files} : Create a new attachmentFile.
     *
     * @param attachmentFileDTO the attachmentFileDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attachmentFileDTO, or with status {@code 400 (Bad Request)} if the attachmentFile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/attachment-files")
    public ResponseEntity<AttachmentFileDTO> createAttachmentFile(@RequestBody AttachmentFileDTO attachmentFileDTO) throws URISyntaxException {
        log.debug("REST request to save AttachmentFile : {}", attachmentFileDTO);
        if (attachmentFileDTO.getId() != null) {
            throw new BadRequestAlertException("A new attachmentFile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttachmentFileDTO result = attachmentFileService.save(attachmentFileDTO);
        return ResponseEntity.created(new URI("/api/attachment-files/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /attachment-files} : Updates an existing attachmentFile.
     *
     * @param attachmentFileDTO the attachmentFileDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attachmentFileDTO,
     * or with status {@code 400 (Bad Request)} if the attachmentFileDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attachmentFileDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/attachment-files")
    public ResponseEntity<AttachmentFileDTO> updateAttachmentFile(@RequestBody AttachmentFileDTO attachmentFileDTO) throws URISyntaxException {
        log.debug("REST request to update AttachmentFile : {}", attachmentFileDTO);
        if (attachmentFileDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AttachmentFileDTO result = attachmentFileService.save(attachmentFileDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, attachmentFileDTO.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /attachment-files} : get all the attachmentFiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attachmentFiles in body.
     */
    @GetMapping("/attachment-files")
    public List<AttachmentFileDTO> getAllAttachmentFiles() {
        log.debug("REST request to get all AttachmentFiles");
        return attachmentFileService.findAll();
    }

    /**
     * {@code GET  /attachment-files/:id} : get the "id" attachmentFile.
     *
     * @param id the id of the attachmentFileDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attachmentFileDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/attachment-files/{id}")
    public ResponseEntity<AttachmentFileDTO> getAttachmentFile(@PathVariable Long id) {
        log.debug("REST request to get AttachmentFile : {}", id);
        Optional<AttachmentFileDTO> attachmentFileDTO = attachmentFileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attachmentFileDTO);
    }

    /**
     * {@code DELETE  /attachment-files/:id} : delete the "id" attachmentFile.
     *
     * @param id the id of the attachmentFileDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/attachment-files/{id}")
    public ResponseEntity<Void> deleteAttachmentFile(@PathVariable Long id) {
        log.debug("REST request to delete AttachmentFile : {}", id);
        attachmentFileService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


}
