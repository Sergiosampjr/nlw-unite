let participantes = [
  {
    nome: "Sérgio Nunes Sampaio Junior",
    email: "sergio.sampaio@aluno.uece.br",
    dataInscricao: new Date(2024, 2, 01, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Maik Brito",
    email: "maik@gmail.com",
    dataInscricao: new Date(2024, 1, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Ana Souza",
    email: "ana.souza@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 15, 30),
    dataCheckIn: null
  },
  {
    nome: "Pedro Lima",
    email: "pedro.lima@yahoo.com",
    dataInscricao: new Date(2024, 2, 12, 18, 10),
    dataCheckIn: new Date(2024, 2, 15, 17, 20)
  }

];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()) 
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email = "${participante.email}"
      onclick = "fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    
    `
  }

  return ` 
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
</tr> 
`

}


const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante) 
  }
  // Substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
} 
atualizarLista(participantes)

const adicionarparticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
 
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // Verificar se o participante existe.
  const partiicpanteExiste = participantes.find(
    (p) =>  p.email == participante.email   
  )
  if (partiicpanteExiste){
    alert('O participante já está cadastrado')
    return
  }
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //Limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}   

const fazerCheckIn = (event) => {
  //Confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false){
    return alert('Check-in não confirmado:') 
  }
  else{
    alert('Check-in confirmado:')
  }
  //Encontrar o participante dentro da lista
  const participante = participantes.find((p) => 
   p.email == event.target.dataset.email
  )
  //Atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //Atualizar a lista de participantes
  atualizarLista(participantes)
}
