import React, { useState, useEffect } from 'react';

function ListBikes() {



const [data, setData] = useState([])


async function listBikes() {
    let listBikes = await fetch('http://localhost:8080/bike', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        }
        return []
    }).catch(ex => {
        //setMensagem('Erro ao listar times')
        console.log(ex)
        return []
    })
    console.log(listBikes)
    setData(listBikes)
}



useEffect(() => {
    listBikes()
}, [])

  // aqui você pode adicionar ou remover itens da lista

  return (
    <ul>
      {data.map(bike => (
        <li key={bike.id}>{bike.id} - {bike.name}</li>
      ))}
    </ul>
  );
}

export default ListBikes