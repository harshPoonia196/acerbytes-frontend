import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'

function CustomSearch({ value, onChange, onSearchButtonClick, inputRef, onKeyDown  }) {
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
                value={value}
                onChange={onChange}
                inputProps={{ "aria-label": "Search..." }}
                fullWidth
                onKeyDown={onKeyDown}
                ref={inputRef}
            />
            <IconButton type="submit" aria-label="search" onClick={onSearchButtonClick}>
                <SearchIcon fontSize='small' />
            </IconButton>
        </Box>
    )
}

export default CustomSearch