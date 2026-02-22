# Ticket Sales

Repositório da atividade prática da disciplina de Sistemas WEB II (CSI607). O projeto é um serviço de venda de ingressos que desenvolvi ao longo da disciplina.

**Aluno**: Artur Linhares de Oliveira - 20.1.8022

## Atividade Prática 1 - Microsserviço de Vendas de Ingressos

Nessa atividade implementei o microsserviço de vendas (`Sales`) utilizando **Spring Boot**. O serviço é responsável por gerenciar eventos e vendas de ingressos, com autenticação por tipo de usuário (ADMIN e CUSTOMER).

A descrição detalhada dos endpoints está no `README.md` dentro da pasta `tickets`.

## Como rodar o projeto

Antes de tudo, certifique que o **Docker Desktop** está aberto e rodando. Depois, entre na pasta `docker` e execute:

```bash
docker-compose -f docker-compose-dev.yml up --build
```

