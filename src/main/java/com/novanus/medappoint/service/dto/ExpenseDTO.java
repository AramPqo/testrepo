package com.novanus.medappoint.service.dto;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Expense} entity.
 */
public class ExpenseDTO implements Serializable {

    private Long id;

    private Long businessId;

    private Instant date;

    private String accountNumber;

    private String voucherNumber;

    private String name;

    private String subject;

    private Integer total;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExpenseDTO)) {
            return false;
        }
        return id != null && id.equals(((ExpenseDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExpenseDTO{" +
                "id=" + getId() +
                ", businessId='" + getBusinessId() + "'" +
                ", date='" + getDate() + "'" +
                ", accountNumber='" + getAccountNumber() + "'" +
                ", voucherNumber='" + getVoucherNumber() + "'" +
                ", name='" + getName() + "'" +
                ", subject='" + getSubject() + "'" +
                ", total='" + getTotal() + "'" +
                "}";
    }
}
