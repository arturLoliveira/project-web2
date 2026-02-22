package br.edu.ufop.web.sales.repository;

import br.edu.ufop.web.sales.entity.EventEntity;
import br.edu.ufop.web.sales.enums.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, UUID> {
    // List<EventEntity> findById(UUID id);
    List<EventEntity> findByType(EventType type);
    List<EventEntity> findByDate(LocalDateTime date);
    List<EventEntity> findByEndSales(LocalDateTime endSales);
    List<EventEntity> findByStartSales(LocalDateTime startSales);

}
