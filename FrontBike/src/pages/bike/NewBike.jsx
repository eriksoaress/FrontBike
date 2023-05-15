import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Snackbar, TextField, FormControl, InputLabel, FilledInput, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'

export default function NewBike() {

    const [model, setModel] = useState('model')
    const [type, setType] = useState('type')
    const [pricePerHour, setPricePerHour] = useState(10)

    const [mensagem, setMensagem] = useState('')
    const [open, setOpen] = useState()
    const [bikeCreated, setBikeCreated] = useState(false)

    const [modelError, setModelError] = useState(false)
    const [modelErrorMessage, setModelErrorMessage] = useState('');
    const [typeError, setTypeError] = useState(false)
    const [typeErrorMessage, setTypeErrorMessage] = useState('');
    const [priceError, setPriceError] = useState(false)
    const [priceErrorMessage, setPriceErrorMessage] = useState('');


    const modelValidation = () => {
        let errorMessage = '';
        if (model === null || model === '') {
          errorMessage = 'É necessário informar o modelo';
        } else if (model.length < 3) {
          errorMessage = 'O modelo deve ter no mínimo 3 caracteres';
        }
        
        if (errorMessage !== modelErrorMessage) {
          setModelErrorMessage(errorMessage);
          setModelError(!!errorMessage);
        }
        
        return errorMessage;
      };

    const typeValidation = () => {
        let errorMessage = '';
        if (type === null || type === '') {
            errorMessage = 'É necessário informar o tipo'
        }
        if (type.length < 3) {
            errorMessage = 'O tipo deve ter no mínimo 3 caracteres'
        }
        
        if (errorMessage !== typeErrorMessage) {
            setTypeErrorMessage(errorMessage);
            setTypeError(!!errorMessage);
          }
          
          return errorMessage;
    }

    const pricePerHourValidation = () => {
        let errorMessage = '';
        if (pricePerHour === null) {
            errorMessage = 'É necessário informar o Preço por Hora'
        }
        if (!/^\d+(\.\d{1,2})?$/.test(pricePerHour)) {
            errorMessage = 'Formato de preço inválido'
        }
        
        if (errorMessage !== priceErrorMessage) {
            setPriceErrorMessage(errorMessage);
            setPriceError(!!errorMessage);
          }
          
          return errorMessage;
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const handleClick = e => {
        if (!modelError && !typeError && !priceError) {
            
            const data = {
                'model': model,
                'type': type,
                'pricePHour': pricePerHour
            }

            fetch('http://localhost:8080/bike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status === 200) {
                    //listTeams()
                    setMensagem('Bike cadastrada com sucesso!')
                    setOpen(true)
                    setBikeCreated(true)
                }
            }).catch(ex => {
                setMensagem('Erro ao cadastrar bike!')
                setOpen(true)
            })
        } else {
            setMensagem('Não é possível criar uma bike com campos inválidos!')
            setOpen(true)
        }

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
                        <TextField fullWidth id="standard-basic" label="Modelo" color="primary" variant="filled" onChange={e => setModel(e.target.value)} error={!!modelValidation()} helperText={modelValidation()} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField fullWidth id="standard-basic" label="Tipo" color="primary" variant="filled" onChange={e => setType(e.target.value)} error={!!typeValidation()} helperText={typeValidation()} />
                    </Grid>
                    <Grid item xs={12}>             
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Preço por Hora</InputLabel>
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

                {bikeCreated && <Navigate to='/list' /> }

            </Box>
        </>
    )

}