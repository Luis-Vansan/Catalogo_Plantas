// Função para pegar o parâmetro "id" da URL
function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Função para carregar a planta da API (troque a URL pela sua real)
async function carregarPlanta() {
  const id = getIdFromUrl();
  if (!id) {
    document.getElementById('detalhes-planta').innerHTML = '<p>ID da planta não especificado.</p>';
    return;
  }

  try {
    const resposta = await fetch(`https://sua-api.com/plantas/${id}`);
    if (!resposta.ok) throw new Error('Erro ao buscar planta');

    const planta = await resposta.json();

    document.getElementById('detalhes-planta').innerHTML = `
      <h2>${planta.nome}</h2>
      <img src="${planta.imagem_url}" alt="${planta.nome}" style="max-width: 300px; width: 100%;"/>
      <p><strong>Descrição:</strong> ${planta.descricao}</p>
      <p><strong>Quantidade:</strong> ${planta.quantidade}</p>
      <p><strong>Localização:</strong> ${planta.localizacao}</p>
      <p><strong>Tags:</strong> ${planta.tags}</p>
    `;
  } catch (error) {
    document.getElementById('detalhes-planta').innerHTML = `<p>Erro ao carregar a planta: ${error.message}</p>`;
  }
}

carregarPlanta();
