package br.edu.ufop.web.sales.service;

import br.edu.ufop.web.sales.converter.SaleConverter;
import br.edu.ufop.web.sales.domain.Sale;
import br.edu.ufop.web.sales.dto.SaleDTO;
import br.edu.ufop.web.sales.entity.EventEntity;
import br.edu.ufop.web.sales.entity.SaleEntity;
import br.edu.ufop.web.sales.entity.UserEntity;
import br.edu.ufop.web.sales.exception.ResourceNotFoundException;
import br.edu.ufop.web.sales.repository.EventRepository;
import br.edu.ufop.web.sales.repository.SaleRepository;
import br.edu.ufop.web.sales.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final SaleConverter saleConverter;

    // CREATE
    public Sale createSale(SaleDTO saleDTO) {
        EventEntity event = eventRepository.findById(saleDTO.eventId())
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado: " + saleDTO.eventId()));

        UserEntity user = userRepository.findById(saleDTO.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + saleDTO.userId()));

        SaleEntity saleEntity = new SaleEntity();
        saleEntity.setEvent(event);
        saleEntity.setUser(user);
        saleEntity.setSaleStatus(saleDTO.saleStatus());
        saleEntity.setSaleDate(LocalDateTime.now());

        SaleEntity saved = saleRepository.save(saleEntity);
        return saleConverter.toDomain(saved);
    }

    // READ (All)
    public List<Sale> getAllSales() {
        return saleRepository.findAll()
                .stream()
                .map(saleConverter::toDomain)
                .collect(Collectors.toList());
    }

    // READ (By Id)
    public Sale getSaleById(UUID id) {
        SaleEntity entity = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venda não encontrada: " + id));
        return saleConverter.toDomain(entity);
    }

    // READ (By User Id)
    public List<Sale> getSalesByUserId(UUID userId) {
        List<SaleEntity> sales = saleRepository.findByUserId(userId);
        
        return sales.stream()
                .map(saleConverter::toDomain)
                .collect(Collectors.toList());
    }

    // UPDATE
    public Sale updateSale(UUID id, SaleDTO saleDetails) {
        SaleEntity sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venda não encontrada: " + id));

        if (!sale.getEvent().getId().equals(saleDetails.eventId())) {
            EventEntity newEvent = eventRepository.findById(saleDetails.eventId())
                    .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado: " + saleDetails.eventId()));
            sale.setEvent(newEvent);
        }

        if (!sale.getUser().getId().equals(saleDetails.userId())) {
            UserEntity newUser = userRepository.findById(saleDetails.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + saleDetails.userId()));
            sale.setUser(newUser);
        }

        sale.setSaleStatus(saleDetails.saleStatus());
        
        SaleEntity updated = saleRepository.save(sale);
        return saleConverter.toDomain(updated);
    }

    // DELETE
    public void deleteSale(UUID id) {
        SaleEntity sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venda não encontrada: " + id));
        saleRepository.delete(sale);
    }
}