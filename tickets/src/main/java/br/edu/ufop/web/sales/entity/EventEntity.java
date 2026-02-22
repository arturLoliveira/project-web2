package br.edu.ufop.web.sales.entity;

import br.edu.ufop.web.sales.entity.base.AuditableEntity;
import br.edu.ufop.web.sales.enums.EventType;
import br.edu.ufop.web.sales.entity.SaleEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "events")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private EventType type;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(name = "startSales", nullable = false)
    private LocalDateTime startSales;

    @Column(name = "endSales", nullable = false)
    private LocalDateTime endSales;

    @Column(nullable = false)
    private Float price;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<SaleEntity> sales = new ArrayList<>();

}