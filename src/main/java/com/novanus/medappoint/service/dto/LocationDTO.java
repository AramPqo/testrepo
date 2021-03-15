package com.novanus.medappoint.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Location} entity.
 */
public class LocationDTO implements Serializable {

    private Long id;

    private String streetAddress;

    private String postalCode;

    private String city;

    private String state;

    private Long countryId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocationDTO)) {
            return false;
        }

        return id != null && id.equals(((LocationDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocationDTO{" +
                "id=" + getId() +
                ", streetAddress='" + getStreetAddress() + "'" +
                ", postalCode='" + getPostalCode() + "'" +
                ", city='" + getCity() + "'" +
                ", state='" + getState() + "'" +
                ", countryId=" + getCountryId() +
                "}";
    }
}
