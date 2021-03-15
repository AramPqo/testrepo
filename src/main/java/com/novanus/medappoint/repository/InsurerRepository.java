package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Insurer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Insurer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InsurerRepository extends JpaRepository<Insurer, Long> {

    List<Insurer> findAllByNameContainingIgnoreCaseOrAbbrContainingIgnoreCase(String name, String abbr);
}
