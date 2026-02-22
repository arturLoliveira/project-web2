package br.edu.ufop.web.sales.converter;

import br.edu.ufop.web.sales.domain.Sale;
import br.edu.ufop.web.sales.entity.SaleEntity;
import br.edu.ufop.web.sales.converter.EventConverter;
import org.springframework.stereotype.Component;

@Component
public class SaleConverter {

    // Entidade (Banco) -> Domínio (Negócio)
    public Sale toDomain(SaleEntity entity) {
        if (entity == null) return null;

        EventConverter eventConverter = new EventConverter();
        Sale domain = new Sale();
        domain.setId(entity.getId());
        
        if (entity.getUser() != null) {
            domain.setUserId(entity.getUser().getId());
        }
        
        domain.setSaleDate(entity.getSaleDate());
        domain.setSaleStatus(entity.getSaleStatus());
        domain.setCreatedAt(entity.getCreatedAt());
        domain.setUpdatedAt(entity.getUpdatedAt());

        domain.setEvent(eventConverter.toDomain(entity.getEvent()));
        
        return domain;
    }

    // Domínio (Negócio) -> Entidade (Banco)
    public SaleEntity toEntity(Sale domain) {
        if (domain == null) return null;

        SaleEntity entity = new SaleEntity();
        entity.setId(domain.getId());

        entity.setSaleDate(domain.getSaleDate());
        entity.setSaleStatus(domain.getSaleStatus());

        return entity;
    }
}