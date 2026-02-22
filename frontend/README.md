# 🎟️ Ticket-Sales | Frontend Application

Este repositório contém a interface Web desenvolvida para consumir a API de venda de ingressos criada em **Spring Boot**. O projeto faz parte das atividades práticas da disciplina de Desenvolvimento Web e utiliza um **Spring Cloud Gateway** para centralizar a comunicação com o backend.

A aplicação é dividida em dois grandes módulos: um **Painel Administrativo** para gestão de recursos e uma **Área do Cliente** para compra e acompanhamento de ingressos.

---

## 🛠️ Tecnologias e Ferramentas

Para garantir uma interface reativa e componentes modulares, foram utilizadas as seguintes tecnologias:

* **React + Vite**: Para um ambiente de desenvolvimento rápido e otimizado.
* **Shadcn/ui**: Biblioteca de componentes para manter a consistência visual.
* **Tailwind CSS**: Estilização baseada em utilitários.
* **ESLint**: Padronização e qualidade do código.
* **Prisma**: Configurado para integração com o banco de dados PostgreSQL.

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos
A aplicação depende da API e do banco de dados (PostgreSQL) rodando. O setup recomendado é via **Docker**.

### 1. Subindo a Infraestrutura
Acesse a pasta `/docker` no terminal e execute o comando para buildar e subir os containers:
```bash
docker compose -f docker-compose-dev.yml up --build