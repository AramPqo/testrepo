package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Attachment;
import com.novanus.medappoint.service.dto.AttachmentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Attachment} and its DTO {@link AttachmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {AttachmentFileMapper.class, RemarkMapper.class})
public interface AttachmentMapper extends EntityMapper<AttachmentDTO, Attachment> {

    @Mapping(source = "attachmentFile.id", target = "attachmentFileId")
    @Mapping(source = "remark.id", target = "remarkId")
    AttachmentDTO toDto(Attachment attachment);

    @Mapping(source = "attachmentFileId", target = "attachmentFile")
    @Mapping(source = "remarkId", target = "remark")
    Attachment toEntity(AttachmentDTO attachmentDTO);

    default Attachment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Attachment attachment = new Attachment();
        attachment.setId(id);
        return attachment;
    }
}
