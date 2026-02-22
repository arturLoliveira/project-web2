package br.edu.ufop.web.sales.service;

import br.edu.ufop.web.sales.converter.UserConverter;
import br.edu.ufop.web.sales.domain.User;
import br.edu.ufop.web.sales.dto.UserDTO;
import br.edu.ufop.web.sales.entity.UserEntity;
import br.edu.ufop.web.sales.exception.ResourceNotFoundException;
import br.edu.ufop.web.sales.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserConverter userConverter;

    // CREATE
    public User createUser(UserDTO userDTO) {
        User domainUser = User.builder()
                .name(userDTO.name())
                .email(userDTO.email())
                .password(userDTO.password())
                .city(userDTO.city())
                .type(userDTO.type())
                .build();

        UserEntity entityToSave = userConverter.toEntity(domainUser);

        UserEntity savedEntity = userRepository.save(entityToSave);

        return userConverter.toDomain(savedEntity);
    }

    // READ (All)
    public List<User> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userConverter::toDomain)
                .collect(Collectors.toList());
    }

    // READ (By Id)
    public User getUserById(UUID id) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + id));
        
        return userConverter.toDomain(entity);
    }
    
    // READ (By Email)
    public User getUserByEmail(String email) {
        UserEntity entity = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado pelo email: " + email));

        return userConverter.toDomain(entity);
    }

    // UPDATE
    public User updateUser(UUID id, UserDTO userDetails) {
        UserEntity entity = userRepository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + id));
        
        entity.setName(userDetails.name());
        entity.setEmail(userDetails.email());
        entity.setPassword(userDetails.password());
        entity.setCity(userDetails.city());
        // entity.setType(userDetails.type());

        UserEntity updatedEntity = userRepository.save(entity);

        return userConverter.toDomain(updatedEntity);
    }

    // DELETE
    public void deleteUser(UUID id) {
        UserEntity entity = userRepository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + id));
        userRepository.delete(entity);
    }
}