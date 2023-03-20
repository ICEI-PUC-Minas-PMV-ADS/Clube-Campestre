# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

![Figura 1](https://user-images.githubusercontent.com/81272703/225780698-a0fcf66a-fea8-4e71-907b-7deaecb6dbf1.png)

*Figura 1 – Project Model Canvas*

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-01 | Permitir que o administrador faça login na aplicação | ALTA | 
|RF-02 | Permitir que o administrador altere a sua senha | BAIXA | 
|RF-03 | Permitir que o administrador cadastre, edite e busque sócios | ALTA | 
|RF-04 | Permitir que o administrador adicione dependentes ao cadastro dos sócios | MÉDIA |
|RF-05 | Permitir que o administrador crie parcelas para pagamento dos sócios |ALTA |
|RF-06 | Permitir que o administrador visualize uma lista com todos as parcelas em aberto de cada sócio | ALTA | 
|RF-07 | Permitir que o administrador retire um extrato de pagamento por sócios| MÉDIA | 
|RF-08 | Permitir que o administrador visualize uma lista com todos os sócios do clube | ALTA | 
|RF-09 | Permitir que o administrador faça filtros variados na lista de sócios | MÉDIA | 
|RF-10 | Permitir que o administrador ordene a lista de sócios por nº da cota e nome | BAIXA |
|RF-11 | Permitir que o administrador gere um relatório de não inadimplentes para entrada no clube | BAIXA |


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

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. A representação visual do diagrama segue conforme a Figura 2.

|ATOR| DESCRIÇÃO                                            |
|--|-------------------------------------------------------|
|Administrador do Clube| Pessoa responsável por administrar o sistema e fazer a gestão dos usuários. |
|Sistema| Disponibiliza funcionalidades e dados para serem manipulados pelo administrador do clube.|

|CASO DE USO| DESCRIÇÃO | RF |
|--|-------------------------------------------------------|----------------------|
|Efetuar login na aplicação | O administrador deve conseguir realizar um login na aplicação com suas credenciais cadastradas | RF-01 |
|Alterar a senha | O administrador deve conseguir alterar a sua senha | RF-02 |
|Buscar/Cadastrar/Editar Sócios| O administrador deve conseguir buscar e editar cadastros de sócios existentes na base e criar novos| RF-03 |
|Adicionar/Remover Dependentes| O administrador deve conseguir adicionar e remover dependentes aos sócios existentes| RF-04 |
|Criar Parcelas| O administrador deve conseguir criar novas parcelas para pagamento| RF-05 |
|Listar parcelas em Aberto por Sócio| O sistema deve listar na seção "Financeiro" todas as parcelas em aberto do sócio| RF-06 |
|Gerar Extrato de Pagamentos do Sócio| O administrador deve conseguir gerar um extrato de pagamentos do sócio| RF-07 |
|Apresentar lista de Sócios| O sistema deve apresentar uma lista com todos os sócios cadastrados na base| RF-08 |
|Filtrar lista de Sócios| O administrador deve conseguir fazer filtros por nº da Cota, Condição ou Situação Financeira do Sócio na lista| RF-09 |
|Ordenar lista de Sócios| O administrador deve conseguir ordenar a lista por nº da Cota ou Nome| RF-10 |
|Gerar relatório de não inadimplentes| O administrador deve conseguir gerar um relatório com os usuários não inadimplentes| RF-11 |

|RELACIONAMENTO| DESCRIÇÃO                                            |
|--|-------------------------------------------------------|
|INCLUSÃO| É necessário que o sistema apresente a lista de sócios para permitir que  o administrador execute a ação "Filtrar lista de Sócios" |
||É necessário que o sistema apresente a lista de sócios para permitir que  o administrador execute a ação "Ordenar lista de Sócios" |
|EXTENSÃO| Caso o usuário tenha esquecido sua senha, será necessário alterá-la antes de fazer login na aplicação |
||Caso o sócio a ser cadastrado possua dependentes ou deseje retirar algum de seus já existentes, será necessário que administrador execute a ação "Adicionar/Remover Dependentes"|


### Representação Visual
![Figura 2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Diagrama%20de%20Casos%20de%20Uso.png)

*Figura 2 – Diagrama de Casos de Uso*

## Diagrama de Fluxo

Conforme pode ser visto, a *Figura 3* mostra o diagrama de fluxo de interação do usuário pelas telas do sistema. Cada uma das telas deste fluxo é detalhada na seção de Wireframes que será desenvolvido. 

![Figura 3](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/blob/d615943f5be0764f0f036b2dd85dbdeb0e184bdb/docs/img/Fluxograma%20de%20Usu%C3%A1rio.png)

*Figura 3 – Diagrama de Casos de Uso*

# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória, conforme *Figura 4*, demonstrada a seguir:

![Figura 4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Diagrama%20de%20Classes.png)

*Figura 4 – Diagrama de Classes*  

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa, conforme pode ser visualizado na *Figura 5*, apresentada logo abaixo:

![Figura 5X](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Modelo%20de%20Entidades%20e%20Relacionamentos.png)

*Figura 5 – Modelo de Entidades e Relacionamentos*  

## Projeto da Base de Dados

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chaves primárias e estrangeiras. O ER da aplicação em desenvolvimento corresponde à *Figura 6*, representada a seguir:
 
![Figura XX](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Esquema%20Relacional.png)

*Figura 6 – Esquema Relacional*  

