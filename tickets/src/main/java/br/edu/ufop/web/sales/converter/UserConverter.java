package br.edu.ufop.web.sales.converter;

import br.edu.ufop.web.sales.domain.User;
import br.edu.ufop.web.sales.dto.UserDTO;
import br.edu.ufop.web.sales.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    // Entidade (Banco) -> Domínio (Negócio)
    public User toDomain(UserEntity entity) {
        if (entity == null) return null;
        
        return User.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .password(entity.getPassword())
                .city(entity.getCity())
                .type(entity.getType())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    // Domínio (Negócio) -> Entidade (Banco)
    public UserEntity toEntity(User domain) {
        if (domain == null) return null;

        return UserEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .email(domain.getEmail())
                .password(domain.getPassword())
                .city(domain.getCity())
                .type(domain.getType())
                .build();
    }

    // Domínio (Negócio) -> DTO (JSON)
    public UserDTO toDTO(User domain) {
        if (domain == null) return null;
        
        return new UserDTO(
            domain.getId(),
            domain.getName(),
            domain.getEmail(),
            domain.getPassword(),
            domain.getCity(),
            domain.getType()
        );
    }
}