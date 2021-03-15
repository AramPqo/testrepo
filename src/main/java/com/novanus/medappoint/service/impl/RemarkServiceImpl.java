package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Attachment;
import com.novanus.medappoint.domain.Remark;
import com.novanus.medappoint.domain.enumeration.AttachmentType;
import com.novanus.medappoint.repository.RemarkRepository;
import com.novanus.medappoint.service.AttachmentFileService;
import com.novanus.medappoint.service.AttachmentService;
import com.novanus.medappoint.service.RemarkService;
import com.novanus.medappoint.service.dto.AttachmentDTO;
import com.novanus.medappoint.service.dto.AttachmentFileDTO;
import com.novanus.medappoint.service.dto.RemarkDTO;
import com.novanus.medappoint.service.mapper.RemarkMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Remark}.
 */
@Service
@Transactional
public class RemarkServiceImpl implements RemarkService {

    private final static String PDF = "pdf";
    private final static String IMAGE = "image";

    private final Logger log = LoggerFactory.getLogger(RemarkServiceImpl.class);

    private final RemarkRepository remarkRepository;

    private final AttachmentService attachmentService;

    private final AttachmentFileService attachmentFileService;

    private final RemarkMapper remarkMapper;

    public RemarkServiceImpl(RemarkRepository remarkRepository, AttachmentService attachmentService, AttachmentFileService attachmentFileService, RemarkMapper remarkMapper) {
        this.remarkRepository = remarkRepository;
        this.attachmentService = attachmentService;
        this.attachmentFileService = attachmentFileService;
        this.remarkMapper = remarkMapper;
    }

    @Override
    public RemarkDTO save(RemarkDTO remarkDTO) {
        log.debug("Request to save Remark : {}", remarkDTO);
        Remark remark = remarkMapper.toEntity(remarkDTO);
        remark.setCreatedAt(Instant.now());
        remark = remarkRepository.save(remark);
        return remarkMapper.toDto(remark);
    }

    @Override
    public RemarkDTO save(RemarkDTO remarkDTO, MultipartFile[] attachments) {
        log.debug("Request to save Remark : {}", remarkDTO);
        RemarkDTO createdRemarkDTO = save(remarkDTO);
        List<AttachmentDTO> attachmentDTOs = new LinkedList<>();

        if (attachments != null && attachments.length > 0) {
            for (MultipartFile attachment : attachments) {
                try {
                    final AttachmentFileDTO attachmentFileDTO = new AttachmentFileDTO();
                    attachmentFileDTO.setFile(attachment.getBytes());
                    attachmentFileDTO.setFileContentType(attachment.getContentType());
                    AttachmentFileDTO createdAttachmentFileDTO = attachmentFileService.save(attachmentFileDTO);

                    final AttachmentDTO attachmentDTO = new AttachmentDTO();
                    attachmentDTO.setRemarkId(createdRemarkDTO.getId());
                    attachmentDTO.setFileName(attachment.getOriginalFilename());
                    attachmentDTO.setAttachmentType(getAttachmentType(attachmentDTO.getFileName(), attachment.getContentType()));
                    attachmentDTO.setAttachmentFileId(createdAttachmentFileDTO.getId());
                    AttachmentDTO createdAttachmentDTO = attachmentService.save(attachmentDTO);
                    attachmentDTOs.add(createdAttachmentDTO);
                } catch (IOException e) {
                    log.error("Failed to persist attachment file : {}", attachment.getOriginalFilename());
                }
                createdRemarkDTO.setAttachments(attachmentDTOs);
            }
        }

        return createdRemarkDTO;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RemarkDTO> findAll() {
        log.debug("Request to get all Remarks");
        List<RemarkDTO> remarkDTOs = remarkRepository.findAll().stream()
                .map(remarkMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
        remarkDTOs.forEach(r -> r.setAttachments(null));

        return remarkDTOs;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RemarkDTO> findByPatient(Long patientId) {
        log.debug("Request to get Remarks by patient ID {}", patientId);
        return remarkRepository.findByPatientId(patientId).stream()
                .map(remarkMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RemarkDTO> findOne(Long id) {
        log.debug("Request to get Remark : {}", id);

        Optional<RemarkDTO> remarkDTO = remarkRepository.findById(id)
                .map(remarkMapper::toDto);
        remarkDTO.ifPresent(dto -> dto.setAttachments(attachmentService.findAllAttachmentsForRemark(dto.getId())));
        return remarkDTO;
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Remark : {}", id);
        remarkRepository.deleteById(id);
    }

    private AttachmentType getAttachmentType(String filename, String contentType) {
        if (contentType != null) {
            if (contentType.contains(PDF)) {
                return AttachmentType.PDF;
            } else if (contentType.contains(IMAGE)) {
                return AttachmentType.IMAGE;
            }
        } else {
            if (filename.toLowerCase().endsWith(PDF)) {
                return AttachmentType.PDF;
            }
        }
        return AttachmentType.UNKNWON;
    }
}
