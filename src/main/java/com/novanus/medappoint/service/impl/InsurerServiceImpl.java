package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Insurer;
import com.novanus.medappoint.repository.InsurerRepository;
import com.novanus.medappoint.service.InsurerService;
import com.novanus.medappoint.service.dto.InsurerDTO;
import com.novanus.medappoint.service.mapper.InsurerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Insurer}.
 */
@Service
@Transactional
public class InsurerServiceImpl implements InsurerService {

    private final Logger log = LoggerFactory.getLogger(InsurerServiceImpl.class);

    private final InsurerRepository insurerRepository;

    private final InsurerMapper insurerMapper;

    public InsurerServiceImpl(InsurerRepository insurerRepository, InsurerMapper insurerMapper) {
        this.insurerRepository = insurerRepository;
        this.insurerMapper = insurerMapper;
    }

    @Override
    public InsurerDTO save(InsurerDTO insurerDTO) {
        log.debug("Request to save Insurer : {}", insurerDTO);
        Insurer insurer = insurerMapper.toEntity(insurerDTO);
        insurer = insurerRepository.save(insurer);
        return insurerMapper.toDto(insurer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InsurerDTO> findAll() {
        log.debug("Request to get all Insurers");
        return insurerRepository.findAll().stream()
                .map(insurerMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InsurerDTO> findOne(Long id) {
        log.debug("Request to get Insurer : {}", id);
        return insurerRepository.findById(id)
                .map(insurerMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Insurer : {}", id);
        insurerRepository.deleteById(id);
    }
}
