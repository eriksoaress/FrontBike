import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { NavBar } from '../../components/NavBar';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Snackbar, TextField, FormControl, InputLabel, FilledInput, InputAdornment, FormHelperText, Switch, FormControlLabel, Alert } from '@mui/material'

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

export default function Bike() {

    const [formValid, setFormValid] = useState(true);
    const [model, setModel] = useState('model')
    const [type, setType] = useState('type')
    const [pricePerHour, setPricePerHour] = useState("undefined")
    const [statusUtil, setStatusUtil] = useState()

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

    const handleStatusUtil = () => {
        // Lógica para alterar o valor da variável
        
        const data = {
            'model': model,
            'type': type,
            'pricePHour': pricePerHour,
            'statusUtil': statusUtil
        }

        if (data.type === "type" || data.model === "model" || data.pricePHour === 0 || !!modelValidation() || !!typeValidation() || !!pricePerHourValidation()){
            setFormValid(false);
        } else {
            setFormValid(true);
            fetch('http://localhost:8080/bike/'+id+'/utility', {
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
            window.location.reload();
        }

      };

    async function getBike() {
        let getBike = await fetch('http://localhost:8080/bike/'+id, {
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
    
        
        setType(getBike.type);
        setPricePerHour(getBike.pricePHour);
        setModel(getBike.model);
        setStatusUtil(getBike.statusUtil);
        
    }


    useEffect(() => {
        getBike()
    }, []);

      
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
            'pricePHour': pricePerHour,
            'statusUtil': statusUtil
        }


        if (data.type === "type" || data.model === "model" || data.pricePHour === 0 || !!modelValidation() || !!typeValidation() || !!pricePerHourValidation()){
            setFormValid(false);
        } else {
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


    
    if (pricePerHour === undefined || model=== undefined || type===undefined || statusUtil=== undefined){
        return null ;
    }


    
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
                        {!formValid && (
                        <Alert severity="error">Todos os campos devem ser preenchidos adequadamente.</Alert>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="standard-basic" label={model} color="primary" variant="filled" onChange={e => setModel(e.target.value)} error={!!modelValidation()} helperText={modelValidation()} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField fullWidth id="standard-basic" label={type} color="primary" variant="filled" onChange={e => setType(e.target.value)} error={!!typeValidation()} helperText={typeValidation()} />
                    </Grid>
                    <Grid item xs={12}>             
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount" label='5'>Price per Hour</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                defaultValue={pricePerHour}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={e => setPricePerHour(e.target.value)}
                                error={!!pricePerHourValidation()}
                            />
                            <FormHelperText error={!!pricePerHourValidation()}> {pricePerHourValidation()} </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel control={<Switch checked={statusUtil === "WORKING"} />} onClick={handleStatusUtil} />
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