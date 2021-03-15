package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Business entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findFirstByOrderByIdAsc();

    @Query("update Business set invoiceNumber = :invoice_number where name = :invoice_number")
    Long updateBusinessInvoiceNumber(@Param("invoice_number") Long invoiceNumber);
}
