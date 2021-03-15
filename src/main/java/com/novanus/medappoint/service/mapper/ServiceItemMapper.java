package com.novanus.medappoint.service.mapper;


import com.novanus.medappoint.domain.ServiceItem;
import com.novanus.medappoint.service.dto.ServiceItemDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link ServiceItem} and its DTO {@link ServiceItemDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceItemMapper extends EntityMapper<ServiceItemDTO, ServiceItem> {

    ServiceItemDTO toDto(ServiceItem serviceItem);

    ServiceItem toEntity(ServiceItemDTO serviceItemDTO);

    default ServiceItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceItem serviceItem = new ServiceItem();
        serviceItem.setId(id);
        return serviceItem;
    }
}
