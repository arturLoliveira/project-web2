package br.edu.ufop.web.sales.dto;

import br.edu.ufop.web.sales.enums.EventType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public record EventDTO(
        @NotBlank(message = "Descrição é obrigatória")
        String description,

        @NotNull(message = "Tipo é obrigatório")
        EventType type,

        @NotNull(message = "Data do evento é obrigatória")
        @Future(message = "Data do evento deve ser no futuro")
        LocalDateTime date,

        @NotNull(message = "Data de início das vendas é obrigatória")
        LocalDateTime startSales,

        @NotNull(message = "Data de fim das vendas é obrigatória")
        LocalDateTime endSales,

        @NotNull(message = "Preço é obrigatório")
        @Positive(message = "Preço deve ser positivo")
        Float price
) {
}