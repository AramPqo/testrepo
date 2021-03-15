package com.novanus.medappoint.service.dto;

import javax.persistence.Lob;
import java.io.Serializable;

/**
 * A DTO for the {@link com.novanus.medappoint.domain.AttachmentFile} entity.
 */
public class AttachmentFileDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] file;

    private String fileContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttachmentFileDTO)) {
            return false;
        }

        return id != null && id.equals(((AttachmentFileDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttachmentFileDTO{" +
                "id=" + getId() +
                ", file='" + getFile() + "'" +
                "}";
    }
}
