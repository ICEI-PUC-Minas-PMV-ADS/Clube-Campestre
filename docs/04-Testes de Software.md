# Planos de Testes de Software

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

|**Caso de Teste**|**Atividade(tela)**|**Ação**|**Resultado Esperado**|
|---|-------------------|--------|----------------------|
|CT01|Tela Login| Ao entrar no menu Login, o usuário vai se deparar com as opções ( "usuario" e "Senha" )|CT 1: Ao preencher o campo usuario e senha deve-se fazer o login corretamente.  |
|CT02||CT 2: Ao digitar um usuario e senha  invalido |CT 2: Deve exibir mensagem " usuario incorreto   |
|CT03| Ordenar lista de sócios ativos na Gestão de Sócios | Ao clicar no nome das colunas | Os dados devem ser ordenados de acordo com a coluna clicada|
|CT04| Buscar cadastro do Sócio filtrando pela cota | Ao preencher o campo "Cota" e clicar em filtrar | Se o sócio existir, deve exibir a mensagem: "Dados do Sócio listados com sucesso" e trazer os dados do sócio preenchidos no formulário |
|CT05| Aviso ao tentar buscar sócio sem preencher a cota | Clicar em filtrar sem preencher o campo "Cota" | Deve exibir a mensagem "Preencher o número da cota que deseja buscar"   |
|CT06| Cota informada no filtro não exite na base | Ao preencher o campo "Cota" e clicar em filtrar |Se não existir sócio com a cota informada, deve exibir "Não foi encontrado nenhum sócio com a cota informada" |
|CT07| Cadastrar novo sócio | Preencher todos os campos do cadastro do Sócio e Clicar em "Salvar" | Se as validações necessárias retornarem sucesso na API, deve exibir a mensagem: "Cadastro do Sócio criado com sucesso"|
|CT08| Erro ao cadastrar Sócio | Não preencher campos obrigatórios para cadastrar o sócio e clicar em "Salvar" | Deve exibir a mensagem "Não foi possível cadastrar o Sócio" |
|CT09| Alterar dados do Cadastro de Sócio | Buscar um sócio já existente filtrando pelo número da cota, depois alterar algum campo e clicar em "Salvar" | Deve exibir mensagem "Dados do sócio alterados com sucesso"|
|CT10| Adicionar Dependente| Preencher os campos obrigatórios dos dependentes e clicar no botão de "+" | Deve exibir mensagem "Dependente Adicionado com sucesso", em seguida, o dependente adicionado já deve aparecer na tabela de dependentes logo abaixo |
|CT11| Erro Adicionar Dependente| Deixar de preencher algum campo obrigatório do dependente e clicar no botão "+" | Deve exibir mensagem "Não foi possível cadastrar dependente" |
|CT12| Limpar formulário de Cadastro do Sócio | Depois de realizar o CT04, clicar no botão "Limpar" | Deve resetar todos os campos do formulário, inclusive a tabela de dependentes   |
|CT13| Editar Dependente | Depois de realizar o CT10, clicar no icone de lápis na linha referente aos dados do dependente | Deverá abrir um modal com os campos do cadastro do dependente, e ao alterar e clicar em "Salvar", a lista de dependentes deverá ser atualizada com os dados novos e exibir uma mensagem de sucesso na tela: "Dependente atualizado com sucesso!" |
|CT14| Remover Dependente| Depois de realizar o CT10, clicar no icone de lixeira na linha referente aos dados do dependente | Deverá abrir um modal solicitando a confirmação de exclusão do dependente, e ao clicar em "Sim", a lista de dependentes deverá ser atualizada sem o dependente que foi removido e exibir uma mensagem de sucesso na tela: "Dependente excluído com sucesso." |
|CT15| Criar Mensalidade | Preencher os campos obrigatórios das mensalidades na seção "Financeiro" do cadastro do sócio e clicar no botão de "+" | Deve criar uma nova linha na lista de mensalidades e exibir uma mensagem de sucesso na tela: "Mensalidade criada com sucesso!" |
|CT16| Erro ao Criar Mensalidade por falta de campos obrigatórios | Não preencher os campos obrigatórios das mensalidades na seção "Financeiro" do cadastro do sócio e clicar no botão de "+" | Deve exibir uma mensagem de erro na tela: "Certifique-se de preencher todos os campos da mensalidade." |
|CT17| Erro ao Criar Mensalidade duplicada para o sócio | Preencher os campos obrigatórios das mensalidades na seção "Financeiro" do cadastro do sócio e clicar no botão de "+" | Se o sócio já possuir uma mensalidade com aquele mês/ano de referência a aplicação deve exibir uma mensagem de erro na tela: "Mensalidade já criada para o sócio informado" |
|CT18| Baixar Mensalidade| Depois de realizar o CT15, clicar no ícone de "Check" na linha com as informações da mensalidade que deseja baixar | Deverá abrir um modal com os campos do cadastro da mensalidade, e ao alterar e clicar em "Baixar" a lista de mensalidade deverá ser atualizada com as informações de pagamento e exibir uma mensagem de sucesso na tela: "Parcela baixada com sucesso!" |
|CT19| Visualizar Todas as Mensalidades em Aberto| Ao abrir a tela "Financeiro" | Deve ser exibida uma lista com todas as mensalidades em aberto dos sócios do clube |
|CT20| Visualizar  as parcelas em atraso e à vencer| Ao abrir a tela "Financeiro" | Deve ser exibida uma lista com todas as parcelas em aberto , a vencer e vencido do socio |
|CT21| Importar dados do Banco para confirmar o pagamento da mensalidade | Ao abrir a tela "Financeiro" e ir em importar arquivo , vou buscar o relatorio do banco que vai demontrar os pagamentos do mês . | Deve ser exibida uma lista com todos os socios que efetuaram o pagamento do mês |
|CT22| Datas das mensalidades Padrão | Ao abrir a tela "Financeiro"| Ao abrir a tela "Financeiro" , criar mensalidades consigo gerar todas as mensalidades e alterar a data e o valor|
|CT23| Imprimir dados em excel | Gestão de Socio Imprimir |Ao abrir a tela "Gestão de Socio" , Consigo imprimir todas as informações dos socios do clube. |


