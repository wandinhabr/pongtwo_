//No projeto inicial o autor (ALURA, 2023) reproduziu uma singela homenagem a um dos clássicos dos games, o pong Atari da década de 1970. O projeto inicial consiste em uma tela de fundo construída como um retãngulo preto como campo. Atores retangulos laranja em movimento vertical como raquetes e uma círculo branco como bolinha. Por fim, placar dos jogadores e sons. Para inicar o jogo é neessário clicar na tela. Acessado em 21/06/2022.
//Atividades propostas pelo Professor Renato Pereira:
//1º Decompor funções e blocos de programação e, em seguida, nomeá-los.
//2º Fazer o estudo para abstração e inserir comentários em todos os blocos do programa.
//3º Alterar os componenetes transformando os algoritmos: formatos, cores, posições, velocidades, pontuações e placares etc., conforme orientações abaixo e, sobretudo, liberte e estenda à sua criatividade.
//4º Altere a tela de fundo. Utilize-se de cores, inserção de figuras, imagens, luzes etc.
//5º Altere as raquetes, utilize-se de cores, inserção de figuras, imagens, luzes etc.
//6º Altere a bolinha e o seu movimento, utilize-se de cores, luzes etc.
//7º Atere a tela do jogo para ser ajustável ao dispodsitivo.
//8º Altere o placar e a pontuação.
//9º Multiplique o trabalho no github com as seguintes características:
//  a) Construa a pagina HTML;
//  b) Faça a estilização CSS;
//  c) Insira o Reset CSS.
//  d) Programe para que o site seja responsivo. 
//  e) Utiliza-se das Normas ABNT.
//  f) Na responsabilidade da normatização, conforme a lei do marco civil da Internet no Brasil (https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm), garanta a civilidade e característica de valorização humana com o respeito à diversidade que compõem a força e a alegria que há na vida e, portanto, aos ambientes nos mais variados contextos culturais.
//  g) Na responsabilidade da normatização, conforme a lei de direitos autorais no Brasil (https://www2.senado.leg.br/bdsf/item/id/243240), garanta a civilidade e característica de valorização humana com o respeito em agradecer e o dever legal em citar o autor anterior, a data e a fonte do trabalho, quando for o caso de reprodução ou alteração. E, em mesma medida, deixar dados de autoria e coautoria, data e instituição de ensino que pssibilitou a construção do trabalho.
//@@@@@@@@@@

//Classe estrelas
class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 2);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}
//Final da Classe estrelas. 

//Classe ovos
class Egg {
constructor(xpos, ypos, t, s) {
    this.x = xpos;
    this.y = ypos;
    this.tilt = t;
    this.scalar = s / 100.0;
    this.angle = 0.0;
}

wobble() {
    this.tilt = (this.angle) / 0.4;
    this.angle += 0.05;
}

  //Na funçao display sao construidos os atores, neste caso, os osciladores. Primeiro a coloração por meio da função display, argumento fill("parâmetros") e, em seguida, as figuras geométricas: circulos → a sintaxe circle(parâmetro da posição x, parâmetro da posição y, parâmetro do diâmetro). Os retângulos → a sintaxe rect(parâmetro da posição x, parâmetro da posição y, parâmetro da base do retângulo, parâmetro da altura do retângulo). E, finalmente, as linhas.
  display() {
    noStroke();
    fill(255);
    push();
    translate(this.x, this.y);
    rotate(this.tilt);
    scale(this.scalar);
    beginShape();
    vertex(0, -100);
    bezierVertex(2, 1, 3, 5,5, 4);
    bezierVertex(4, 5, 2, 0, 0, 0);
    bezierVertex(-2, 0, -4, -15, -4, -4);
    bezierVertex(-4, -6, -5, -1, 0, -1);
    endShape();
    pop();
}
}
//Final da Classe ovos.

