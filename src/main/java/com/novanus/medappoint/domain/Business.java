package com.novanus.medappoint.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Business.
 */
@Entity
@DynamicUpdate
@Table(name = "business")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Business implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "website")
    private String website;

    @Column(name = "logo")
    private String logo;

    @Column(name = "email_footer")
    private String emailFooter;

    @Column(name = "vat_number")
    private String vatNumber;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "iban")
    private String iban;

    @Column(name = "bic")
    private String bic;

    @Column(name = "show_patient_name")
    private Boolean showPatientName = Boolean.FALSE;

    @Column(name = "custom_colors")
    private String customColors;

    @Column(name = "invoice_number")
    private Long invoiceNumber;

    @OneToOne
    @JoinColumn(unique = true)
    private Currency currency;

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

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

    public Business name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Business description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public Business email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public Business phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public Business mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWebsite() {
        return website;
    }

    public Business website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLogo() {
        return logo;
    }

    public Business logo(String logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getEmailFooter() {
        return emailFooter;
    }

    public Business emailFooter(String emailFooter) {
        this.emailFooter = emailFooter;
        return this;
    }

    public void setEmailFooter(String emailFooter) {
        this.emailFooter = emailFooter;
    }

    public String getVatNumber() {
        return vatNumber;
    }

    public Business vatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
        return this;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public Business bankName(String bankName) {
        this.bankName = bankName;
        return this;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getIban() {
        return iban;
    }

    public Business iban(String iban) {
        this.iban = iban;
        return this;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getBic() {
        return bic;
    }

    public Business bic(String bic) {
        this.bic = bic;
        return this;
    }

    public void setBic(String bic) {
        this.bic = bic;
    }

    public Boolean isShowPatientName() {
        return showPatientName == null ? Boolean.FALSE : showPatientName;
    }

    public Business showPatientName(Boolean showPatientName) {
        this.showPatientName = showPatientName;
        return this;
    }

    public void setShowPatientName(Boolean showPatientName) {
        this.showPatientName = showPatientName;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Business currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Location getLocation() {
        return location;
    }

    public Business location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    public String getCustomColors() {
        return customColors;
    }

    public Business customColors(String customColors) {
        this.customColors = customColors;
        return this;
    }

    public void setCustomColors(String customColors) {
        this.customColors = customColors;
    }

    public Long getInvoiceNumber() {
        return invoiceNumber;
    }

    public Business invoiceNumber(Long invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
        return this;
    }

    public void setInvoiceNumber(Long invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Business)) {
            return false;
        }
        return id != null && id.equals(((Business) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Business{" +
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
                ", showPatientName='" + isShowPatientName() + "'" +
                ", customColors=" + getCustomColors() +
                ", customColors=" + getInvoiceNumber() +
                "}";
    }
}
