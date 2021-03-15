package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.InvoiceItem;
import com.novanus.medappoint.repository.InvoiceItemRepository;
import com.novanus.medappoint.service.InvoiceItemService;
import com.novanus.medappoint.service.dto.InvoiceItemDTO;
import com.novanus.medappoint.service.mapper.InvoiceItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link InvoiceItem}.
 */
@Service
@Transactional
public class InvoiceItemServiceImpl implements InvoiceItemService {

    private final Logger log = LoggerFactory.getLogger(InvoiceItemServiceImpl.class);

    private final InvoiceItemRepository invoiceItemRepository;

    private final InvoiceItemMapper invoiceItemMapper;

    public InvoiceItemServiceImpl(InvoiceItemRepository invoiceItemRepository, InvoiceItemMapper invoiceItemMapper) {
        this.invoiceItemRepository = invoiceItemRepository;
        this.invoiceItemMapper = invoiceItemMapper;
    }

    @Override
    public InvoiceItemDTO save(InvoiceItemDTO invoiceItemDTO) {
        log.debug("Request to save ServiceItem : {}", invoiceItemDTO);
        InvoiceItem invoiceItem = invoiceItemMapper.toEntity(invoiceItemDTO);
        invoiceItem = invoiceItemRepository.save(invoiceItem);
        return invoiceItemMapper.toDto(invoiceItem);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceItemDTO> findAll() {
        log.debug("Request to get all InvoiceItems");
        return invoiceItemRepository.findAll().stream()
                .map(invoiceItemMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceItemDTO> findOne(Long id) {
        log.debug("Request to get ServiceItem : {}", id);
        return invoiceItemRepository.findById(id)
                .map(invoiceItemMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceItem : {}", id);
        invoiceItemRepository.deleteById(id);
    }
}
