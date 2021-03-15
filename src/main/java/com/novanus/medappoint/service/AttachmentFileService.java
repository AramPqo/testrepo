package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.AttachmentFileDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.AttachmentFile}.
 */
public interface AttachmentFileService {

    /**
     * Save a attachmentFile.
     *
     * @param attachmentFileDTO the entity to save.
     * @return the persisted entity.
     */
    AttachmentFileDTO save(AttachmentFileDTO attachmentFileDTO);

    /**
     * Get all the attachmentFiles.
     *
     * @return the list of entities.
     */
    List<AttachmentFileDTO> findAll();


    /**
     * Get the "id" attachmentFile.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AttachmentFileDTO> findOne(Long id);

    /**
     * Delete the "id" attachmentFile.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
