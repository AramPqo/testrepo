package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.AttachmentFile;
import com.novanus.medappoint.repository.AttachmentFileRepository;
import com.novanus.medappoint.service.AttachmentFileService;
import com.novanus.medappoint.service.dto.AttachmentFileDTO;
import com.novanus.medappoint.service.mapper.AttachmentFileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link AttachmentFile}.
 */
@Service
@Transactional
public class AttachmentFileServiceImpl implements AttachmentFileService {

    private final Logger log = LoggerFactory.getLogger(AttachmentFileServiceImpl.class);

    private final AttachmentFileRepository attachmentFileRepository;

    private final AttachmentFileMapper attachmentFileMapper;

    public AttachmentFileServiceImpl(AttachmentFileRepository attachmentFileRepository, AttachmentFileMapper attachmentFileMapper) {
        this.attachmentFileRepository = attachmentFileRepository;
        this.attachmentFileMapper = attachmentFileMapper;
    }

    @Override
    public AttachmentFileDTO save(AttachmentFileDTO attachmentFileDTO) {
        log.debug("Request to save AttachmentFile : {}", attachmentFileDTO);
        AttachmentFile attachmentFile = attachmentFileMapper.toEntity(attachmentFileDTO);
        attachmentFile = attachmentFileRepository.save(attachmentFile);
        return attachmentFileMapper.toDto(attachmentFile);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttachmentFileDTO> findAll() {
        log.debug("Request to get all AttachmentFiles");
        return attachmentFileRepository.findAll().stream()
                .map(attachmentFileMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<AttachmentFileDTO> findOne(Long id) {
        log.debug("Request to get AttachmentFile : {}", id);
        return attachmentFileRepository.findById(id)
                .map(attachmentFileMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AttachmentFile : {}", id);
        attachmentFileRepository.deleteById(id);
    }
}
