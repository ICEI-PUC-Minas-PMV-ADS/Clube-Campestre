_# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

![image](https://user-images.githubusercontent.com/81272703/225780698-a0fcf66a-fea8-4e71-907b-7deaecb6dbf1.png)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-01 | Permitir que o usuário cadastre sócios | ALTA | 
|RF-02 | permitir que os usuários integrem os pagamentos   | MÉDIA |
|RF-03 | Permitir que os usuários visualizem seu histórico de pagamentos, incluindo pagamentos anteriores e futuros| ALTA | 
|RF-04 | Permitir que os usuários gerem relatórios de pagamentos|ALTA | 
|RF-05 | O aplicativo deve ser capaz de se integrar com outras plataformas de pagamento | BAIXA|
|RF-06 | Permitir a gestão de membros do clube, incluindo informações pessoais, status de associação, histórico de pagamentos, entre outros dados | ALTA|
|RF-07 | Permitir que o clube gerencie a lista de associados, com informações como nome, endereço, telefone, e-mail e outras informações pertinentes.| ALTA|
|RF-08 | Permitir que o clube controle o acesso de associados e visitantes às dependências do clube| ALTA|


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-01 | A aplicação deverá ser responsiva, permitindo a visualização em um browser de forma adequada.  | MÉDIA | 
|RNF-02 | A aplicação deverá ter uma fonte padrão para todas as escritas, com alterações apenas no tamanho.   |  MÉDIA |
|RNF-03 | A aplicação deverá apresentar um layout padrão para todas as telas, podendo ser criado ou utilizado um existente.   |  MÉDIA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| A equipe não pode subcontratar o desenvolvimento do trabalho |


## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
_
