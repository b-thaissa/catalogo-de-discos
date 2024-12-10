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

// Chama a função ao carregar a página
fetchAlbums();
