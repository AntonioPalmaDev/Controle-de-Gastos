const form = document.getElementById('gastoForm');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Evita que o formulário seja enviado de forma tradicional

  const formData = new URLSearchParams();
  formData.append('data', form.data.value);
  formData.append('categoria', form.categoria.value);
  formData.append('valor', form.valor.value.replace('.', ','));
  formData.append('descricao', form.descricao.value);  // Novo campo

  fetch('https://script.google.com/macros/s/AKfycbzaUJM1BIr5D-fc0FQMdzlGUUH0ygCCc-SkXreuSBKluQKRFU6nAcHw8E7ThLF3GiId/exec', {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(res => {
    mostrarNotificacao('Gasto adicionado com sucesso!');

    form.reset();  
  })
  .catch(err => {
    mostrarNotificacao('Erro ao enviar: ' + err.message, 'erro');

  });
});



function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notif = document.getElementById('notificacao');
    const texto = document.getElementById('notificacao-texto');
    const icone = document.getElementById('notificacao-icone');
  
    texto.textContent = mensagem;
    notif.classList.remove('erro');
  
    if (tipo === 'erro') {
      notif.classList.add('erro');
      icone.textContent = '❌';
    } else {
      icone.textContent = '✔️';
    }
  
    notif.classList.add('mostrar');
  
    setTimeout(() => {
      notif.classList.remove('mostrar');
    }, 3000);
  }
  