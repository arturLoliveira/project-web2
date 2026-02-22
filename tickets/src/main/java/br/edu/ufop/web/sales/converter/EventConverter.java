package br.edu.ufop.web.sales.converter;

import br.edu.ufop.web.sales.domain.Event;
import br.edu.ufop.web.sales.entity.EventEntity;
import org.springframework.stereotype.Component;

@Component
public class EventConverter {

    public Event toDomain(EventEntity entity) {
        if (entity == null) return null;

        Event domain = new Event();
        domain.setId(entity.getId());
        domain.setDescription(entity.getDescription());
        domain.setType(entity.getType());
        domain.setDate(entity.getDate());
        domain.setStartSales(entity.getStartSales());
        domain.setEndSales(entity.getEndSales());
        domain.setPrice(entity.getPrice());
        domain.setCreatedAt(entity.getCreatedAt());
        domain.setUpdatedAt(entity.getUpdatedAt());

        return domain;
    }


    public EventEntity toEntity(Event domain) {
        if (domain == null) return null;

        EventEntity entity = new EventEntity();
        entity.setId(domain.getId());
        entity.setDescription(domain.getDescription());
        entity.setType(domain.getType());
        entity.setDate(domain.getDate());
        entity.setStartSales(domain.getStartSales());
        entity.setEndSales(domain.getEndSales());
        entity.setPrice(domain.getPrice());

        return entity;
    }
}