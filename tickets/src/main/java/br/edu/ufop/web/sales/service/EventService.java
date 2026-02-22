package br.edu.ufop.web.sales.service;

import br.edu.ufop.web.sales.converter.EventConverter;
import br.edu.ufop.web.sales.domain.Event;
import br.edu.ufop.web.sales.dto.EventDTO;

import br.edu.ufop.web.sales.exception.ResourceNotFoundException;
import br.edu.ufop.web.sales.entity.EventEntity;
import br.edu.ufop.web.sales.repository.EventRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final EventConverter eventConverter;

    // CREATE
    public Event createEvent(EventDTO eventDTO) {
        Event event = new Event();
        
        event.setDescription(eventDTO.description());
        event.setType(eventDTO.type());
        event.setDate(eventDTO.date());
        event.setStartSales(eventDTO.startSales());
        event.setEndSales(eventDTO.endSales());
        event.setPrice(eventDTO.price());

        EventEntity entityToSave = eventConverter.toEntity(event);
    
        EventEntity savedEntity = eventRepository.save(entityToSave);
    
        return eventConverter.toDomain(savedEntity);
    }

    // READ (All)
    public List<Event> getAllEvents() {
        List<EventEntity> entities = eventRepository.findAll();
        
        return entities.stream()
                .map(eventConverter::toDomain)
                .collect(Collectors.toList());
    }

    // READ (By Id)
    public Event getEventById(UUID id) {
        EventEntity entity = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com id: " + id));
        
        return eventConverter.toDomain(entity);
    }

    // UPDATE
    public Event updateEvent(UUID id, EventDTO eventDetails) {
        EventEntity entity = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com id: " + id));

        entity.setDescription(eventDetails.description());
        entity.setType(eventDetails.type());
        entity.setDate(eventDetails.date());
        entity.setStartSales(eventDetails.startSales());
        entity.setEndSales(eventDetails.endSales());

        entity.setPrice(eventDetails.price());
        EventEntity updatedEntity = eventRepository.save(entity);
        
        return eventConverter.toDomain(updatedEntity);
    }

    // DELETE
    public void deleteEvent(UUID id) {
        EventEntity entity = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com id: " + id));
        eventRepository.delete(entity);
    }
}