package com.novanus.medappoint.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.ServiceItem} entity.
 */
public class InvoiceItemDTO implements Serializable {

    private Long id;

    private String description;

    private Integer price;

    private Integer vatRate;


    private Long invoiceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getVatRate() {
        return vatRate;
    }

    public void setVatRate(Integer vatRate) {
        this.vatRate = vatRate;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvoiceItemDTO)) {
            return false;
        }

        return id != null && id.equals(((InvoiceItemDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceItemDTO{" +
                "id=" + getId() +
                ", description='" + getDescription() + "'" +
                ", price=" + getPrice() +
                ", vatRate=" + getVatRate() +
                ", invoiceId=" + getInvoiceId() +
                "}";
    }
}
