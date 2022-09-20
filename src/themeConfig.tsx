import {createTheme} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

const theme = createTheme({
    palette: {
        secondary:{
            main: purple[500]
        }
    }
})

export default theme;