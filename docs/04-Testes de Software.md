# Planos de Testes de Software

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

|**Caso de Teste**|**Atividade(tela)**|**Ação**|**Resultado Esperado**|
|---|-------------------|--------|----------------------|
|CT01|Tela Login| Ao entrar no menu Login, o usuário vai se deparar com as opções ( "usuario" e "Senha" )|CT 1: Ao preencher o campo usuario e senha deve-se fazer o login corretamente.  |
|CT02||CT 2: Ao digitar um usuario e senha  invalido |CT 2: Deve exibir mensagem " usuario incorreto   |
|CT03|Tela Gestão de Sócios | Ao clicar no nome das colunas | Os dados devem ser ordenados de acordo com a coluna clicada|
|CT04|Tela Cadastro de Sócio| Ao preencher o campo "Cota" e clicar em filtrar | Se o sócio existir, deve exibir a mensagem: "Dados do Sócio listados com sucesso" e trazer os dados do sócio preenchidos no formulário |
|CT05|Tela Cadastro de Sócio| Clicar em filtrar sem preencher o campo "Cota" | Deve exibir a mensagem "Preencher o número da cota que deseja buscar"   |
|CT06|Tela Cadastro de Sócio| Ao preencher o campo "Cota" e clicar em filtrar |Se não existir sócio com a cota informada, deve exibir "Não foi encontrado nenhum sócio com a cota informada"   |
|CT07|Tela Cadastro de Sócio| Preencher todos os campos do cadastro do Sócio e Clicar em "Salvar" | Se as validações necessárias retornarem sucesso na API, deve exibir a mensagem: "Cadastro do Sócio criado com sucesso"|
|CT08|Tela Cadastro de Sócio| Não preencher campos obrigatórios para cadastrar o sócio e clicar em "Salvar" | Deve exibir a mensagem "Não foi possível cadastrar o Sócio" |
|CT09| Tela Cadastro de Sócio| Buscar um sócio já existente filtrando pelo número da cota, depois alterar algum campo e clicar em "Salvar" | Deve exibir mensagem "Dados do sócio alterados com sucesso"|
|CT10| Tela Cadastro de Sócio| Preencher os campos obrigatórios dos dependentes e clicar no botão de "+" | Deve exibir mensagem "Dependente Adicionado com sucesso", em seguida, o dependente adicionado já deve aparecer na tabela de dependentes logo abaixo |
|CT11| Tela Cadastro de Sócio| Deixar de preencher algum campo obrigatório do dependente e clicar no botão "+" | Deve exibir mensagem "Não foi possível cadastrar dependente" |
|CT12| Tela Cadastro de Sócio| Depois de realizar o CT04, clicar no botão "Limpar" | Deve resetar todos os campos do formulário, inclusive a tabela de dependentes   |

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
