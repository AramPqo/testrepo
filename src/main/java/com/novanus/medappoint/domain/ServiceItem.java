package com.novanus.medappoint.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A ServiceItem.
 */
@Entity
@Table(name = "service_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ServiceItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Integer price;

    @Column(name = "vat_rate")
    private Integer vatRate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public ServiceItem description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public ServiceItem price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getVatRate() {
        return vatRate;
    }

    public ServiceItem vatRate(Integer vatRate) {
        this.vatRate = vatRate;
        return this;
    }

    public void setVatRate(Integer vatRate) {
        this.vatRate = vatRate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceItem)) {
            return false;
        }
        return id != null && id.equals(((ServiceItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceItem{" +
                "id=" + getId() +
                ", description='" + getDescription() + "'" +
                ", price=" + getPrice() +
                ", vatRate=" + getVatRate() +
                "}";
    }
}
