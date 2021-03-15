package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

/**
 * Spring Data  repository for the Invoice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findByPatientId(Long patientId);

    @Query("SELECT i FROM Invoice i WHERE i.recipientName = :recipient_name")
    public List<Invoice> findByRecipient(@Param("recipient_name") String recipientName);

    @Query("SELECT i FROM Invoice i WHERE i.createdAt >= :start_date AND i.createdAt <= :end_date")
    public List<Invoice> findByDate(@Param("start_date") Instant startDate, @Param("end_date") Instant endDate);

    @Query("SELECT i FROM Invoice i WHERE i.createdAt >= :start_date AND i.createdAt <= :end_date AND i.recipientName = :recipient_name")
    public List<Invoice> findByDateAndRecipient(@Param("start_date") Instant startDate, @Param("end_date") Instant endDate, @Param("recipient_name") String recipientName);
}
