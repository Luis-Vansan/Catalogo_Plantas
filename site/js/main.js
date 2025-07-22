let pagina = 1;
const plantasContainer = document.getElementById("plantas");
const mostrarMaisBtn = document.getElementById("mostrarMais");

async function carregarPlantas() {
  // Aqui você vai substituir pela URL real da sua API
  const resposta = await fetch(`https://sua-api.com/plantas?page=${pagina}`);
  const plantas = await resposta.json();

  plantas.forEach(planta => {
    const div = document.createElement("div");
    div.className = "planta";
    div.innerHTML = `
      <img src="${planta.imagem_url}" alt="${planta.nome}" width="100%">
      <h3>${planta.nome}</h3>
      <p>${planta.descricao.substring(0, 80)}...</p>
    `;
    div.onclick = () => {
      window.location.href = `planta.html?id=${planta.id}`;
    };
    plantasContainer.appendChild(div);
  });

  pagina++;
}

mostrarMaisBtn.addEventListener("click", carregarPlantas);

// Carrega os 9 primeiros na inicialização
carregarPlantas();
