const carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total');
  const pedidoFinal = document.getElementById('pedido-final');
  lista.innerHTML = '';

  let soma = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    soma += item.preco;
  });

  total.textContent = `Total: R$ ${soma.toFixed(2)}`;

  const texto = encodeURIComponent(`Olá! Quero fazer um pedido:\n${carrinho.map(i => `• ${i.nome} - R$ ${i.preco.toFixed(2)}`).join('\n')}\n\n*Via WhatsApp + Frete*\nTotal: R$ ${soma.toFixed(2)}`);
  pedidoFinal.href = `https://wa.me/5562998806950?text=${texto}`;
}