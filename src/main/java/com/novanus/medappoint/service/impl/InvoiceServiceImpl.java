package com.novanus.medappoint.service.impl;

import com.novanus.medappoint.domain.Invoice;
import com.novanus.medappoint.domain.InvoiceItem;
import com.novanus.medappoint.repository.InvoiceItemRepository;
import com.novanus.medappoint.repository.InvoiceRepository;
import com.novanus.medappoint.service.InvoiceService;
import com.novanus.medappoint.service.dto.InvoiceDTO;
import com.novanus.medappoint.service.dto.InvoiceFilterDTO;
import com.novanus.medappoint.service.dto.InvoiceItemDTO;
import com.novanus.medappoint.service.mapper.InvoiceItemMapper;
import com.novanus.medappoint.service.mapper.InvoiceMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

/**
 * Service Implementation for managing {@link Invoice}.
 */
@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final Logger log = LoggerFactory.getLogger(InvoiceServiceImpl.class);

    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;

    private final InvoiceMapper invoiceMapper;
    private final InvoiceItemMapper invoiceItemMapper;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, InvoiceMapper invoiceMapper, InvoiceItemRepository invoiceItemRepository, InvoiceItemMapper invoiceItemMapper) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceMapper = invoiceMapper;
        this.invoiceItemRepository = invoiceItemRepository;
        this.invoiceItemMapper = invoiceItemMapper;
    }

    @Override
    public InvoiceDTO save(InvoiceDTO invoiceDTO) {
        log.debug("Request to save Invoice : {}", invoiceDTO);
        Invoice invoice = invoiceMapper.toEntity(invoiceDTO);
        invoice = invoiceRepository.save(invoice);
        //TODO handle invoiceItems
        Set<InvoiceItemDTO> invoiceItems = invoiceDTO.getInvoiceItems();

        if (invoiceItems != null) {
            Set<InvoiceItem> addedInvoiceItems = new HashSet<>();
            for (InvoiceItemDTO invoiceItemDTO : invoiceItems) {
                InvoiceItem invoiceItem = invoiceItemMapper.toEntity(invoiceItemDTO);
                invoiceItem.setInvoice(invoice);
                invoiceItem = invoiceItemRepository.save(invoiceItem);
                addedInvoiceItems.add(invoiceItem);
            }
            invoice.setInvoiceItems(addedInvoiceItems);
        }
        return invoiceMapper.toDto(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceDTO> findAll() {
        log.debug("Request to get all Invoices");
        return invoiceRepository.findAll().stream()
                .map(invoiceMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceDTO> findByPatient(Long patientId) {
        log.debug("Request to get Invoices by patient ID {}", patientId);
        return invoiceRepository.findByPatientId(patientId).stream()
                .map(invoiceMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceDTO> findAllFiltered(InvoiceFilterDTO invoiceFilterDTO) {
        log.debug("Request to get all Invoices filtered");

        if (StringUtils.isNotEmpty(invoiceFilterDTO.getRecipientName())
                && (isNull(invoiceFilterDTO.getStartDate())
                || isNull(invoiceFilterDTO.getEndDate()))) {
            return invoiceRepository.findByRecipient(invoiceFilterDTO.getRecipientName()).stream()
                    .map(invoiceMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        } else if (StringUtils.isEmpty(invoiceFilterDTO.getRecipientName())
                && (nonNull(invoiceFilterDTO.getStartDate())
                && nonNull(invoiceFilterDTO.getEndDate()))) {
            return invoiceRepository.findByDate(invoiceFilterDTO.getStartDate(), invoiceFilterDTO.getEndDate()).stream()
                    .map(invoiceMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        } else if (StringUtils.isNotEmpty(invoiceFilterDTO.getRecipientName())
                && nonNull(invoiceFilterDTO.getStartDate())
                && nonNull(invoiceFilterDTO.getEndDate())) {
            return invoiceRepository.findByDateAndRecipient(invoiceFilterDTO.getStartDate(),
                    invoiceFilterDTO.getEndDate(),
                    invoiceFilterDTO.getRecipientName()).stream()
                    .map(invoiceMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        } else {
            return invoiceRepository.findAll().stream()
                    .map(invoiceMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceDTO> findOne(Long id) {
        log.debug("Request to get Invoice : {}", id);
        return invoiceRepository.findById(id)
                .map(invoiceMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Invoice : {}", id);
        invoiceRepository.deleteById(id);
    }

    // Update invoice status to CANCELED when call PUT invoices/canceled
    @Override
    @Transactional
    public InvoiceDTO updateInvoiceStatus(Optional<InvoiceDTO> invoiceDTO) {
        log.debug("Request to update Invoice status to canceled : {}", invoiceDTO);
        Invoice invoice = invoiceRepository.getOne(invoiceDTO.get().getId());
        invoice.setInvoiceStatus(invoiceDTO.get().getInvoiceStatus());
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }

    // Update Invoice status to IMMUTABLE when call GET invoice_pdf
    @Override
    public InvoiceDTO saveFromPDF(Optional<InvoiceDTO> invoiceDTO) {
        log.debug("Request to update Invoice status to IMMUTABLE : {}", invoiceDTO);
        Invoice invoice = invoiceRepository.getOne(invoiceDTO.get().getId());
        invoice.setInvoiceStatus(invoiceDTO.get().getInvoiceStatus());
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }
}
