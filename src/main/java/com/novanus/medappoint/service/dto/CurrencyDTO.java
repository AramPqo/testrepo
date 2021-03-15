package com.novanus.medappoint.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Currency} entity.
 */
public class CurrencyDTO implements Serializable {

    private Long id;

    private String name;

    private String isoCode;

    private String symbol;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CurrencyDTO)) {
            return false;
        }

        return id != null && id.equals(((CurrencyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CurrencyDTO{" +
                "id=" + getId() +
                ", name='" + getName() + "'" +
                ", isoCode='" + getIsoCode() + "'" +
                ", symbol='" + getSymbol() + "'" +
                "}";
    }
}
