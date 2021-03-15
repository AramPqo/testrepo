package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Country entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    List<Country> findAllByNameContainingIgnoreCase(String name);
}
