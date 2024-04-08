let participantsList = [
  {
    name: "Jean Pereira",
    email: "jeanxpereira.dev@gmail.com",
    subscriptionDate: new Date(2024, 2, 1, 19, 23),
    checkInDate: new Date(2024, 2, 1, 20, 20)
  },
  {
    name: "Diego Fernandes",
    email: "diego@gmail.com",
    subscriptionDate: new Date(2024, 2, 1, 19, 23),
    checkInDate: new Date(2024, 2, 1, 20, 20)
  },
  {
    name: "Mayk Brito",
    email: "mayk@gmail.com",
    subscriptionDate: new Date(2024, 2, 23, 19, 23),
    checkInDate: null
  },
  {
    name: "Ana Souza",
    email: "ana@gmail.com",
    subscriptionDate: new Date(2024, 0, 3, 19, 23),
    checkInDate: new Date(2024, 0, 4, 20, 20)
  },
  {
    name: "João Silva",
    email: "joao@gmail.com",
    subscriptionDate: new Date(2023, 11, 4, 19, 23),
    checkInDate: new Date(2023, 11, 5, 20, 20)
  },
  {
    name: "Maria Oliveira",
    email: "maria@gmail.com",
    subscriptionDate: new Date(2023, 10, 5, 19, 23),
    checkInDate: null
  },
  {
    name: "Pedro Santos",
    email: "pedro@gmail.com",
    subscriptionDate: new Date(2023, 9, 6, 19, 23),
    checkInDate: new Date(2023, 9, 7, 20, 20)
  },
  {
    name: "Carla Lima",
    email: "carla@gmail.com",
    subscriptionDate: new Date(2023, 8, 7, 19, 23),
    checkInDate: new Date(2023, 8, 8, 20, 20)
  },
  {
    name: "Lucas Sousa",
    email: "lucas@gmail.com",
    subscriptionDate: new Date(2023, 7, 8, 19, 23),
    checkInDate: new Date(2023, 7, 9, 20, 20)
  },
  {
    name: "Paula Costa",
    email: "paula@gmail.com",
    subscriptionDate: new Date(2023, 6, 9, 19, 23),
    checkInDate: null
  },
  {
    name: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    subscriptionDate: new Date(2023, 5, 10, 19, 23),
    checkInDate: null
  }
];

const createNewParticipant = (participant) => {
  const subscriptionDate = dayjs(Date.now())
  .to(participant.subscriptionDate)

  let checkInDate = dayjs(Date.now())
  .to(participant.checkInDate)
  
  if(participant.checkInDate == null) {
    checkInDate = `
      <button
        data-email="${participant.email}"s
        onclick="performCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participant.name}
      </strong>
      <br>
      <small>
        ${participant.email}
      </small>
    </td>
    <td>${subscriptionDate}</td>
    <td>${checkInDate}</td>
  </tr>
  `
}

const updateList = (participantsList) => {
  let output = ""
  for(let participant of participantsList) {
    output = output + createNewParticipant(participant)
  }

  // Substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

updateList(participantsList)

const addParticipant = (event) => {
  event.preventDefault()

  const formEventData = new FormData(event.target)

  const participant = {
    name: formEventData.get('name'),
    email: formEventData.get('email'),
    subscriptionDate: new Date(),
    checkInDate: null  
  }

  // Verificar se o particpante já existe
  const participantExists = participantsList.find(
    (p) => p.email == participant.email
  )

  if(participantExists) {
    alert('Email já cadastrado!')
    return
  }

  participantsList = [participant, ...participantsList]
  updateList(participantsList)

  // Limpar o formulário
  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const performCheckIn = (event) => {
  // Confirmar se realmente quer o check-in
  const confirmationMessage = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(confirmationMessage) == false) {
    return
  }

  // Encontrar o participant dentro da lista
  const participant = participantsList.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // Atualizar o check-in do participante
  participant.checkInDate = new Date()

  // Atualizar a lista participantsList
  updateList(participantsList)
}