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

|ATOR| DESCRIÇÃO                                            |
|--|-------------------------------------------------------|
|Administrador do Clube| Pessoa responsável por administrar o sistema e fazer a gestão dos usuários. |
|Sistema| Disponibiliza funcionalidades e dados para serem manipulados pelo administrador do clube.|

|CASO DE USO| DESCRIÇÃO | RF |
|--|-------------------------------------------------------|----------------------|
|Visualizar notícias e informações úteis na HomePage | Na homepage da aplicação deve conter algumas notícias e informações úteis para o usuário| RF-008 |
|Realizar cadastro de usuário | O usuário deve conseguir realizar um cadastro na aplicação | RF-002 |
|Efetuar login na aplicação | O usuário deve conseguir realizar um login na aplicação com suas credenciais cadastradas | RF-001 |
|Alterar a senha | O usuário deve conseguir alterar a sua senha | RF-001 |
|O usuário deve conseguir alterar a sua senha | A aplicação deve permitir ao usuário solicitar a coleta de materiais na sua residência| RF-003 |
|Buscar requisitos de coleta |A aplicação deve buscar quais são os requisitos para que a coleta seja realizada diretamente na residência do usuário | RF-006 |
|Solicitar Descarte de materiais | A aplicação deve permitir ao usuário solicitar a realização de descarte de materiais indo até um ecoponto selecionado | RF-003|
|Buscar materiais possíveis de descarte | A aplicação deve buscar quais são os materiais permitidos para o descarte em no ecoponto selecionado pelo usuário Buscar materiais possíveis de descarte | RF-006 |
|Visualizar os pontos de coleta mais próximos  | A aplicação deverá mostrar quais são os ecopontos que permitem a coleta/descarte mais próximos dele | RF-004| 
|Acompanhar a solicitação de coleta | Em caso de coleta de materiais na residência, o usuário deve conseguir acompanhar o status da sua solicitação| RF-005 |
|Realizar a baixa dos materiais coletados  | O Ecoponto deverá conseguir realizar a baixa nas solicitações de descarte e coleta informando que os materiais foram devidamente coletados  | RF-011|

|RELACIONAMENTO| DESCRIÇÃO                                            |
|--|-------------------------------------------------------|
|INCLUSÃO| É necessário fazer o login na aplicação antes de realizar os casos de uso: “Solicitar Coleta de Materiais”, “Solicitar Descarte de Materiais” e “Realizar a baixa dos materiais coletados” |
||Para solicitar coleta de materiais é necessário que o banco de dados busque quais são os requisitos de coleta |
||Para solicitar descarte de materiais é necessário que o banco de dados busque quais são os requisitos de descarte | 
|EXTENSÃO| Caso o usuário ainda não tenha cadastro, será necessário fazê-lo antes de fazer login na aplicação |
||Caso o usuário tenha esquecido sua senha, será necessário alterá-la antes de fazer login na aplicação  |
||Caso o usuário deseje saber onde descartar seus materiais, é possível visualizar os pontos de coleta mais próximos |

### Representação Visual
![Figura 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Diagrama%20de%20Casos%20de%20Uso.png)

*Figura 1 – Diagrama de Casos de Uso* 
# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória, conforme *Figura xx*, demonstrada a seguir:

![Figura XX](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Diagrama%20de%20Classes.png)

*Figura XX – Diagrama de Classes*  

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa, conforme pode ser visualizado na *Figura XX*, apresentada logo abaixo:

![Figura XX](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Modelo%20de%20Entidades%20e%20Relacionamentos.png)

*Figura XX – Modelo de Entidades e Relacionamentos*  

## Projeto da Base de Dados

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chaves primárias e estrangeiras. O ER da aplicação em desenvolvimento corresponde à *Figura XX*, representada a seguir:
 
![Figura XX](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e5-proj-ext-t1-clube-campestre/blob/50bcf7312c655378e5e7400df0a7512694f76141/docs/img/Esquema%20Relacional.png)

*Figura XX – Esquema Relacional*  

