# simpsonsgame

## Exposição do problema
 Imagine que você é um cientista de dados de uma empresa de games e a fox contrate a sua empresa para fazer o novo game que de uma das séries mais amadas das últimas duas décadas: Os Simpsons.
 
 A ideia é fazer um game que a pessoa possa jogar durante o intevalo do desenho, para que o fã tenha uma experiência imersa na sua série favorita.
 
 A concepção do game construído é a disputa entre o fã e uma inteligência artificial, para ver quem acerta mais vezes o personagem que falou determinada frase. Aquele que chega a 5 pontos primeiro vence. Temos 3 níveis de dificuldade. 
 
  - Iniciante - Os chutes do computador são aleátorios
  - Intermediário - Os chutes passam por uma modelo SVM
  - Avançado - Os chutes passam por um modelo MultinomialNB
 
 ## Coleta de dados
 Os dados utilizados, foram extraídos do [kaggle - Simpsons](https://www.kaggle.com/datasets/pierremegret/dialogue-lines-of-the-simpsons).
 
 ## Preparação dos dados
A base original consistia de centenas de personagens com suas falas. Mas para fins didáticos, resolvi concentrar a base nos personagens principais, Homer, Marge, Bart e Lisa. 
A Megie não aparece pois é um bebê e ainda não fala. Depois de separados os personagens, foi feito um undersampling dos dados, pois as frases de Homer estavam em um volume de 40 mil enquanto os outros 3 personagens variavam entre 10 e 14 mil.
 
Além disso foram selecionadas 9.900 frases aleatórios de cada personagem para treinamento dos modelos e deixadas 100 para teste no jogo. 

Não houve nenhum estudo mais profundo no base, pois são apenas frases para um jogo, e isso não teria relevância real.


## Análise exploratória de dados
Como primeiro passo, criei um wordcloud para cada personagem para verificar as palavras mais ditas por cada um.
Para **Bart** e **Lisa**, essa palavras foi Dad(Pai) e para **Marge** foi Homer. Ou seja, vemos que homer além de ser o personagem principal é o mais citado em toda série.
 
Na análise exploratória utilizei a biblioteca nltk para fazer o processo de limpeza e transformação dos dados, fiz um pré-processamento atráves de uma função que remove os stopwords (palavras que não alteram o sentido da frase, por exemplo artigos: O, A, Os e As), separa os afixos das palavras e remove links, pontos, virgulas, ponto e virgulas.

Fiz também um processo de lemmatização e tokenização para formatar o dataset para aplicação nos algorítmos.

## Modelagem

Para modelagem utilizamos um dois algorítmos, SVM e MultinomialNB que trabalham muito bem na predição de textos. Além disso, utilizei também um modelo random para o nível fácil.
![image](https://user-images.githubusercontent.com/36546452/168443594-e3aae9a8-3bc9-4ece-8aed-6b9a874244e4.png)
Utilizei acurácia como métrica, uma vez que o mais importante para mim é o quanto o modelo se aproxima globalmente de respostas corretas. Pois um ser humano chutando aleatoriamente tem 25% de chances de acerto, então qualquer modelo que fique acima desse baseline tem uma taxa de acerto maior que o ser humano.

## Deploy

Para deploy foi escolhido este repositório no github para documentação e uma página com o jogo no heroku hospedando uma aplicação flask.
Aproveite e diverta-se com esse simples game.

## Sobre o Jogo
O jogo foi construído em html, css e Javascript consumindo api em python(flask), hospedado no heroku.
	
Foi utilizado as seguintes premissas:

- O jogo tem 3 níveis: Iniciante, Intermediário e Avançado. 
- Iniciante é utilizado uma escolha aleatória entre os 4 personagens tendo uma chance de 25% de acerto.
- Intermediário foi utilizado o modelo SVM com uma chance de 45% de acerto
- Avançado foi utilizado o MuiltinomialNB que tem uma chance de 47,5% de acerto.
- Quem chegar a 5 pontos primeiro vence.
- As telas de home, avatar e oponente fazem uma requisição http com método post para o flask para salvar as informações de nome, imagem do jogador e modelo e imagem do oponente.
- Na tela de jogo é feito uma requisição http método get para recuperar do flask as informações de modelo, imagem do jogador e do modelo.
- Também tela de jogo é feito uma requisição http com método get para o flask para selecionar uma frase, o flask seleciona aleatoriamente uma frase e retorna a frase e o autor da frase.
- Ainda na tela de jogo é feito uma requisição http método post para enviar ao modelo selecionado no flask, o modelo faz a previsão e retorna o palpite do personagem autor da frase.


[Clique aqui para jogar](https://simpsonsgameflask.herokuapp.com/)
