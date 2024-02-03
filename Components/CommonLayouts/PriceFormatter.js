import CurrencyFormat from 'react-currency-format';

const getCurrencySymbol = (name) => {
    switch (name) {
        case 'usd':
            return '$';
        default:
            return '₹'
    }
}

function PriceFormatter({ amount, display, currency }) {
    const currencySymbol = getCurrencySymbol(currency);
    return (
        <CurrencyFormat value={amount} displayType={display} thousandSeparator={true} prefix={currencySymbol} />
    )
}

export default PriceFormatter