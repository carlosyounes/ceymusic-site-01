// js/playerjs.js
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('meu-audio');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const barraProgresso = document.getElementById('barra-progresso');
  const tempoAtual = document.getElementById('tempo-atual');
  const tempoTotal = document.getElementById('tempo-total');

  // Aborta silenciosamente se o player não estiver presente na página atual
  if (!audio || !btnPlayPause || !barraProgresso || !tempoAtual || !tempoTotal) return;

  // Converte segundos no formato de tempo legível (0:00)
  const formatarTempo = (segundos) => {
      if (isNaN(segundos)) return '0:00';
      const minutos = Math.floor(segundos / 60);
      const restanteSegundos = Math.floor(segundos % 60);
      return `${minutos}:${restanteSegundos < 10 ? '0' : ''}${restanteSegundos}`;
  };

  // Aplica a duração total na tela e inicializa o fundo contrastante da barra
  const configurarDuracao = () => {
      barraProgresso.max = audio.duration;
      tempoTotal.textContent = formatarTempo(audio.duration);
      
      // Garante que a barra comece com o fundo chumbo fosco correto
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      barraProgresso.style.background = `linear-gradient(to right, #00f3ff ${pct}%, #2c313c ${pct}%)`;
  };

  // Gerencia o clique de Play e Pause alternando as classes do CSS
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

  // LÓGICA DO PRELOAD: Se o navegador já carregou os metadados antes do JS iniciar
  if (audio.readyState >= 1) {
      configurarDuracao();
  } else {
      audio.addEventListener('loadedmetadata', configurarDuracao);
  }

  // Atualiza a barra laser, o rastro neon e o cronômetro em tempo real enquanto a música toca
  audio.addEventListener('timeupdate', () => {
      barraProgresso.value = audio.currentTime;
      tempoAtual.textContent = formatarTempo(audio.currentTime);
      
      // Calcula a porcentagem tocada e aplica o rastro laser neon sobre o fundo chumbo fosco
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      barraProgresso.style.background = `linear-gradient(to right, #00f3ff ${pct}%, #2c313c ${pct}%)`;
  });

  // Permite navegar pela música ao arrastar ou clicar na barra de progresso
  barraProgresso.addEventListener('input', () => {
      audio.currentTime = barraProgresso.value;
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      barraProgresso.style.background = `linear-gradient(to right, #00f3ff ${pct}%, #2c313c ${pct}%)`;
  });

  // Reseta o estado visual do player quando a faixa chega ao fim
  audio.addEventListener('ended', () => {
      btnPlayPause.classList.remove('status-tocando');
      btnPlayPause.classList.add('status-pausado');
      barraProgresso.value = 0;
      barraProgresso.style.background = '#2c313c'; // Reseta para o chumbo fosco
      tempoAtual.textContent = '0:00';
  });
});
