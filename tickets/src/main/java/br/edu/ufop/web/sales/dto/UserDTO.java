package br.edu.ufop.web.sales.dto;

import br.edu.ufop.web.sales.enums.EnumUserType;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record UserDTO(
    UUID id,
    @NotNull String name,
    @NotNull String email,
    @NotNull String password,
    @NotNull String city,
    EnumUserType type
) {}