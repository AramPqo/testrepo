package com.novanus.medappoint.repository;

import com.novanus.medappoint.domain.AttachmentFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AttachmentFile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttachmentFileRepository extends JpaRepository<AttachmentFile, Long> {
}
