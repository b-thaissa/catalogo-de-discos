const albumDisplay = document.getElementById('albumDisplay');
const addAlbumForm = document.getElementById('addAlbumForm');
const searchInput = document.getElementById('search');
let albums = [];

// Adicionar novo álbum
addAlbumForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const albumName = document.getElementById('albumName').value;
  const artistName = document.getElementById('artistName').value;
  const genre = document.getElementById('genre').value;
  const coverUrl = document.getElementById('coverUrl').value;

  const album = { albumName, artistName, genre, coverUrl };
  albums.push(album);

  displayAlbums(albums);
  addAlbumForm.reset();
});

// Exibir álbuns dinamicamente
function displayAlbums(list) {
  albumDisplay.innerHTML = '';
  list.forEach(album => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${album.coverUrl}" alt="Capa de ${album.albumName}">
      <h3>${album.albumName}</h3>
      <p>Artista: ${album.artistName}</p>
      <p>Gênero: ${album.genre}</p>
    `;
    albumDisplay.appendChild(card);
  });
}

// Filtrar por pesquisa
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredAlbums = albums.filter(album =>
    album.albumName.toLowerCase().includes(query) ||
    album.artistName.toLowerCase().includes(query)
  );
  displayAlbums(filteredAlbums);
});

// Exibir todos os álbuns
document.getElementById('viewAll').addEventListener('click', () => displayAlbums(albums));
