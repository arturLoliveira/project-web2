package br.edu.ufop.web.sales.dto;

import java.util.UUID;

public record CreateUserDTO(String name,
                            String email,
                            String password,
                            String city) {
}