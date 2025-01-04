addAlbumForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Capturando os valores dos campos corretamente
  const albumName = document.getElementById('albumName').value.trim();
  const artistName = document.getElementById('artistName').value.trim();
  const genre = document.getElementById('genre').value.trim();
  const coverUrl = document.getElementById('coverUrl').value.trim();

  // Verificando se todos os campos têm valores
  if (!albumName || !artistName || !genre || !coverUrl) {
    alert('Por favor, preencha todos os campos.');
    return; // Impede o envio se algum campo estiver vazio
  }

  const album = { albumName, artistName, genre, coverUrl };
  
  try {
    const response = await fetch('https://catalogo-de-discos-3.onrender.com/api/discos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });

    if (response.ok) {
      alert("Disco adicionado com sucesso!");
      fetchAlbums(); // Atualiza a lista de álbuns
    } else {
      alert("Erro ao adicionar disco.");
    }
  } catch (err) {
    console.error("Erro:", err);
  }

  addAlbumForm.reset();
});

async function fetchAlbums() {
  try {
    const response = await fetch('https://catalogo-de-discos-3.onrender.com/api/discos');
    if (response.ok) {
      const albums = await response.json();
      displayAlbums(albums);
    } else {
      console.error("Erro ao buscar álbuns.");
    }
  } catch (err) {
    console.error("Erro:", err);
  }
}

// Função para exibir os álbuns no frontend
function displayAlbums(albums) {
  const albumDisplay = document.getElementById('albumDisplay');
  albumDisplay.innerHTML = ''; // Limpa o conteúdo atual

  albums.forEach(album => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${album.coverUrl}" alt="Capa de ${album.albumName}" />
      <h3>${album.albumName}</h3>
      <p>Artista: ${album.artistName}</p>
      <p>Gênero: ${album.genre}</p>
    `;
    albumDisplay.appendChild(card); // Adiciona o card ao container
  });
}

// Chama a função ao carregar a página
fetchAlbums();

app.use(cors({
  origin: 'https://catalogo-de-discos-4.onrender.com', // Substitua pelo seu domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

