package br.edu.ufop.web.sales.domain;

import br.edu.ufop.web.sales.enums.EnumUserType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    private UUID id;
    private String name;
    private String email;
    private String password;
    private String city;


    private EnumUserType type;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;



}