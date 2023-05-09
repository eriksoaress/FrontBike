import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { NavBar } from '../../components/NavBar';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Snackbar, TextField, FormControl, InputLabel, FilledInput, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material'

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

export default function Bike() {

    const [model, setModel] = useState('model')
    const [type, setType] = useState('type')
    const [pricePerHour, setPricePerHour] = useState(10)

    const [mensagem, setMensagem] = useState('')
    const [open, setOpen] = useState()
    const [bikeUses, setUses] = useState([])

    const { id } = useParams();

    
    const modelValidation = () => {
        if (model === null || model === '') {
            return 'Model is required'
        }
        if (model.length < 3) {
            return 'Model must be at least 3 characters'
        }
        return ''
    }

    const typeValidation = () => {
        if (type === null || type === '') {
            return 'Type is required'
        }
        if (type.length < 3) {
            return 'Type must be at least 3 characters'
        }
        return ''
    }

    const pricePerHourValidation = () => {
        if (pricePerHour === null) {
            return 'Price per Hour is required'
        }
        if (!/^\d+(\.\d{1,2})?$/.test(pricePerHour)) {
            return 'Invalid price format'
        }
        return ''
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const handleClick = e => {

        const data = {
            'model': model,
            'type': type,
            'pricePHour': pricePerHour
        }

        fetch('http://localhost:8080/bike/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                setMensagem('Bike atualizada com sucesso')
                setOpen(true)
            }
        }).catch(ex => {
            setMensagem('Erro ao atualizar bike')
            setOpen(true)
        })

    }

    async function listUses() {
        let listUses = await fetch('http://localhost:8090/aluguel?id_bike='+id, {
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
    
        setUses(listUses);
    
    }

    useEffect(() => {
        listUses()
    }, []);

    return (
        <>
            <NavBar/>
            <Box
                sx={{
                    mx: 'auto',
                    marginTop: '200px',
                    width: '40%'
                }}
            >

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id="standard-basic" label="Model" color="primary" variant="filled" onChange={e => setModel(e.target.value)} error={!!modelValidation()} helperText={modelValidation()} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField fullWidth id="standard-basic" label="Type" color="primary" variant="filled" onChange={e => setType(e.target.value)} error={!!typeValidation()} helperText={typeValidation()} />
                    </Grid>
                    <Grid item xs={12}>             
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price per Hour</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={e => setPricePerHour(e.target.value)}
                                error={!!pricePerHourValidation()}
                            />
                            <FormHelperText error={!!pricePerHourValidation()}> {pricePerHourValidation()} </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClick}>Enviar</Button>
                    </Grid>
                </Grid>


                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={mensagem}
                />

            </Box>

        <Box>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                List bikes
            </Typography>

            <Demo sx= {{width: "70%"}}>
                <List sx={{ color:"rgba(242, 242, 242)"}}>
                
            {bikeUses && bikeUses.map(bike => (

                <ListItem>
                    <ListItemAvatar>

                        <DirectionsBikeIcon style={{ color: "rgba(242, 159, 5)" }} />

                    </ListItemAvatar>

                    <ListItemText
                    sx={{ color:"rgba(76, 76, 76)" }}
                    primary= {bike.origem + ": " + bike.status}
                    secondary={bike.diaHoraInicio}
                    />
                </ListItem>

            ))}
              
            </List>
        
          </Demo>
        </Box>
        </>
    )

}