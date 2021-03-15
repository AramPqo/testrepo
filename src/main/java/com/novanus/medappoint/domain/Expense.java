package com.novanus.medappoint.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * An Expense.
 */
@Entity
@Table(name = "expense")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Expense implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "voucher_number")
    private String voucherNumber;

    @Column(name = "name")
    private String name;

    @Column(name = "subject")
    private String subject;

    @Column(name = "total")
    private Integer total;

    @ManyToOne
    @JsonIgnoreProperties(value = "expenses", allowSetters = true)
    private Business business;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Expense date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Expense accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public Expense voucherNumber(String voucherNumber) {
        this.voucherNumber = voucherNumber;
        return this;
    }

    public void setVoucherNumber(String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }

    public String getName() {
        return name;
    }

    public Expense name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public Expense subject(String subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Integer getTotal() {
        return total;
    }

    public Expense total(Integer total) {
        this.total = total;
        return this;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Business getBusiness() {
        return business;
    }

    public Expense business(Business business) {
        this.business = business;
        return this;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expense)) {
            return false;
        }
        return id != null && id.equals(((Expense) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Expense{" +
                "id=" + getId() +
                ", business='" + getBusiness() + "'" +
                ", date='" + getDate() + "'" +
                ", accountNumber='" + getAccountNumber() + "'" +
                ", voucherNumber='" + getVoucherNumber() + "'" +
                ", name='" + getName() + "'" +
                ", subject='" + getSubject() + "'" +
                ", total='" + getTotal() + "'" +
                "}";
    }
}
