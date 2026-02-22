package br.edu.ufop.web.sales.repository;

import br.edu.ufop.web.sales.entity.SaleEntity;
import br.edu.ufop.web.sales.enums.SaleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Repository
public interface SaleRepository extends JpaRepository<SaleEntity, UUID> {
    // List<SaleEntity> findById(UUID id);
    List<SaleEntity> findByUserId(UUID userId);
    List<SaleEntity> findByEventId(UUID eventId);
    List<SaleEntity> findBySaleStatus(SaleStatus status);
}