package com.novanus.medappoint.service;

import com.lowagie.text.pdf.BaseFont;
import com.novanus.medappoint.domain.*;
import com.novanus.medappoint.repository.InvoiceRepository;
import com.novanus.medappoint.service.impl.InvoiceItemServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class InvoicePDFService {

    private final Logger log = LoggerFactory.getLogger(InvoiceItemServiceImpl.class);

    private final InvoiceRepository invoiceRepository;

    public InvoicePDFService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @Transactional(readOnly = true)
    public byte[] getPDF(Long id) {
        byte[] outBuf = null;
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ITextRenderer renderer = new ITextRenderer();

            String html = fillThymeleafTemplate(id);
            renderer.getFontResolver()
                    .addFont(ResourceUtils.getFile("fonts/OpenSans-Bold.ttf").getPath(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            renderer.getFontResolver()
                    .addFont(ResourceUtils.getFile("fonts/OpenSans-Regular.ttf").getPath(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//            renderer.getFontResolver()
//                    .addFont(InvoicePDFService.class
//                            .getClassLoader().getResource("fonts/mem8YaGs126MiZpBA-UFWJ0bbck.ttf").getPath(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//            renderer.getFontResolver()
//                    .addFont(InvoicePDFService.class
//                            .getClassLoader().getResource("fonts/mem8YaGs126MiZpBA-UFUZ0bbck.ttf").getPath(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(outputStream);
            outBuf = outputStream.toByteArray();
            outputStream.close();

        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
        return outBuf;
    }


    private String fillThymeleafTemplate(Long id) {
        Invoice invoice = getInvoice(id);
        return parseThymeleafTemplate(invoice);
    }


    private Invoice getInvoice(Long id) {
        log.debug("Request to get InvoiceItem for PDF : {}", id);
        return invoiceRepository.findById(id).get();
    }

    @ModelAttribute("items11")
    List<String> items11() {
        return Arrays.asList("Message 1", "Message 2", "Message 3");
    }

    private String parseThymeleafTemplate(Invoice invoice) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        Context context = new Context();

        context.setVariable("invoice_createdAt", invoice.getCreatedAt());
        context.setVariable("invoice_invoiceNumber", invoice.getInvoiceNumber());

        Set<InvoiceItem> invoiceItems = invoice.getInvoiceItems();
        for (InvoiceItem invoiceItem : invoiceItems) {
            context.setVariable("items", invoiceItems);
            context.setVariable("items", invoiceItems);
            context.setVariable("items", invoiceItems);

//            context.setVariable("invoice_invoiceNumber", invoice.getInvoiceNumber());
//            context.setVariable("invoice_createdAt", invoice.getCreatedAt());
//            context.setVariable("invoice_invoiceNumber", invoice.getInvoiceNumber());
        }

        Patient patient = invoice.getPatient();
        if (patient != null) {
            context.setVariable("patient_firstName", patient.getFirstName());
            context.setVariable("patient_lastName", patient.getLastName());

            Location location = patient.getLocation();
            if (location != null) {
                context.setVariable("patient_location_address", location.getStreetAddress());
                context.setVariable("patient_location_postalCode", location.getPostalCode());
                context.setVariable("patient_location_city", location.getCity());
                Country country = location.getCountry();
                if (country != null) {
                    context.setVariable("patient_location_country_name", country.getName());
                }
            }
        }

        Business business = invoice.getBusiness();
        if (business != null) {
            context.setVariable("business_name", business.getName());
            context.setVariable("business_website", business.getWebsite());
            context.setVariable("business_phone", business.getPhone());
            Location location = business.getLocation();
            if (location != null) {
                context.setVariable("business_location_address", location.getStreetAddress());
                context.setVariable("business_location_city", location.getCity());
                context.setVariable("business_location_postalCode", location.getPostalCode());
            }
        }

        Currency currency = invoice.getCurrency();
        if (currency != null) {
            context.setVariable("po_number_label", currency.getSymbol());
            context.setVariable("currency_label", currency.getName());
//            TBA currency field
            context.setVariable("currency", "TBA");
        }

//      TBA fields that needs to create or change variables name
        context.setVariable("due_date_label", "TBA");
        context.setVariable("net_term_label", "TBA");
        context.setVariable("due_date", "TBA");
        context.setVariable("net_term", "TBA");
        context.setVariable("po_number", "TBA");
        context.setVariable("invoice_netTotal", "TBA");
        context.setVariable("invoice_taxAmount", "TBA");
        context.setVariable("invoice_grossTotal", "TBA");
        context.setVariable("invoice_paymentTerms", "TBA");


        return templateEngine.process("thymeleaf/invoice_template", context);
    }
}