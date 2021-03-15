package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.OpeningHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OpeningHours entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpeningHoursRepository extends JpaRepository<OpeningHours, Long> {
}
