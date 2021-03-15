package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.Remark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Remark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RemarkRepository extends JpaRepository<Remark, Long> {

    List<Remark> findByPatientId(Long patientId);
}
