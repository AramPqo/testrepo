package com.novanus.medappoint.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Insurer} entity.
 */
public class InsurerDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String abbr;


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

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InsurerDTO)) {
            return false;
        }

        return id != null && id.equals(((InsurerDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InsurerDTO{" +
                "id=" + getId() +
                ", name='" + getName() + "'" +
                ", abbr='" + getAbbr() + "'" +
                "}";
    }
}
