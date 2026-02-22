package br.edu.ufop.web.sales.dto;

import br.edu.ufop.web.sales.enums.SaleStatus;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SaleDTO(
        @NotNull(message = "ID do usuário é obrigatório")
        UUID userId,

        @NotNull(message = "ID do evento é obrigatório")
        UUID eventId,

        @NotNull(message = "Status da venda é obrigatório")
        SaleStatus saleStatus
) {

        
}