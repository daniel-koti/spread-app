# Spread App

Plataforma de divulgação de eventos

## (Requisitos funcionais)
- O que o usuário vai poder fazer

- [x] Deve ser possível criar conta para organizadores de evento
- [x] Deve ser possível criar usuário
- [x] Deve ser possível criar uma carteira
- [x] Toda conta, exceto o administrador, deve ter uma carteira para transações na plataforma 
- [x] Deve ser possível buscar perfil de usuário | organizador
- [x] Deve ser possível buscar usuário | organizador pela carteira
- [x] Deve ser possível buscar carteira pelo ID
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível criar evento
- [x] Deve ser possível pesquisar evento
- [x] Deve ser possível filtrar eventos por categoria
- [x] Deve ser possível filtrar eventos por organizador
- [x] Deve ser possível alterar informações do evento
- [x] Deve ser possível cadastrar bilhetes para eventos
- [x] Deve ser possível divulgar um evento
- [x] Deve ser possível carregar a carteira
- [x] Deve ser possível comprar ticket 
- [ ] Deve ser possível fazer sign out
- [x] Deve ser possível se autenticar (Organizador | Usuário)
- [x] Deve ser possível filtrar transações de uma conta (walletId)
- [ ] Deve ser possível buscar evento pelo ticket
- [ ] Deve ser possível alterar informações do usuário
- [ ] Deve ser possível desabilitar um evento
- [ ] Deve ser possível bloquear conta do usuário


## (Regras de negócio)
- As condições que uma funcionalidade pode acontecer

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Só o administrador pode bloquear uma conta de usuário/organizador
- [ ] Um administrador pode bloquear um evento
- [x] Só um organizador pode criar um evento
- [ ] O organizador só pode ver, alterar informações de eventos que ele mesmo criou.
- [ ] Um usuário não pode comprar bilhetes se tiver a sua conta bloqueada
- [ ] Um organizador não pode divulgar eventos se tiver a sua conta bloqueada
- [x] O organizador não pode comprar bilhetes
- [ ] Um admin pode invalidar um carregamento suspeito
- [x] Uma transação de compra de bilhete, deve gerar uma referência


## (Requisitos não funcionais)

- Estratégias para chegar ao resultado previsto.

- [x] As senhas do usuário/organizador/admin precisam estar criptografadas  
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Uma conta deve ser identificada por um JWT (JSON Web Token) 


## Docker
  - docker compose up -d
  - prisma migrate dev