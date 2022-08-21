var btnPlay = document.getElementById('player')
var btnStop = document.getElementById('stop')
var btnBack = document.getElementById('btnBack')
var btnForward = document.getElementById('btnForward')
var song = document.getElementById('music')
var barra = document.getElementsByTagName('input')[0]
var fim = document.getElementById('fim')
var inicio = document.getElementById('inicio')
var index = 0
var nomeMusica = document.getElementsByTagName('h3')[0]
var nomeArtista = document.getElementsByTagName('i')[0]
var imagemMusica = document.getElementById('foto')


// Musicas cadastradas
var musicas = [
    {
        titulo: 'Enough',
        artista: 'NEFEX' ,
        imagem: 'images/img-1.jpg' , 
        musica: 'audio/Enough - NEFFEX.mp3' ,
    },
    {
        titulo: 'Out On My Skateboard',
        artista: 'Mini Vandals' ,
        imagem: 'images/img-2.jpg' , 
        musica: 'audio/Out On My Skateboard - Mini Vandals.mp3' ,
    },
    {
        titulo: 'Retribution',
        artista: 'NEFEX' ,
        imagem: 'images/img-3.jpg' , 
        musica: 'audio/Retribution - NEFFEX.mp3' ,
    },
    {
        titulo: 'Ruthless',
        artista: 'NEFEX' ,
        imagem: 'images/img-4.jpg' , 
        musica: 'audio/Ruthless - NEFFEX.mp3' ,
    },
    {
        titulo: 'Thunder',
        artista: 'NEFEX' ,
        imagem: 'images/img-5.jpg' , 
        musica: 'audio/Thunder - Telecasted.mp3' ,
    }
]

// Evento que ocorre a atualização da barra constantemente
song.addEventListener('timeupdate', atualizarBarra)

// Ligação entre a barra e o current da musica
barra.addEventListener('change', changeBarra)

// Eventos teclado
document.addEventListener('keydown', (e)=>{
    if(e.which == 39){
        index++
        if(index>musicas.length - 1){
            index=0
        }
        renderizarMusica(index)
    }   
})
document.addEventListener('keydown', (e)=>{
    if(e.which == 37){
        index--
        if(index<0){
            index = musicas.length - 1
        }
        renderizarMusica(index)
    }   
})

// Eventos click
btnBack.addEventListener('click', ()=>{
    index--

     if(index<0){
        index = musicas.length - 1
    }
    renderizarMusica(index)
    song.play()
    btnPlay.style.display = 'none'
    btnStop.style.display = 'inline-block'

})

btnForward.addEventListener('click', ()=>{
    index++
    if(index>musicas.length - 1){
        index=0 
    }
    renderizarMusica(index)
    song.play()
    btnPlay.style.display = 'none'
    btnStop.style.display = 'inline-block'

})
 
btnPlay.addEventListener("click", function(){
    song.play()
    btnPlay.style.display = 'none'
    btnStop.style.display = 'inline-block'
} )
 
btnStop.addEventListener('click', function(){
    song.pause()
    btnStop.style.display = 'none'
    btnPlay.style.display = 'inline-block'
})

// Muda todas as características das músicas quando forem  passadas 
function renderizarMusica(index){
    if(index > musicas.length - 1){
        index=0
    }
    song.setAttribute('src', musicas[index].musica)
    song.addEventListener('loadeddata', ()=>{
    nomeArtista.innerText = musicas[index].artista
    nomeMusica.innerText = musicas[index].titulo
    foto.src = musicas[index].imagem
    inicio.innerText = formatarTempo(Math.floor(song.currentTime))
    fim.innerHTML = formatarTempo(Math.floor(song.duration - song.currentTime))
    song.play()
    barra.value = 0
    })
}

// Atualizar a barra e a duração do tempo
function atualizarBarra(){
    
    const porcent = Math.floor((song.currentTime / song.duration)* 100)
    barra.value = porcent
    fim.innerText = formatarTempo(Math.floor(song.duration - song.currentTime))
    inicio.innerText = formatarTempo(Math.floor(song.currentTime))
    if(fim.innerText=='00:00'){
        index++
        renderizarMusica(index)
    }    
}
// Ligação entre o valor da barra com o current da música - quando arrastar a barra muda o tempo da musica
function changeBarra(){
    song.currentTime = barra.value / barra.max * song.duration
    song.play()
    btnPlay.style.display = 'none'
    btnStop.style.display = 'inline-block'
   
}
// Função de formatação do tempo de segundo para minutos 
function formatarTempo(tempo){
    let minuto = Math.floor(tempo / 60)
    let segundos = tempo % 60
    if(minuto<10){
        minuto = "0" + minuto
    }
    if(segundos<10){
        segundos = "0" + segundos
    }
    return(minuto+':'+segundos)
}
// Atualizar assim que carregar
renderizarMusica(index)