import colors from "../colors";

export default {
    styleOverrides: {
        root: {
            '&.Mui-selected': {
                color: 'white',
                fontWeight: 900,
                backgroundColor: colors.BLACK
            },
            '&.Mui-selected:hover': {
                color: colors.BLACK,
                fontWeight: 900,
                backgroundColor: 'gainsboro'
            }
        },

    },
};




