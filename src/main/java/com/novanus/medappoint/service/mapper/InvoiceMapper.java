package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Invoice;
import com.novanus.medappoint.service.dto.InvoiceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;

/**
 * Mapper for the entity {@link Invoice} and its DTO {@link InvoiceDTO}.
 */
@Mapper(componentModel = "spring", uses = {BusinessMapper.class, CurrencyMapper.class, PatientMapper.class, AppointmentMapper.class, TreatmentMapper.class, InvoiceItemMapper.class})
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {

    @Mapping(source = "business.id", target = "businessId")
    @Mapping(source = "currency.id", target = "currencyId")
    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "appointment.id", target = "appointmentId")
    @Mapping(source = "treatment.id", target = "treatmentId")
    @Mapping(source = "invoiceItems", target = "invoiceItems")
    InvoiceDTO toDto(Invoice invoice);

    @Mapping(source = "businessId", target = "business")
    @Mapping(source = "currencyId", target = "currency")
    @Mapping(source = "patientId", target = "patient")
    @Mapping(source = "appointmentId", target = "appointment")
    @Mapping(source = "treatmentId", target = "treatment")
    @Mapping(source = "invoiceItems", target = "invoiceItems")
    @Mapping(target = "removeInvoiceItems", ignore = true)
    Invoice toEntity(InvoiceDTO invoiceDTO);

    default Invoice fromId(Long id) {
        if (id == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setId(id);
        return invoice;
    }

    Invoice toEntity(Optional<InvoiceDTO> invoiceDTO);
}
