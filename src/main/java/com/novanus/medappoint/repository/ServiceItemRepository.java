package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ServiceItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    List<ServiceItem> findByDescriptionContainingIgnoreCase(String description);
}
