import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'

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