//Classe ondas esféricas
class Ring {
start(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.on = true;
    this.diameter = 1;
}
grow() {
    if (this.on == true) {
        this.diameter += 0.5;
        if (this.diameter > width * 2) {
            this.diameter = 0.0;
        }
    }
    }

display() {
    if (this.on == true) {
        noFill();
        strokeWeight(1);
        stroke(155, 153);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}
}
//Final da classe ondas esféricas

//Classe ovos e ondas.
class EggRing {
constructor(x, y, t, sp) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.sp = sp;
    this.circle = new Ring();
    this.ovoid = new Egg(this.x, this.y, this.t, this.sp);
    this.circle.start(this.x, this.y - this.sp/2);
}

transmit() {
    this.ovoid.wobble();
    this.ovoid.display();
    this.circle.grow();
    this.circle.display();
    if (circle.on == false) {
        circle.on = true;
    }
}
}
//Final da classe ovos e ondas.


//Variáveis do campo
var stars = [];
let er1, er2, er3, er4;


//variáveis da bola
let xBolinha = 20;
let yBolinha = 200;
let diâmetro = 20;
let raio = diâmetro / 2;
let velocidadexBolinha = 20;
let velocidadeyBolinha = 12;





//variáveis da raquete
let xRaquete = 0;
let yRaquete = 150;
let raqueteComprimento = 15;
let raqueteAltura = 100;

//variáveis do oponente
let xRaqueteOponente = 640;
let yRaqueteOponente = 0;
let raqueteComprimentoOponente = 15;
let raqueteAlturaOponente = 100;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente= 0;

//sons do jogo
let rauqetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(0.95*displayWidth, 0.55*displayHeight);
  trilha.loop();
  for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
}
  
  er1 = new EggRing(width * 0.2, height * 0.2, 0.1, 10);
  er2 = new EggRing(width * 0.8, height * 0.2, 5, 15);
  er3 = new EggRing(width * 0.8, height * 0.8, 0.1, 10);
  er4 = new EggRing(width * 0.2, height * 0.8, 5, 20);
  
}
function draw() {
    background("#051933");
	fill(random(0,256), random(0,256), random(0,256))
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
    mostraBolinha();
    movimentaBolinha();
    colisãoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaRaquete();
    //colisãoRaquete();
    colisãoRaquete(xRaquete, yRaquete);
    mostraRaquete(width-15, yRaqueteOponente);
    movimentaRaqueteOponente();
    colisãoRaquete(width-15, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
  

 
  
  er1.transmit();
  er2.transmit();
  er3.transmit();
  er4.transmit(); 
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diâmetro);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisãoBorda(){
  if (xBolinha + raio > width ||
    xBolinha - raio < 0)
  {velocidadexBolinha *= -1;
  }
  
  if (yBolinha +raio > height ||
     yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaqueteOponente(){
  if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10;
}
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += 10;
}
}

function movimentaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
}
  if (keyIsDown(83)){
    yRaquete += 10;  
}
}


// function movimentaRaqueteOponente() {
//     velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimentoOponente / 2 -30;
//     yRaqueteOponente += velocidadeYOponente + chanceDeErrar
//   calculaChanceDeErrar();

// }

// function calculaChanceDeErrar() {
//   if (pontosDoOponente >= meusPontos) {
//     chanceDeErrar += 1
//     if (chanceDeErrar >= 39){
//     chanceDeErrar = 40
//     }
//   } else {
//     chanceDeErrar -= 1
//     if (chanceDeErrar <= 35){
//     chanceDeErrar = 35
//     }
//   }
// }

function colisãoRaquete(){
  if (xBolinha - raio - xRaquete + raqueteComprimento && yBolinha + raio > yRaquete0){velocidadexBolinha *= -1;
    raquetada.play();                                       }
}

function colisãoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){velocidadexBolinha *= -1;
    raquetada.play();
    }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(0.1*width, 14, 40, 20);
  fill(255);
  text(meusPontos, 0.117*width, 30);
  fill(color(255, 140, 0));
  rect(0.9*width, 14, 40, 20);
  fill(255);
  text(pontosDoOponente, 0.917*width, 30);
  fill(color(random(0, 256), random(0, 256), random(0, 256)));
  text('→ TELA CHEIA ←', 0.5*width, 50);
    }

function marcaPonto(){
  if (xBolinha > width-1){meusPontos += 1;
  ponto.play();
  }
  if (xBolinha < 1){pontosDoOponente += 1;
  ponto.play();}
}



function mousePressed() {
  if (mouseX > 0 && mouseX < displayWidth && mouseY > 0 && mouseY < 0.35*displayHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
}
}
