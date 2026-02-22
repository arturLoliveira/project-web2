package br.edu.ufop.web.sales.domain;

import br.edu.ufop.web.sales.enums.EventType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class Event {
    
    private UUID id;
    private String description;
    private EventType type;
    private LocalDateTime date;
    private LocalDateTime startSales;
    private LocalDateTime endSales;
    private Float price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<Sale> sales;
}