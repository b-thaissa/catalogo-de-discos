addAlbumForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const albumName = document.getElementById('albumName').value;
  const artistName = document.getElementById('artistName').value;
  const genre = document.getElementById('genre').value;
  const coverUrl = document.getElementById('coverUrl').value;

  const album = { albumName, artistName, genre, coverUrl };
  try {
      const response = await fetch('http://localhost:3000/api/discos', {
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
      const response = await fetch('http://localhost:3000/api/discos');
      if (response.ok) {
          albums = await response.json();
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