# Evidências de Testes de Software

|**Atividade(tela)**|**Ação**|**Resultado Esperado**|
|-------------------|--------|----------------------|
|Tela Login|Login Aceito | ![sucesso](https://user-images.githubusercontent.com/81272703/232234987-24c001b1-5571-4233-a4c1-8738388c671f.gif)|
|Tela Login|Login Incorreto | ![usuarioIncorreto](https://user-images.githubusercontent.com/81272703/232235042-b90c5fd2-04e0-4540-9ff8-07779f611030.gif)|
|Tela Gestão de Sócios| Ordenação de Dados | ![ordenaçao de dados](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/a8dcfe01-1122-45ac-b3bf-89eaae66caa9) |
|Tela Cadastro de Sócio| Listar Sócio por Cota | ![Lista socio por cota](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/c52fbc5b-bcd0-44f6-a03b-2b8ee38be190)|
|Tela Cadastro de Sócio|Não preencher número da Cota e "Filtrar"|![Não preencher número da Cota](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/d66fde26-de6d-49e6-b35e-2a792d2d5e61)|
|Tela Cadastro de Sócio| Sócio não Encontrado | ![Sócio não Encontrado](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/1ffc8009-7ff9-47eb-a304-73edcedd2b24) |
|Tela Cadastro de Sócio | Sócio Cadastrado com Sucesso| ![Sócio Cadastrado com Sucesso](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/1fdd4433-57e5-4de2-9ce1-8bec197b4899) |
|Tela Cadastro de Sócio|Falha no Cadastro do Sócio | ![Falha no Cadastro do Sócio](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/b4a3c84e-62b4-4d19-aa8e-0602c4e31e0f) |
|Tela Cadastro de Sócio|Editar Sócio com Sucesso | ![Editar Sócio com Sucesso](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/39b63df4-6926-4027-a2d8-100ba2cafaca) |
|Tela Cadastro de Sócio| Dependente Adicionado com Sucesso |![Dependente Adicionado com Sucesso](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/3fe6648a-3c5e-4d49-9caf-eb04bf8aefcd) |
|Tela Cadastro de Sócio| Falha ao Adicionar Dependente | ![Falha ao Adicionar Dependente](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/ed1f9de0-9a8b-4c41-a7b9-700612a3166c) |
|Tela Cadastro de Sócio| Limpar formulário de Cadastro | ![Limpar formulário de Cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/0a3d75cc-c949-4419-af67-339d741cec91)|
|Tela Cadastro de Sócio| Editar Dependente| ![Editar Dependente](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/46b912d0-98c3-4051-8c1c-e9eafb91c733) |
|Tela Cadastro de Sócio| Remover Dependente| ![Remover Dependente](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/731c201f-35e5-4fb1-9ca8-5f3a2b61b23c) |
|Tela Cadastro de Sócio| Criar Mensalidade|![Criar Mensalidade](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/c1b5c13b-4d19-4b7b-acd7-c082d2acfe55) |
|Tela Cadastro de Sócio| Erro ao Criar Mensalidade - Campos obrigatórios| ![Erro ao Criar Mensalidade - Campos obrigatórios](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/ac6a4df7-2913-449c-96e4-71a425c23c9f) |
|Tela Cadastro de Sócio| Erro ao Criar Mensalidade Duplicada| ![Erro ao Criar Mensalidade Duplicada](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/6c7f6b91-764d-48bf-a189-23f879ba5b56) |
|Tela Cadastro de Sócio| Baixar Mensalidade| ![Baixar Mensalidade](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/b5319c75-2a0c-4645-b9e5-28aac9f97e23) |
|Tela Cadastro de Sócio| Visualizar Mensalidades em aberto| ![Visualizar Mensalidades em aberto](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/cb9223a5-b7d7-4397-88af-3f3853d4e39d) |
|Tela Financeiro| Visualizar  as parcelas em atraso e à vencer| ![fianceiro](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/f9b0cd66-1a92-4ca7-8b5e-9bfe81db7167) |
|Tela Financeiro| Importar dados do Banco para confirmar o pagamento da mensalidade| ![importar](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/03a536eb-57e1-470b-9104-726cf692438c)|
|Tela Financeiro| Datas das mensalidades Padrão | ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/b4af0621-3d25-433e-9b08-764862f583a2)|
|Tela Demonstrar arquivo Excel| Imprimir dados em excel  | ![Excel](https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/81272703/6d7321a4-9d56-41a9-b677-d649b9fb9c8d)|



