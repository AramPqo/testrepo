package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Treatment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Treatment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
    Page<Treatment> findByDescriptionContainingIgnoreCase(String name, Pageable pageable);
}
