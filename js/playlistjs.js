// js/playlistjs.js
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('play-audio-elemento');
  const btnPlayPause = document.getElementById('play-btn-controle');
  const barraProgresso = document.getElementById('play-barra-progresso');
  const tempoAtual = document.getElementById('play-tempo-atual');
  const tempoTotal = document.getElementById('play-tempo-total');
  const txtTitulo = document.getElementById('play-titulo');
  const txtAutor = document.getElementById('play-autor');
  const itensFaixa = document.querySelectorAll('#playlist-chumbo .item-faixa');

  if (!audio || !btnPlayPause || itensFaixa.length === 0) return;

  let indiceAtual = 0; // Guarda o índice da música ativa

  const formatarTempo = (s) => {
      if (isNaN(s)) return '0:00';
      const m = Math.floor(s / 60);
      const r = Math.floor(s % 60);
      return `${m}:${r < 10 ? '0' : ''}${r}`;
  };

  // Função para carregar a faixa e atualizar o estado visual
  const carregarMusica = (elementoFaixa) => {
      if (!elementoFaixa) return;
      
      itensFaixa.forEach(f => f.classList.remove('faixa-ativa'));
      elementoFaixa.classList.add('faixa-ativa');

      audio.src = elementoFaixa.getAttribute('data-src');
      txtTitulo.textContent = elementoFaixa.getAttribute('data-titulo');
      txtAutor.textContent = elementoFaixa.getAttribute('data-autor');

      audio.load(); // Reinicia o motor de áudio com a nova mídia
      barraProgresso.value = 0;
      barraProgresso.style.background = '#2c313c';
  };

  // Inicializa a primeira música da playlist
  carregarMusica(itensFaixa[indiceAtual]);

  // Clique de Play / Pause
  btnPlayPause.addEventListener('click', () => {
      if (audio.paused) {
          audio.play();
          btnPlayPause.classList.remove('status-pausado');
          btnPlayPause.classList.add('status-tocando');
      } else {
          audio.pause();
          btnPlayPause.classList.remove('status-tocando');
          btnPlayPause.classList.add('status-pausado');
      }
  });

  // Configura o clique individual em cada linha da lista
  itensFaixa.forEach((faixa, indice) => {
      faixa.addEventListener('click', () => {
          indiceAtual = indice;
          carregarMusica(faixa);
          audio.play();
          btnPlayPause.classList.remove('status-pausado');
          btnPlayPause.classList.add('status-tocando');
      });
  });

  // Atualização da barra de tempo e do rastro laser ciano
  audio.addEventListener('timeupdate', () => {
      barraProgresso.value = audio.currentTime;
      tempoAtual.textContent = formatarTempo(audio.currentTime);
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      barraProgresso.style.background = `linear-gradient(to right, #00f3ff ${pct}%, #2c313c ${pct}%)`;
  });

  audio.addEventListener('loadedmetadata', () => {
      barraProgresso.max = audio.duration;
      tempoTotal.textContent = formatarTempo(audio.duration);
  });

  barraProgresso.addEventListener('input', () => {
      audio.currentTime = barraProgresso.value;
  });

  // AUTOPLAY: Pula automaticamente para a próxima quando a música termina
  audio.addEventListener('ended', () => {
      indiceAtual++;
      if (indiceAtual < itensFaixa.length) {
          carregarMusica(itensFaixa[indiceAtual]);
          audio.play();
      } else {
          // Se era a última, reseta para o início da lista em modo pausado
          indiceAtual = 0;
          carregarMusica(itensFaixa[indiceAtual]);
          btnPlayPause.classList.remove('status-tocando');
          btnPlayPause.classList.add('status-pausado');
      }
  });
});
