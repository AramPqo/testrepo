package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Treatment;
import com.novanus.medappoint.repository.TreatmentRepository;
import com.novanus.medappoint.service.TreatmentService;
import com.novanus.medappoint.service.dto.TreatmentDTO;
import com.novanus.medappoint.service.mapper.TreatmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Treatment}.
 */
@Service
@Transactional
public class TreatmentServiceImpl implements TreatmentService {

    private final Logger log = LoggerFactory.getLogger(TreatmentServiceImpl.class);

    private final TreatmentRepository treatmentRepository;

    private final TreatmentMapper treatmentMapper;

    public TreatmentServiceImpl(TreatmentRepository treatmentRepository, TreatmentMapper treatmentMapper) {
        this.treatmentRepository = treatmentRepository;
        this.treatmentMapper = treatmentMapper;
    }

    @Override
    public TreatmentDTO save(TreatmentDTO treatmentDTO) {
        log.debug("Request to save Treatment : {}", treatmentDTO);
        Treatment treatment = treatmentMapper.toEntity(treatmentDTO);
        treatment = treatmentRepository.save(treatment);
        return treatmentMapper.toDto(treatment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TreatmentDTO> findAll() {
        log.debug("Request to get all Treatments");
        return treatmentRepository.findAll().stream()
                .map(treatmentMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TreatmentDTO> findOne(Long id) {
        log.debug("Request to get Treatment : {}", id);
        return treatmentRepository.findById(id)
                .map(treatmentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Treatment : {}", id);
        treatmentRepository.deleteById(id);
    }
}
