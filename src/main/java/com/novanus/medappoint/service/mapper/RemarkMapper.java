package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.Remark;
import com.novanus.medappoint.service.dto.RemarkDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Remark} and its DTO {@link RemarkDTO}.
 */
@Mapper(componentModel = "spring", uses = {PatientMapper.class})
public interface RemarkMapper extends EntityMapper<RemarkDTO, Remark> {

    @Mapping(source = "patient.id", target = "patientId")
    RemarkDTO toDto(Remark remark);

    @Mapping(target = "attachments", ignore = true)
    @Mapping(target = "removeAttachments", ignore = true)
    @Mapping(source = "patientId", target = "patient")
    Remark toEntity(RemarkDTO remarkDTO);

    default Remark fromId(Long id) {
        if (id == null) {
            return null;
        }
        Remark remark = new Remark();
        remark.setId(id);
        return remark;
    }
}
