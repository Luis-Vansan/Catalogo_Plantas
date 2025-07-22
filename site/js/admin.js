const form = document.getElementById('form-adicionar');
const mensagemDiv = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const planta = {
    nome: form.nome.value,
    descricao: form.descricao.value,
    quantidade: parseInt(form.quantidade.value),
    localizacao: form.localizacao.value,
    tags: form.tags.value,
    imagem_url: form.imagem_url.value,
  };

  try {
    const resposta = await fetch('https://sua-api.com/plantas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planta),
    });

    if (!resposta.ok) throw new Error('Falha ao adicionar planta.');

    mensagemDiv.textContent = 'Planta adicionada com sucesso!';
    form.reset();
  } catch (error) {
    mensagemDiv.textContent = `Erro: ${error.message}`;
  }
});
