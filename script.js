async function convertCurrency(fromCurrency, toCurrency, amount) {
    const apiKey = '453e9fa55228c9c5171a2995'

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'error') {
            alert('Erro ao buscar as taxas de câmbio.')
            return;
        }

        const toRate = data.conversion_rates[toCurrency];

        const convertedAmount = amount * toRate;

        return convertedAmount.toFixed(2);

    }catch (error){
        console.log('Erro ao buscas as taxas de câmbio', error);
        alert('Houve um erro ao converter. tente novamente mais tarde')
        
    }
}

document.getElementById('convertBtn').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('fromCurrency').value
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (!amount || amount <= 0) {
        alert('Por favor, insira um valor Válido');
        return;
    }

    const result = await convertCurrency(fromCurrency, toCurrency, amount);

    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency} `
})