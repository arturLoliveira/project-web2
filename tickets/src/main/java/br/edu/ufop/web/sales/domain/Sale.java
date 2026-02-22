package br.edu.ufop.web.sales.domain;

import br.edu.ufop.web.sales.enums.SaleStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class Sale {
    
    private UUID id;
    private UUID userId;
    private LocalDateTime saleDate;
    private SaleStatus saleStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    private Event event;
}