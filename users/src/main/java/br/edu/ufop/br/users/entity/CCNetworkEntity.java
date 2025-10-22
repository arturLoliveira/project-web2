package br.edu.ufop.br.users.entity;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CCNetworkEntity {
    private UUID uuid;
    private String name;
}




