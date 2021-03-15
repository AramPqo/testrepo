package com.novanus.medappoint.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Treatment} entity.
 */
public class TreatmentDTO implements Serializable {

    private Long id;

    private String description;

    private Integer duration;

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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TreatmentDTO)) {
            return false;
        }

        return id != null && id.equals(((TreatmentDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TreatmentDTO{" +
                "id=" + getId() +
                ", description='" + getDescription() + "'" +
                ", duration=" + getDuration() +
                "}";
    }
}
