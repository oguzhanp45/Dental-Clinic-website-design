/**
 * Q-Line Döviz Çevirici Microapp
 * API: Frankfurter API (Ücretsiz ve açık kaynak)
 */

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amountTRY');

    // Sayfa açılınca verileri çek
    fetchExchangeRates();

    // Kullanıcı sayı girdiğinde tekrar hesapla
    amountInput.addEventListener('input', () => {
        calculate(latestRates); // Hafızadaki son oranlarla hesapla
    });
});

let latestRates = null; // Oranları burada saklayacağız

async function fetchExchangeRates() {
    const statusSpan = document.getElementById('lastUpdate');

    try {
        // API'den veri iste (TL bazlı getir)
        const response = await fetch('https://api.frankfurter.app/latest?from=TRY&to=USD,EUR,GBP');
        const data = await response.json();

        // Verileri sakla
        latestRates = data.rates;

        // Tarih güncelle
        const date = new Date(data.date).toLocaleDateString('tr-TR');
        const dateSpan = document.getElementById('dateDisplay');
        if (dateSpan) {
            dateSpan.innerText = date;
        }

        // İlk hesaplamayı yap
        calculate(latestRates);

    } catch (error) {
        console.error("API Hatası:", error);
        const dateSpan = document.getElementById('dateDisplay');
        if (dateSpan) dateSpan.innerText = "Hata!";
    }
}

function calculate(rates) {
    if (!rates) return;

    const tryAmount = parseFloat(document.getElementById('amountTRY').value) || 0;

    // Matematik: 1 TL = 0.03 Euro ise -> 25000 TL * 0.03

    // Euro Hesapla
    const eurVal = tryAmount * rates.EUR;
    document.getElementById('valEUR').innerText = formatCurrency(eurVal, '€');

    // Dolar Hesapla
    const usdVal = tryAmount * rates.USD;
    document.getElementById('valUSD').innerText = formatCurrency(usdVal, '$');

    // Sterlin Hesapla
    const gbpVal = tryAmount * rates.GBP;
    document.getElementById('valGBP').innerText = formatCurrency(gbpVal, '£');
}

function formatCurrency(amount, symbol) {
    return new Intl.NumberFormat('tr-TR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(amount) + ' ' + symbol;
}