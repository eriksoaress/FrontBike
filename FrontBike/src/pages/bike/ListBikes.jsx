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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { NavBar } from '../../components/NavBar';
import { Link } from 'react-router-dom';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

function ListBikes() {

const [data, setData] = useState([])
const [page, setPage] = useState(0);
const [pages, setPages] = useState();

const currentBikes = data;

async function deleteBikes(id,currentPage) {
    await fetch('http://localhost:8080/bike/'+id, {
        method: 'DELETE'    
    });

    console.log(page);
    await listBikesPaginator(currentPage);
    
}

async function listBikes() {
    let listBikes = await fetch('http://localhost:8080/bike', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        }
        return []
    }).catch(ex => {

        console.log(ex)
        return []
    })
    
    setPages(listBikes.totalPages);
    setData(listBikes.content);

}

async function listBikesPaginator(p) {
    let listBikes = await fetch('http://localhost:8080/bike?page='+p, {
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
    
    setData(listBikes.content);
    setPage(listBikes.number)
    setPages(listBikes.totalPages);

}

useEffect(() => {
    listBikes()
}, []);

  return (
    <>
    <NavBar/>
    <Box  sx={{width: "60rem", display: 'flex', justifyContent: 'center', flexDirection:"column", alignItems: "center", minWidth: "100%", color: "black"
              }}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Listagem de bikes
          </Typography>

          <Demo sx= {{width: "70%"}}>
            <List sx={{ color:"rgba(242, 242, 242)"}}>
                
      {currentBikes && currentBikes.map(bike => (
        <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => deleteBikes(bike.id,page)}>
            <DeleteIcon color = "error"/>
          </IconButton>
        }
      >
        <ListItemAvatar>

            <DirectionsBikeIcon style={{ color: "rgba(242, 159, 5)" }} />

        </ListItemAvatar>
        <Link to={'/bike/'+bike.id}>
        <ListItemText
          sx={{ color:"rgba(76, 76, 76)" }}
          primary= {bike.type+": " + bike.model}
          secondary={"R$: " + bike.pricePHour}
        />
        </Link>
      </ListItem>
      ))}
              
            </List>
        
          </Demo>

          <Box sx={{ paddingTop: '20px' }}>
              <Stack spacing={2}>
                <Pagination
                  count={pages}
                  shape="rounded"
                  onChange={(e, p) => {
                    setPage(p - 1);
                    listBikesPaginator(p - 1);
                  }}
                />
              </Stack>
    </Box>
    </Box>
    </>
  );
}

export default ListBikes