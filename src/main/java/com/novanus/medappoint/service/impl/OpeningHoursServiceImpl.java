package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Business;
import com.novanus.medappoint.domain.OpeningHours;
import com.novanus.medappoint.repository.BusinessRepository;
import com.novanus.medappoint.repository.OpeningHoursRepository;
import com.novanus.medappoint.service.OpeningHoursService;
import com.novanus.medappoint.service.dto.OpeningHoursDTO;
import com.novanus.medappoint.service.mapper.OpeningHoursMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link OpeningHours}.
 */
@Service
@Transactional
public class OpeningHoursServiceImpl implements OpeningHoursService {

    private final Logger log = LoggerFactory.getLogger(OpeningHoursServiceImpl.class);

    private final OpeningHoursRepository openingHoursRepository;
    private final BusinessRepository businessRepository;

    private final OpeningHoursMapper openingHoursMapper;

    public OpeningHoursServiceImpl(OpeningHoursRepository openingHoursRepository, BusinessRepository businessRepository, OpeningHoursMapper openingHoursMapper) {
        this.openingHoursRepository = openingHoursRepository;
        this.businessRepository = businessRepository;
        this.openingHoursMapper = openingHoursMapper;
    }

    @Override
    public OpeningHoursDTO save(OpeningHoursDTO openingHoursDTO) {
        log.debug("Request to save OpeningHours : {}", openingHoursDTO);
        OpeningHours openingHours = openingHoursMapper.toEntity(openingHoursDTO);

        Optional<Business> defaultBusiness = businessRepository.findFirstByOrderByIdAsc();
        if (defaultBusiness.isPresent()) {
            openingHours.setBusiness(defaultBusiness.get());
        }
        openingHours = openingHoursRepository.save(openingHours);
        return openingHoursMapper.toDto(openingHours);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpeningHoursDTO> findAll() {
        log.debug("Request to get all OpeningHours");
        return openingHoursRepository.findAll().stream()
                .map(openingHoursMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<OpeningHoursDTO> findOne(Long id) {
        log.debug("Request to get OpeningHours : {}", id);
        return openingHoursRepository.findById(id)
                .map(openingHoursMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OpeningHours : {}", id);
        openingHoursRepository.deleteById(id);
    }
}
