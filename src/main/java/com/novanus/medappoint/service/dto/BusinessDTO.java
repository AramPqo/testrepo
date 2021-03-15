package com.novanus.medappoint.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Business} entity.
 */
public class BusinessDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private String email;

    private String phone;

    private String mobile;

    private String website;

    private String logo;

    private String emailFooter;

    private String vatNumber;

    private String bankName;

    private String iban;

    private String bic;

    private Boolean showPatientName = Boolean.FALSE;

    private Long currencyId;

    private Long locationId;

    private String customColors;

    private Long invoiceNumber;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getEmailFooter() {
        return emailFooter;
    }

    public void setEmailFooter(String emailFooter) {
        this.emailFooter = emailFooter;
    }

    public String getVatNumber() {
        return vatNumber;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getBic() {
        return bic;
    }

    public void setBic(String bic) {
        this.bic = bic;
    }

    public Long getInvoiceNumber() {
        return invoiceNumber;
    }

    public Long setInvoiceNumber(Long invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
        return invoiceNumber;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Boolean getShowPatientName() {
        return showPatientName;
    }

    public void setShowPatientName(Boolean showPatientName) {
        this.showPatientName = showPatientName;
    }

    public Boolean isShowPatientName() {
        return this.showPatientName;
    }

    public String getCustomColors() {
        return customColors;
    }

    public void setCustomColors(String customColors) {
        this.customColors = customColors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BusinessDTO)) {
            return false;
        }

        return id != null && id.equals(((BusinessDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BusinessDTO{" +
                "id=" + getId() +
                ", name='" + getName() + "'" +
                ", description='" + getDescription() + "'" +
                ", email='" + getEmail() + "'" +
                ", phone='" + getPhone() + "'" +
                ", mobile='" + getMobile() + "'" +
                ", website='" + getWebsite() + "'" +
                ", logo='" + getLogo() + "'" +
                ", emailFooter='" + getEmailFooter() + "'" +
                ", vatNumber='" + getVatNumber() + "'" +
                ", bankName='" + getBankName() + "'" +
                ", iban='" + getIban() + "'" +
                ", bic='" + getBic() + "'" +
                ", invoiceNumber=" + getInvoiceNumber() +
                ", currencyId=" + getCurrencyId() +
                ", locationId=" + getLocationId() +
                ", showPatientName=" + getShowPatientName() +
                ", customColors=" + getCustomColors() +
                "}";
    }
}
