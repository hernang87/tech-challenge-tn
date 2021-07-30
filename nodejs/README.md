# Tech Challenge
O desafio consiste em implementar novas **API's** para trabalhar com as transações de nossos merchants (vendedores),
para isso vamos utilizar algumas API's disponíveis nesse repositório.

## Nós precisamos que você implemente:

1. Um endpoint para processar pagamentos, transações e retornar a lista de todas transações criadas por um determinado merchant (vendedor)

2. Uma transação deve conter pelo menos:
    * O valor total da transação, formatado em string decimal
    * Descrição da transação, por exemplo "T-Shirt Black M"
    * Método de pagamento: **debit_card** ou **credit_card**
    * O número do cartão
    * O nome do dono do cartão
    * Data de Expiração
    * CVV do cartão

3. Como o número do cartão é uma informação sensível, devemos armazenar e retornar somente os últimos 4 dígitos do cartão.

4. Recebíveis do merchant (payables), devem possuir as seguintes regras de negócio:
    * Transação **Debit card**:
      * O payable deve ser criado com **status = paid**, indicando que o merchant irá receber o valor
      * O payable deve ser criado com a data igual a data de criação (D + 0).

    * Transação **Credit card**:
      * O payable deve ser criado com **status = waiting_funds**, indicando que o merchant irá receber esse valor no futuro
      * O Payable deve ser criado com a data igual a data de criação da transação  + 30 dias (D + 30)

5. Ao criar payables, devemos descontar uma taxa de processamento (chamada de `fee`). Considere **2%** para transações **debit_card**
e **4%** para transações **credit_card**. Exemplo: Quando um payable é criado no valor de R$ 100,00 a partir de uma transação **credit_card**  ele receberá R$ 96,00.

6. Precisamos de um endpoint que calcule o total de Recebíveis (payables) do merchant por período, a resposta deve conter:
  * Valor total de recebíveis
  * Valor a receber para o futuro
  * Total cobrado de taxa 

## Extra
- Você pode utilizar qualquer frameworks e biblioteca
- É um diferencial que pelo menos a lógica principal seja testada
- É um diferencial trabalhar com Typescript no dia a dia



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
