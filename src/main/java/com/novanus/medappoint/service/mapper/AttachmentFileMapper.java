package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.AttachmentFile;
import com.novanus.medappoint.service.dto.AttachmentFileDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link AttachmentFile} and its DTO {@link AttachmentFileDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AttachmentFileMapper extends EntityMapper<AttachmentFileDTO, AttachmentFile> {


    default AttachmentFile fromId(Long id) {
        if (id == null) {
            return null;
        }
        AttachmentFile attachmentFile = new AttachmentFile();
        attachmentFile.setId(id);
        return attachmentFile;
    }
}
