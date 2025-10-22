package br.edu.ufop.br.users.domain;

import lombok.*;

import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CCNetworkDomain {

    private UUID uuid;
    private String name;


}
