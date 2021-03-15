package com.novanus.medappoint.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.novanus.medappoint.domain.enumeration.AttachmentType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Attachment.
 */
@Entity
@Table(name = "attachment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Attachment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "attachment_type")
    private AttachmentType attachmentType;

    @Column(name = "file_name")
    private String fileName;

    @OneToOne
    @JoinColumn(unique = true)
    private AttachmentFile attachmentFile;

    @ManyToOne
    @JsonIgnoreProperties(value = "attachments", allowSetters = true)
    private Remark remark;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttachmentType getAttachmentType() {
        return attachmentType;
    }

    public Attachment attachmentType(AttachmentType attachmentType) {
        this.attachmentType = attachmentType;
        return this;
    }

    public void setAttachmentType(AttachmentType attachmentType) {
        this.attachmentType = attachmentType;
    }

    public String getFileName() {
        return fileName;
    }

    public Attachment fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public AttachmentFile getAttachmentFile() {
        return attachmentFile;
    }

    public Attachment attachmentFile(AttachmentFile attachmentFile) {
        this.attachmentFile = attachmentFile;
        return this;
    }

    public void setAttachmentFile(AttachmentFile attachmentFile) {
        this.attachmentFile = attachmentFile;
    }

    public Remark getRemark() {
        return remark;
    }

    public Attachment remark(Remark remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(Remark remark) {
        this.remark = remark;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attachment)) {
            return false;
        }
        return id != null && id.equals(((Attachment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Attachment{" +
                "id=" + getId() +
                ", attachmentType='" + getAttachmentType() + "'" +
                ", fileName='" + getFileName() + "'" +
                "}";
    }
}
