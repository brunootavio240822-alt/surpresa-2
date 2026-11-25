
// =====================================
// SURPRESA DE ANIVERSÁRIO - DUDA
// =====================================

const inicio = document.getElementById("inicio");
const conteudo = document.getElementById("conteudo");
const modal = document.getElementById("modal");
const modalTexto = document.getElementById("modalTexto");

const player = document.getElementById("player");

const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const btnContinuar = document.getElementById("btnContinuar");

// =====================================
// TELA INICIAL
// =====================================

btnSim.addEventListener("click", () => {
  modalTexto.textContent =
    "Ainda bem, você não tinha escolha mesmo 😌";

  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
});

btnNao.addEventListener("click", () => {
  modalTexto.textContent =
    "Você não tem escolha 😌";

  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
});

// =====================================
// CONTINUAR PARA A SURPRESA
// =====================================

btnContinuar.addEventListener("click", () => {
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");

  inicio.classList.add("escondido");
  conteudo.classList.remove("escondido");
  player.classList.remove("escondido");

  observarElementos();
  configurarVideos();

  // A reprodução começa após a interação da pessoa.
  iniciarMusica();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// =====================================
// PLAYLIST
// =====================================

const musicas = [
  {
    nome: "Still Loving You",
    artista: "Scorpions",
    arquivo: "audio/musica1.mp3"
  },
  {
    nome: "Livin' on a Prayer",
    artista: "Bon Jovi",
    arquivo: "audio/musica2.mp3"
  },
  {
    nome: "Creep",
    artista: "Radiohead",
    arquivo: "audio/musica3.mp3"
  }
];

const audio = document.getElementById("audioPlayer");

const nomeMusica = document.getElementById("nomeMusica");
const artistaMusica = document.getElementById("artistaMusica");

const playPause = document.getElementById("playPause");
const anterior = document.getElementById("anterior");
const proxima = document.getElementById("proxima");

let musicaAtual = 0;

function atualizarInformacoes() {
  const musica = musicas[musicaAtual];

  nomeMusica.textContent = musica.nome;
  artistaMusica.textContent = musica.artista;
}

function carregarMusica(indice, reproduzir = true) {
  musicaAtual = (indice + musicas.length) % musicas.length;

  audio.pause();
  audio.src = musicas[musicaAtual].arquivo;
  audio.load();

  atualizarInformacoes();

  if (reproduzir) {
    reproduzirMusica();
  }
}

async function reproduzirMusica() {
  try {
    await audio.play();
    playPause.textContent = "Ⅱ";
  } catch (erro) {
    playPause.textContent = "▶";
    console.warn("Não foi possível reproduzir o áudio:", erro);
  }
}

function iniciarMusica() {
  carregarMusica(0);
}

function avancarMusica() {
  carregarMusica(musicaAtual + 1);
}

function voltarMusica() {
  carregarMusica(musicaAtual - 1);
}

playPause.addEventListener("click", () => {
  if (audio.paused) {
    if (!audio.src) {
      carregarMusica(musicaAtual);
    } else {
      reproduzirMusica();
    }
  } else {
    audio.pause();
  }
});

anterior.addEventListener("click", voltarMusica);
proxima.addEventListener("click", avancarMusica);

audio.addEventListener("ended", avancarMusica);

audio.addEventListener("play", () => {
  playPause.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  playPause.textContent = "▶";
});

// =====================================
// VÍDEOS EM CÂMERA LENTA E SEM ÁUDIO
// =====================================

function configurarVideos() {
  const videos = document.querySelectorAll(".video-item");

  videos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.defaultPlaybackRate = 0.7;
    video.playbackRate = 0.7;

    video.addEventListener("loadedmetadata", () => {
      video.muted = true;
      video.playbackRate = 0.7;
    });

    video.addEventListener("play", () => {
      video.muted = true;
      video.playbackRate = 0.7;

      // Pausa os outros vídeos.
      videos.forEach((outroVideo) => {
        if (outroVideo !== video) {
          outroVideo.pause();
        }
      });
    });
  });
}

// =====================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// =====================================

function observarElementos() {
  const elementos = document.querySelectorAll(".revelar");

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => {
      elemento.classList.add("visivel");
    });

    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elementos.forEach((elemento) => {
    observador.observe(elemento);
  });
}

// =====================================
// PROTEÇÃO DO ÁUDIO DOS VÍDEOS
// =====================================

document.querySelectorAll(".video-item").forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
});
