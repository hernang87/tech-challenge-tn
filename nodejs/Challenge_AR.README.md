# The challenge
Your challenge is to build a new API to manage payments transactions of our merchants. 

## Functional requirements
We want a RESTful API to process payments transactions applying a fee and return the list of all transactions. That being said, we need:
- Endpoints to process payments transactions applying a fee.
- Endpoints that return the list of all transactions created for a given merchant.
- Endpoint that returns the total fee charged to a merchant for a period.

## Considerations
  * A payment transaction must contains at least: 
    * The gross amount of the transaction, in a decimal formatted string. 
    * Description of the transaction, for example: “T-Shirt Black/M”
    * The payment method: **debit_card** or **credit_card**
    *The card number, cardholder name, card expiration date and card verification code (CVV).
  * As the card number is sensitive information, we must store and return only the last 4 digits of the card.
  * Create merchant receivables (payables), following the business requirements:
    * **Debit card** transaction:
      * The payable must be created with **status = paid**, indicating that the merchant has already received this amount.
      * The payable must be created with the payment date equal to the date of creation of the transaction (D + 0).
    * **Credit card** transaction:
      * The payable must be created with **status = waiting_funds**, indicating that the merchant will receive this amount in the future.
      * The payable must be created with the payment date equal to the date of creation of the transaction + 30 days (D + 30).
  * When the payables are created, the processing fee must be discounted. Consider 2% of fee for **debit card** transactions and 4% for **credit card** transactions. Example: when a merchant processes $ 100,00 from a credit card transaction, he will receive $ 96,00. 
  * If there’s no payments transactions, the response should be an empty list;
  * You **must** use the Acceptance Criteria to write **unit tests**.

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

## Acceptance Criteria
1. When a credit card payment is processed, the processing fee (Consider 4% of fee) must be discounted from the total amount.
  * Payment request
    * Merchant: 1
    * Amount: $480.50
    * Payment method: credit_card
    * Description: T-Shirt Black/M
    * Credit card number: 470455000451123      
    * Credit card expiration date YYYYMM: 202510 
    * Credit card CVV: 123
    * Credit card holder: Juan Perez	

  * Expected response
    * Merchant: 1
    * Amount: $480.50
    * Transaction Fee: $19.22
    * Status: waiting_funds
    * Payment method: credit_card
    * Description: T-Shirt Black/M
    * Payment date: Hoy + 30 díasÇ
    * Credit card number: 1234
    * Credit card expiration date YYYYMM: 202510
    * Credit card CVV: 123
    * Credit card holder: Juan Perez

2. When a debit card payment is processed, the processing fee (Consider 2% of fee) must be discounted from the total amount.
  * Payment request
    * Merchant: 1
    * Amount: $950.10
    * Payment method: debit_card
    * Description: T-Shirt Black/M
    * Credit card number: 1234123412344321
    * Credit card expiration date YYYYMM: 202601
    * Credit card CVV: 999
    * Credit card holder: Ramon Castillo

  * Expected response
    * Merchant: 1
    * Amount: $950.10
    * Transaction Fee: $19.00
    * Status: paid
    * Payment method: debit_card
    * Description: T-Shirt Black/M
    * Payment date: Hoy
    * Credit card number: 4321
    * Credit card expiration date YYYYMM: 202601
    * Credit card CVV: 999
    * Credit card holder: Ramon Castillo

3. When requesting the transactions for a given merchant, then must show the detail of all transactions created for this merchant
  * Request
    * Merchant: 1

  * Expected response: List of payments transactions for the merchant
    * Merchant: 1
    * Amount
    * Status
    * Transaction Fee
    * Payment method
    * Description
    * Payment date
    * Credit card number
    * Credit card expiration date
    * Credit card CVV
    * Credit card holder

4. When requesting the fee charged to a merchant for a period, then must show the total fee charged to this merchant in the period.
  * Request
    * Merchant: 1
    * Period: YYYYMM 

  * Expected response
    * Merchant: 1
    * Total Transaction Fee
    * Period

# Instalación
El requisito es tener Docker en su máquina para ejecutar nuestra API simulada:

```
docker-compose up
```
