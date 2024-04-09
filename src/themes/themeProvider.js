import {createTheme} from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FF5700',
            light: '#ff7832',
            dark: '#cc4500',
            contrastText: 'white'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        color: 'white',
                    }
                }
            }
        }
    }
})