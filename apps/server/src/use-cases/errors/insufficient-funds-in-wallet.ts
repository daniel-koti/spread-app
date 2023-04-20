export class InsufficientFundsInWalletError extends Error {
  constructor() {
    super('Insufficient funds in wallet')
  }
}
