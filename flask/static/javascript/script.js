// Função para requisições http
  myRequest = ( metodo, url, value=NaN) => {
    let request = new XMLHttpRequest()
    request.open(metodo, url, false)
    if(metodo == "GET"){
        request.send()
    }
    else{
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(value));
    }
    return request.responseText
  }

// funções pagina home
setPlayer = () => {
  const nomeJogador = document.getElementById("nomejogador").value;
  if (nomeJogador == null || nomeJogador == ""){
      alert("Digite seu nome")
  }else{
      const dict_values = {nomeJogador} //Pass the javascript variables to a dictionary.
      console.log(dict_values)
      myRequest('POST', '/db', dict_values)
      window.location.href = '/P_avatar'
  }
}

changecolor = () => {
  var nome = document.getElementById("nomejogador");
  var btn = document.getElementsByClassName("jogar");
  if (nome.value == null || nome.value == "") {
      btn[0].style.backgroundColor = "rgb(184, 183, 183)";
          btn[0].style.color = "black";
      }
      else {
          btn[0].style.backgroundColor = "rgba(0, 0, 161, 0.63)";
          btn[0].style.color = "white";
      }
  }

// funções pagina P_avatar
selectAvatar = (avatar_) => {
    var avatar = avatar_.name
    const dict_values = {avatar}
    myRequest('POST', '/db', dict_values)
    window.location.href = '/M_avatar'
}

// funções pagina M_avatar
selectOponent = (oponent_) => {
    var oponent = oponent_.name
    const dict_values = {oponent}
    myRequest('POST', '/db', dict_values)
    window.location.href = '/game'
}

// funções pagina game

//variaveis globais
var timePensando;
var Gautor;
var Gpalpite;
var ischeck = true;
var cradio = '';

verifica_vencedor = (p, m) => {
  if(parseInt(p) == parseInt(m)&& parseInt(p) == 5){
    window.location.href = '/empate'
  }
  else if(parseInt(p)  == 5){
    window.location.href = '/ganhou'
  }
  else if(parseInt(m) == 5){
    window.location.href = '/pedeu'
  }
}

limpaTela = () =>{
  cradio = document.getElementsByName('Personagem')
  for(r in cradio){
    cradio[r].disabled = true
    cradio[r].checked = false
  }
  var bnt = document.getElementsByClassName("btn-next")[0]
  bnt.style.display = "none";
  resultado = document.getElementsByClassName('resultado')[0]
  resultado.style.display = "none";
  hiddenPalpite()
}

nextFrase = () =>{
    limpaTela()
    console.log('aqui')
    timePensando = setTimeout(showPalpite, 3000);
    
    var frase_autor = myRequest('GET', '/frase-autor')
    var frase = JSON.parse(frase_autor)[0]
    var autor = JSON.parse(frase_autor)[1]
    var textFrase = document.getElementById("fala")
    textFrase.innerText = frase
    
    var cmodelo = document.getElementById('oponent')
    url = '/'.concat(cmodelo.getAttribute('modelo').replace('.jpg',''))
    var textPalpite = document.getElementById("palpite")
    var palpite = myRequest('POST', url, frase)
    textPalpite.innerText = palpite
    
    Gautor = autor
    Gpalpite = palpite

    ischeck = true
}

//funções para mostrar e ocultar palpite
hiddenPalpite = () =>{
  document.getElementById("loader").style.display = "block";
  document.getElementById("palpite").style.display = "none";
  document.getElementById("pensando").style.display = "block";
}
showPalpite = () => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("palpite").style.display = "block";
    document.getElementById("pensando").style.display = "none";
    for(r in cradio){
      cradio[r].disabled = false
    }
}

validateresposta = (radio) =>{
  if(radio.checked){
    checkresposta(radio);
  }
}

checkresposta = (radio) =>{
  resposta = radio.value
  cradio = radio
  resultado = document.getElementsByClassName('resultado')[0]
  m = document.getElementsByClassName('pnt_modelo')[0]
  p = document.getElementsByClassName('pnt_player')[0]
  var bnt = document.getElementsByClassName("btn-next")[0]
  resultado.style.display = "block";
  bnt.style.display = "block";
  
  if(ischeck){
    if((Gpalpite == Gautor)&&(Gpalpite==resposta)){
      console.log('empate')
      resultado.innerText = "Empate"
      m.innerText = parseInt(m.innerText) + 1
      p.innerText = parseInt(p.innerText) + 1
    }
    if((Gpalpite == Gautor)&&(Gpalpite!=resposta)){
      console.log('modelo acertou')
      resultado.innerText = "Modelo acertou!"
      m.innerText = parseInt(m.innerText) + 1
    }
    if((Gpalpite != Gautor)&&(Gpalpite==resposta)){
      resultado.innerText = "Ambos erraram"
      console.log('ambos erraram')
    }
    if((Gpalpite != Gautor)&&(Gpalpite!=resposta)){
      console.log('voce acertou')
      resultado.innerText = "Voce acertou"
      p.innerText = parseInt(p.innerText) + 1
    }
    ischeck = false
  }
  verifica_vencedor(p.innerText, m.innerText)
}