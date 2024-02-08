
// @use-client
import { Box, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search'

const CustomSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    // },
}));

const CustomSearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const CustomStyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '-webkit-fill-available',
    },
}));

function CustomSearchInput(props) {
    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                pl: 2,
                borderRadius: "8px",
            }}
        >
            <InputBase
                placeholder="Search..."
                type="text"
                {...props}
                inputProps={{ "aria-label": "Search..." }}
                fullWidth
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon fontSize='small' />
            </IconButton>
        </Box>
    )
}

export default CustomSearchInput