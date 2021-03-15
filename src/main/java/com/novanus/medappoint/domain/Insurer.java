package com.novanus.medappoint.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A Insurer.
 */
@Entity
@Table(name = "insurer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Insurer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "abbr")
    private String abbr;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Insurer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbr() {
        return abbr;
    }

    public Insurer abbr(String abbr) {
        this.abbr = abbr;
        return this;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Insurer)) {
            return false;
        }
        return id != null && id.equals(((Insurer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Insurer{" +
                "id=" + getId() +
                ", name='" + getName() + "'" +
                ", abbr='" + getAbbr() + "'" +
                "}";
    }
}
