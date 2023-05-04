import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DeleteIcon from '@mui/icons-material/Delete';




const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));


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
    setData(listBikes.content)
}



useEffect(() => {
    listBikes()
}, [])

  // aqui você pode adicionar ou remover itens da lista

  return (



    <Box  sx={{width: "60rem", display: 'flex', justifyContent: 'center', flexDirection:"column", alignItems: "center"}}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            List bikes
          </Typography>



          <Demo sx= {{width: "70%"}}>
            <List sx={{ color:"rgba(242, 242, 242)"}}>


                
      {data.map(bike => (
        



        <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon color = "error"/>
          </IconButton>
        }
      >
        <ListItemAvatar>

            <DirectionsBikeIcon style={{ color: "rgba(242, 159, 5)" }} />

        </ListItemAvatar>

        <ListItemText
          sx={{ color:"rgba(76, 76, 76)" }}
          primary= {bike.type+": " + bike.model}
          secondary={"R$: " + bike.pricePHour}
        />
      </ListItem>


      ))}
              
               
              
            </List>
          </Demo>
    </Box>

  

  );
}

export default ListBikes