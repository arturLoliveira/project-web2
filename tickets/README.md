# Ticket Sales: API do Microsserviço de Vendas

Aqui estão documentados os endpoints do microsserviço de vendas que desenvolvi. O serviço roda na porta `4000`.

**URL Base:** `http://localhost:4000`

---

## Usuários (`/users`)

Representa os usuários do sistema, que podem ser clientes ou administradores.

### Criar Usuário
- **Método:** `POST /users`
- **Body:**
  ```json
  {
    "name": "Fulana da Silva",
    "email": "fulana@example.com",
    "password": "senha123",
    "city": "São Paulo"
  }
  ```

### Listar todos os Usuários
- **Método:** `GET /users`
- **Resposta:** `200 OK` com array de usuários.

### Buscar Usuário por ID
- **Método:** `GET /users/{id}`
- **Resposta:** `200 OK` com o usuário, ou `404 NOT FOUND` se não existir.

### Atualizar Usuário
- **Método:** `PUT /users/{id}`
- **Body:**
  ```json
  {
    "name": "Novo Nome",
    "email": "novo@email.com",
    "password": "nova_senha",
    "city": "Rio de Janeiro",
    "type": "ADMIN"
  }
  ```
- **Resposta:** `200 OK` com o usuário atualizado, ou `404 NOT FOUND` se não existir.

### Deletar Usuário
- **Método:** `DELETE /users/{id}`
- **Resposta:** `204 NO CONTENT`, ou `404 NOT FOUND` se não existir.

---

## Eventos (`/events`)

Gerencia os eventos disponíveis para venda de ingressos.

### Criar Evento
- **Método:** `POST /events`
- **Body:**
  ```json
  {
    "description": "Show da Banda X",
    "type": "SHOW",
    "date": "2026-12-25T20:00:00",
    "startSales": "2026-11-01T09:00:00",
    "endSales": "2026-12-24T23:59:59",
    "price": 150.75
  }
  ```
- **Resposta:** `201 CREATED` com o evento criado.

### Listar todos os Eventos
- **Método:** `GET /events`
- **Resposta:** `200 OK` com array de eventos.

### Buscar Evento por ID
- **Método:** `GET /events/{id}`
- **Resposta:** `200 OK` com o evento, ou `404 NOT FOUND` se não existir.

### Atualizar Evento
- **Método:** `PUT /events/{id}`
- **Body:** mesmo formato da criação.
- **Resposta:** `200 OK` com o evento atualizado, ou `404 NOT FOUND` se não existir.

### Deletar Evento
- **Método:** `DELETE /events/{id}`
- **Resposta:** `204 NO CONTENT`, ou `404 NOT FOUND` se não existir.

---

## Vendas (`/sales`)

Registra a compra de um ingresso por um usuário para um evento.

### Criar Venda
- **Método:** `POST /sales`
- **Body:**
  ```json
  {
    "userId": "uuid-do-usuario",
    "eventId": "uuid-do-evento",
    "saleStatus": "EM_ABERTO"
  }
  ```
- **Resposta:** `201 CREATED` com a venda criada, ou `404 NOT FOUND` se o evento não existir.

### Listar todas as Vendas
- **Método:** `GET /sales`
- **Resposta:** `200 OK` com array de vendas.

### Buscar Venda por ID
- **Método:** `GET /sales/{id}`
- **Resposta:** `200 OK` com a venda, ou `404 NOT FOUND` se não existir.

### Listar Vendas por Usuário
- **Método:** `GET /sales/user/{userId}`
- **Resposta:** `200 OK` com array de vendas do usuário.

### Atualizar Venda
- **Método:** `PUT /sales/{id}`
- **Body:**
  ```json
  {
    "userId": "uuid-do-usuario",
    "eventId": "uuid-do-evento",
    "saleStatus": "PAGO"
  }
  ```
- **Resposta:** `200 OK` com a venda atualizada, ou `404 NOT FOUND` se não existir.

### Deletar Venda
- **Método:** `DELETE /sales/{id}`
- **Resposta:** `204 NO CONTENT`, ou `404 NOT FOUND` se não existir.