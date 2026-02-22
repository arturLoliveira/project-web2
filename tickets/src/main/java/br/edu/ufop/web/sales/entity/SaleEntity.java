package br.edu.ufop.web.sales.entity;


import br.edu.ufop.web.sales.entity.base.AuditableEntity;
import br.edu.ufop.web.sales.enums.SaleStatus;

import br.edu.ufop.web.sales.entity.EventEntity;
import br.edu.ufop.web.sales.entity.UserEntity;

import lombok.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "sales")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    
    @ManyToOne 
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "saleDate", nullable = false)
    private LocalDateTime saleDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "saleStatus", nullable = false)
    private SaleStatus saleStatus;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;

    @PrePersist
    public void beforeSave(){
        this.saleDate = LocalDateTime.now();
    }
}