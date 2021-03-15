package com.novanus.medappoint.service.dto;

import com.novanus.medappoint.domain.enumeration.AttachmentType;

import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.Attachment} entity.
 */
public class AttachmentDTO implements Serializable {

    private Long id;

    private AttachmentType attachmentType;

    private String fileName;


    private Long attachmentFileId;

    private Long remarkId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttachmentType getAttachmentType() {
        return attachmentType;
    }

    public void setAttachmentType(AttachmentType attachmentType) {
        this.attachmentType = attachmentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getAttachmentFileId() {
        return attachmentFileId;
    }

    public void setAttachmentFileId(Long attachmentFileId) {
        this.attachmentFileId = attachmentFileId;
    }

    public Long getRemarkId() {
        return remarkId;
    }

    public void setRemarkId(Long remarkId) {
        this.remarkId = remarkId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttachmentDTO)) {
            return false;
        }

        return id != null && id.equals(((AttachmentDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttachmentDTO{" +
                "id=" + getId() +
                ", attachmentType='" + getAttachmentType() + "'" +
                ", fileName='" + getFileName() + "'" +
                ", attachmentFileId=" + getAttachmentFileId() +
                ", remarkId=" + getRemarkId() +
                "}";
    }
}
