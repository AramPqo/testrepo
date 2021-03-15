package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Business;
import com.novanus.medappoint.repository.BusinessRepository;
import com.novanus.medappoint.service.BusinessService;
import com.novanus.medappoint.service.dto.BusinessDTO;
import com.novanus.medappoint.service.mapper.BusinessMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Business}.
 */
@Service
@Transactional
public class BusinessServiceImpl implements BusinessService {

    private final Logger log = LoggerFactory.getLogger(BusinessServiceImpl.class);

    private final BusinessRepository businessRepository;

    private final BusinessMapper businessMapper;

    public BusinessServiceImpl(BusinessRepository businessRepository, BusinessMapper businessMapper) {
        this.businessRepository = businessRepository;
        this.businessMapper = businessMapper;
    }

    @Override
    @Transactional
    public BusinessDTO updateNumber(Optional<BusinessDTO> businessDTO) {
        log.debug("Request to update Business Invoice Number : {}", businessDTO);
        Business business = businessRepository.getOne(businessDTO.get().getId());
        business.setInvoiceNumber(businessDTO.get().getInvoiceNumber());
        business = businessRepository.save(business);
        return businessMapper.toDto(business);
    }

    @Override
    @Transactional
    public BusinessDTO updateColor(BusinessDTO businessDTO) {
        // TODO change entity usage to HQL
        log.debug("Request to update Business custom colors : {}", businessDTO);
        Business business = businessRepository.getOne(businessDTO.getId());
        business.setCustomColors(businessDTO.getCustomColors());
        business = businessRepository.save(business);
        return businessMapper.toDto(business);
    }

    @Override
    public BusinessDTO save(BusinessDTO businessDTO) {
        log.debug("Request to save Business : {}", businessDTO);
        Business business = businessMapper.toEntity(businessDTO);
        business = businessRepository.save(business);
        return businessMapper.toDto(business);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BusinessDTO> findAll() {
        log.debug("Request to get all Businesses");
        return businessRepository.findAll().stream()
                .map(businessMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<BusinessDTO> findOne(Long id) {
        log.debug("Request to get Business : {}", id);
        return businessRepository.findById(id)
                .map(businessMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Business : {}", id);
        businessRepository.deleteById(id);
    }
}
