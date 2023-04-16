# Spread App

Plataforma de divulgação de eventos

## (Requisitos funcionais)
- O que o usuário vai poder fazer

- [ ] Deve ser possível criar conta para organizadores de evento
- [ ] Deve ser possível criar conta como cliente
- [ ] Deve ser possível se autenticar (Organizador | Cliente | Administrador)
- [ ] Deve ser possível fazer sign out
- [ ] Toda conta, exceto o administrador, deve ter uma carteira para transações na plataforma 
- [ ] Deve ser possível criar evento
- [ ] Deve ser possível pesquisar evento
- [ ] Deve ser possível filtrar eventos por categoria
- [ ] Deve ser possível desabilitar um evento
- [ ] Deve ser possível cadastrar bilhetes para eventos
- [ ] Deve ser possível divulgar um evento
- [ ] Deve ser possível comprar bilhetes 
- [ ] Deve ser possível alterar informações do evento
- [ ] Deve ser possível alterar informações do usuário
- [ ] Deve ser possível bloquear conta do usuário
- [ ] Deve ser possível carregar a carteira
- [ ] Deve ser possível buscar carteira pelo Id do responsável
- [ ] Deve ser possível buscar usuário | organizador pela carteira
- [ ] Deve ser possível buscar evento pelo Bilhete
- [ ] Deve ser possível filtrar transações feitas pelo Id da carteira (Income | Divulgações | Pagamento)


## (Regras de negócio)
- As condições que uma funcionalidade pode acontecer

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Só o administrador pode bloquear uma conta de usuário/organizador
- [ ] Um administrador pode bloquear um evento
- [ ] Só um organizador pode criar um evento
- [ ] O organizador só pode ver, alterar informações de eventos que ele mesmo criou.
- [ ] Um usuário não pode comprar bilhetes se tiver a sua conta bloqueada
- [ ] Um organizador não pode divulgar eventos se tiver a sua conta bloqueada
- [ ] O organizador não pode comprar bilhetes
- [ ] O usuário só pode comprar 1 bilhete por cada evento
- [ ] Um admin pode invalidar um carregamento suspeito
- [ ] Uma transação de compra de bilhete, deve gerar uma referência


## (Requisitos não funcionais)

- Estratégias para chegar ao resultado previsto.

- [ ] As senhas do usuário/organizador/admin precisam estar criptografadas  
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Uma conta deve ser identificada por um JWT (JSON Web Token) 


## Docker
  - docker compose up -d
  - prisma migrate dev