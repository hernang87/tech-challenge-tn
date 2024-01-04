# Challenge Hernan G
## Prerequisites
- Yarn should be installed
- Docker and Docker Compose should be installed
## How to run the challenge
By default, the challenge will run on port `1234`, if you want to change it simply edit the `.env` file at the root of the project.

1. Clone the repository
2. Run `cd nodejs`
3. Run `docker-compose up` to bring the microservices up
4. Open a new terminal and go to the repository's folder
5. Run `cd nodejs`
6. Run `yarn start` to bring the API up

### Endpoints

- Create a transaction:
  - `POST http://localhost:1234/transaction`
  - Payload example:
  ```
  {
    "value": "100",
    "description": "T-Shirt Black/M",
    "method": "debit_card",
    "cardNumber": "374245455400126",
    "cardHolderName": "Fonsi Julian",
    "cardExpirationDate": "04/28",
    "cardCvv": "290"
  }
  ```
- Get payables report
  - `GET http://localhost:1234/payable`
 
## Troubleshooting
The following error means Docker isn't running
```
{
    "error": "connect ECONNREFUSED 0.0.0.0:8080"
}
```
