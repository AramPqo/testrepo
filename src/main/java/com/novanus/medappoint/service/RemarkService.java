package com.novanus.medappoint.service;

import com.novanus.medappoint.service.dto.RemarkDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.novanus.medappoint.domain.Remark}.
 */
public interface RemarkService {

    /**
     * Save a remark.
     *
     * @param remarkDTO the entity to save.
     * @return the persisted entity.
     */
    RemarkDTO save(RemarkDTO remarkDTO);

    /**
     * Save a remark with attachments.
     *
     * @param remarkDTO   the entity to save.
     * @param attachments multipart files for the attachments.
     * @return the persisted entity.
     */
    RemarkDTO save(RemarkDTO remarkDTO, MultipartFile[] attachments);

    /**
     * Get all the remarks.
     *
     * @return the list of entities.
     */
    List<RemarkDTO> findAll();

    /**
     * Get the remarks by patient
     *
     * @param patientId the patient ID (nullable)
     * @return the list of entities.
     */
    List<RemarkDTO> findByPatient(Long patientId);

    /**
     * Get the "id" remark.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RemarkDTO> findOne(Long id);

    /**
     * Delete the "id" remark.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
