package com.novanus.medappoint.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.novanus.medappoint.domain.enumeration.DayOfWeek;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.OpeningHours} entity.
 */
public class OpeningHoursDTO implements Serializable {

    private Long id;

    private DayOfWeek dayOfWeek;

    private String startTime;

    private String endTime;

    @JsonIgnore
    private Long businessId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OpeningHoursDTO)) {
            return false;
        }

        return id != null && id.equals(((OpeningHoursDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OpeningHoursDTO{" +
                "id=" + getId() +
                ", dayOfWeek='" + getDayOfWeek() + "'" +
                ", startTime='" + getStartTime() + "'" +
                ", endTime='" + getEndTime() + "'" +
                ", businessId=" + getBusinessId() +
                "}";
    }
}
