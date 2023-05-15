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

# Evidências de Testes de Software

|**Atividade(tela)**|**Ação**|**Resultado Esperado**|
|-------------------|--------|----------------------|
|Tela Login|Login Aceito | ![sucesso](https://user-images.githubusercontent.com/81272703/232234987-24c001b1-5571-4233-a4c1-8738388c671f.gif)|
|Tela Login|Login Incorreto | ![usuarioIncorreto](https://user-images.githubusercontent.com/81272703/232235042-b90c5fd2-04e0-4540-9ff8-07779f611030.gif)|
|Tela Gestão de Sócios| Ordenação de Dados | https://user-images.githubusercontent.com/70529816/232366813-bc68a493-f085-4ef5-9bc7-057c0d7d7332.mp4 |
|Tela Cadastro de Sócio| Listar Sócio por Cota | https://user-images.githubusercontent.com/70529816/232367460-67009ff6-12c9-4df8-9ce9-df872fdd7745.mp4|
|Tela Cadastro de Sócio|Não preencher número da Cota e "Filtrar"|https://user-images.githubusercontent.com/70529816/232367728-56625496-b314-49d0-802c-0afc6f04ba57.mp4|
|Tela Cadastro de Sócio| Sócio não Encontrado | https://user-images.githubusercontent.com/70529816/232367546-6b2b2ed0-b3e1-4046-b40e-66ec43ef67d3.mp4 |
|Tela Cadastro de Sócio | Sócio Cadastrado com Sucesso| https://user-images.githubusercontent.com/70529816/232367069-008aa760-e631-4a3b-9585-618937baccc1.mp4 |
|Tela Cadastro de Sócio|Falha no Cadastro do Sócio | https://user-images.githubusercontent.com/70529816/232367250-1e336114-17fd-4387-a960-f0e4d738e8a9.mp4 |
|Tela Cadastro de Sócio|Editar Sócio com Sucesso | https://user-images.githubusercontent.com/70529816/232367339-2cb14cbd-08a0-4e24-a7f4-9470e413e135.mp4 |
|Tela Cadastro de Sócio| Dependente Adicionado com Sucesso | https://user-images.githubusercontent.com/70529816/232367908-21e17790-c6c0-4cef-8c77-b6898edd3f01.mp4 |
|Tela Cadastro de Sócio| Falha ao Adicionar Dependente | https://user-images.githubusercontent.com/70529816/232367947-a5268277-e317-4db7-adbe-2823879f2c76.mp4 |
|Tela Cadastro de Sócio| Limpar formulário de Cadastro | https://user-images.githubusercontent.com/70529816/232368044-df50f2af-839f-4efc-b248-33087a121d7a.mp4|
|Tela Cadastro de Sócio| Editar Dependente| https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/ba5f885b-7511-41b2-9c7b-9e8d1fc614bb |
|Tela Cadastro de Sócio| Remover Dependente| https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/1f1f0498-052b-4dbb-b20b-ca03a0626534 |
|Tela Cadastro de Sócio| Criar Mensalidade|https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/453be6a2-a2ba-4f70-a766-f02ef6018c03 |
|Tela Cadastro de Sócio| Erro ao Criar Mensalidade - Campos obrigatórios| https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/a3c7af67-857a-4156-ad3c-4cca9fcc6a5c |
|Tela Cadastro de Sócio| Erro ao Criar Mensalidade Duplicada| https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/91f2aa6a-0596-460f-8c51-88f74cc22cb8 |
|Tela Cadastro de Sócio| Baixar Mensalidade| https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/65d468f8-81fb-4502-9ebf-8099a21a93ef |
|Tela Cadastro de Sócio| Visualizar Mensalidades em aberto| https://github.com/ICEI-PUC-Minas-PMV-ADS/Clube-Campestre/assets/70529816/5fdbe1bf-ed1c-48ca-add7-6d262879cc29 |
