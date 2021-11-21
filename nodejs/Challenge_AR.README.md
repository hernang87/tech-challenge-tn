# The challenge
Your challenge is to build a new API to manage payments transactions of our merchants. 

## Functional requirements
We need to create a new API to manage payments transactions applying a fee of our merchants. That been said, we need:
- Create models for: payments transactions, fees.
- Endpoint to create and list all payment transactions for a given merchant.
- Filter and sum payments transactions and fees by a period.
- Save and return only the last 4 digits of the card.

## Considerations
* Endpoints to process payments transactions and return the list of all transactions created for a given merchant. 
* A payment transaction must contains at least:
  * The gross amount of the transaction, in a decimal formatted string.
  * Description of the transaction, for example: “T-Shirt Black/M”
  * The payment method: debit_card or credit_card
  * The card number, cardholder name, card expiration date and card verification code (CVV).
* As the card number is sensitive information, we must store and return only the last 4 digits of the card.
* Create merchant receivables (payables), following the business requirements:
  * Debit card transaction:
    * The payable must be created with status = paid, indicating that the merchant has already received this amount.
    * The payable must be created with the payment date equal to the date of creation of the transaction (D + 0).
  * Credit card transaction:
    * The payable must be created with status = waiting_funds, indicating that the merchant will receive this amount in the future.
    * The payable must be created with the payment date equal to the date of creation of the transaction + 30 days (D + 30).
* When the payables are created, the processing fee must be discounted. Consider 2% of fee for debit card transactions and 4% for credit card transactions. Example: when a merchant processes $ 100,00 from a credit card transaction, he will receive $ 96,00. 
* We also need an endpoint that returns the total receivable (payables) from all merchants by a period and an endpoint that returns the total fee by a period.

## Technical requirements
  * RESTFul API with NodeJS
  * Best practices
    * Use OOP instead of multiple if / else or switch / case statements.
    * SOLID, DRY code.
  * Error handling
    * HTTP status code
    * Handle exceptions to show expected error messages to the client
  * Unit testing
  * Observability
    * Logging (Plus)
  * Technically explain requirements that weren’t completed on time.
  * Use the Json Server to persist transaction information

# Instalación
El requisito es tener Docker en su máquina para ejecutar nuestra API simulada:

```
docker-compose up
```

## Transactions
Listar `transactions` registradas
`GET http://0.0.0.0:8080/transactions`

Obtener una `transaction` específica
`GET http://0.0.0.0:8080/transactions/:id`

Crear `transactions`
`POST http://0.0.0.0:8080/transactions`

Eliminar `transaction` por ID
`DELETE http://0.0.0.0:8080/transactions/:id`
