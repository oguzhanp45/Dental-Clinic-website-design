/**
 * Q-Line Diş Polikliniği - Ana JavaScript Dosyası
 */

// SABİT DEĞERLER
const PRICE_IMPLANT = 25000;
const PRICE_FILLING = 1000;

document.addEventListener('DOMContentLoaded', () => {

    // 1. TEMA YÖNETİMİ (Karanlık Mod)
    initTheme();

    // 2. HESAPLAMA ARACI (Sadece ilgili sayfadaysa çalışır)
    initCalculator();
});

/* --- TEMA AYARLARI --- */
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

    // Hafızayı Kontrol Et
    const savedTheme = localStorage.getItem('qline_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (icon) icon.className = 'fa-solid fa-sun';
    }

    // Buton Tıklama Olayı
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // İkonu değiştir
            if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

            // Hafızaya kaydet
            localStorage.setItem('qline_theme', isDark ? 'dark' : 'light');
        });
    }
}

/* --- MALİYET HESAPLAMA --- */
function initCalculator() {
    const calculateButton = document.getElementById('btnCalculate');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateTotalCost);
    }
}

function calculateTotalCost() {
    // Girdiler
    const servicePrice = getSelectValue('servicePackage');
    const implantCount = getSelectValue('implantCount');
    const fillingCount = getInputValue('fillingCount');
    const mouthShowerPrice = getCheckboxValue('mouthShower');
    const emergencySupportPrice = getCheckboxValue('emergencySupport');

    // Matematik İşlemi
    const totalCost = servicePrice
        + (implantCount * PRICE_IMPLANT)
        + (fillingCount * PRICE_FILLING)
        + mouthShowerPrice
        + emergencySupportPrice;

    // Sonuç Gösterimi
    updateResultUI(totalCost);
}

// YARDIMCI FONKSİYONLAR
function getSelectValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? parseInt(element.value) || 0 : 0;
}

function getInputValue(elementId) {
    const element = document.getElementById(elementId);
    let value = element ? parseInt(element.value) : 0;
    if (isNaN(value) || value < 0) value = 0;
    return value;
}

function getCheckboxValue(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.checked) {
        return parseInt(element.value) || 0;
    }
    return 0;
}

function updateResultUI(amount) {
    const resultArea = document.getElementById('resultArea');
    const displaySpan = document.getElementById('displayTotal');
    const formattedAmount = new Intl.NumberFormat('tr-TR').format(amount);

    displaySpan.innerText = formattedAmount;

    if (resultArea.style.display === 'none') {
        resultArea.style.display = 'block';
        resultArea.style.animation = 'fadeIn 0.5s ease-in-out';
    }
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
}