# Tech Challenge
O desafio consiste em implementar novas **API's** para trabalhar com as transações de nossos merchants (vendedores),
para isso vamos utilizar algumas API's disponíveis nesse repositório.

## Nós precisamos que você implemente:

1. Um endpoint para processar transações de um determinado merchant (vendedor)

1.1 Uma transação deve conter pelo menos:
    * O valor total da transação, formatado em string decimal
    * Descrição da transação, por exemplo "T-Shirt Black M"
    * Método de pagamento: **debit_card** ou **credit_card**
    * O número do cartão (devemos armazenar e retornar somente os últimos 4 dígitos do cartão, por ser uma informação sensível)
    * O nome do dono do cartão
    * Data de Expiração
    * CVV do cartão

1.2 Ao criar uma transação, também deve ser criado um recebível do merchant (payables), com as seguintes regras de negócio:
    * Transação **Debit card**:
      * O payable deve ser criado com **status = paid**, indicando que o merchant irá receber o valor
      * O payable deve ser criado com a data igual a data de criação (D + 0).

    * Transação **Credit card**:
      * O payable deve ser criado com **status = waiting_funds**, indicando que o merchant irá receber esse valor no futuro
      * O Payable deve ser criado com a data igual a data de criação da transação  + 30 dias (D + 30)

1.2.1 Ao criar payables, devemos descontar uma taxa de processamento (chamada de `fee`). Considere **2%** para transações **debit_card**
e **4%** para transações **credit_card**. Exemplo: Quando um payable é criado no valor de R$ 100,00 a partir de uma transação **credit_card**  ele receberá R$ 96,00.

2. Um endpoint que retorne uma lista de todas as transações por merchant

3. Um endpoint que calcule o total de Recebíveis (payables) do merchant por período, a resposta deve conter:
  * Valor total de recebíveis
  * Valor a receber para o futuro
  * Total cobrado de taxa 

## Importante
Não utilizaremos banco de dados nesta aplicação. Todas as informações deverão ser armazenadas na **Mock API** que está no docker deste projeto. Você consumirá os endpoints do container como microsserviços

## Extra
- Você pode utilizar qualquer linguagem de programação (recomendamos que utilize a que você possui maior familiaridade), frameworks e biblioteca
- É um diferencial que pelo menos a lógica principal seja testada



# Instalação
Requisito é ter docker em sua máquina para rodar nossa API de mock:

```
docker-compose up
```


## Mock API
Com o serviço executando você poderá utilizar as seguintes API's:

---

## Transactions
Listagem de `transactions` registradas
`GET http://0.0.0.0:8080/transactions`

Carregamento de uma `transaction` específica
`GET http://0.0.0.0:8080/transactions/:id`

Criação de `transactions`
`POST http://0.0.0.0:8080/transactions`

Remoção de `transaction` por ID
`DELETE http://0.0.0.0:8080/transactions/:id`

---

## Payables
Listagem de `payables` registradas
`GET http://0.0.0.0:8080/payables`

Carregamento de uma `transaction` específica
`GET http://0.0.0.0:8080/payables/:id`

Criação de `payables`
`POST http://0.0.0.0:8080/payables`

Remoção de `transaction` por ID
`DELETE http://0.0.0.0:8080/payables/:id`
