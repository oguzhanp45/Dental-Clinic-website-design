/**
 * Q-Line Diş Polikliniği - Maliyet Hesaplama Motoru
 */

// SABİT DEĞERLER (CONSTANTS) - Fiyat değişiklikleri buradan yönetilir
const PRICE_IMPLANT = 25000; // VIP İmplant Başlangıç
const PRICE_FILLING = 1000;  // Ekstra dolgu birim fiyatı

/**
 * Sayfa tamamen yüklendiğinde çalışacak ana fonksiyon.
 * DOM elementlerinin hazır olduğundan emin oluruz.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Hesapla butonunu seçiyoruz
    const calculateButton = document.getElementById('btnCalculate');

    // Butona tıklama olayı ekliyoruz
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateTotalCost);
    }
});

/**
 * Formdaki verileri okuyup toplam tutarı hesaplayan ve 
 * sonucu DOM üzerinde güncelleyen ana fonksiyon.
 */
function calculateTotalCost() {
    
    // 1. GİRDİLERİN ALINMASI (INPUTS)
    const servicePrice = getSelectValue('servicePackage');
    const implantCount = getSelectValue('implantCount');
    const fillingCount = getInputValue('fillingCount');
    
    // Checkbox değerleri (seçili ise değerini, değilse 0 döndürür)
    const mouthShowerPrice = getCheckboxValue('mouthShower');
    const emergencySupportPrice = getCheckboxValue('emergencySupport');

    // 2. HESAPLAMA MANTIĞI (LOGIC)
    // Toplam = Paket + (İmplant Sayısı * Birim Fiyat) + (Dolgu Sayısı * Birim Fiyat) + Ekstralar
    const totalCost = servicePrice 
                    + (implantCount * PRICE_IMPLANT) 
                    + (fillingCount * PRICE_FILLING) 
                    + mouthShowerPrice 
                    + emergencySupportPrice;

    // 3. SONUCUN EKRANA YANSITILMASI (OUTPUT / DOM MANIPULATION)
    updateResultUI(totalCost);
}

/**
 * Belirtilen ID'ye sahip <select> elementinin değerini sayı olarak döndürür.
 * @param {string} elementId 
 * @returns {number}
 */
function getSelectValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? parseInt(element.value) || 0 : 0;
}

/**
 * Belirtilen ID'ye sahip <input type="number"> elementinin değerini döndürür.
 * Negatif sayı kontrolü yapar.
 * @param {string} elementId 
 * @returns {number}
 */
function getInputValue(elementId) {
    const element = document.getElementById(elementId);
    let value = element ? parseInt(element.value) : 0;
    
    // Geçersiz veya negatif girişleri engelle
    if (isNaN(value) || value < 0) {
        value = 0;
    }
    return value;
}

/**
 * Belirtilen ID'ye sahip checkbox işaretli ise value değerini, 
 * değilse 0 döndürür.
 * @param {string} elementId 
 * @returns {number}
 */
function getCheckboxValue(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.checked) {
        return parseInt(element.value) || 0;
    }
    return 0;
}

/**
 * Hesaplanan tutarı Türkçe para formatına çevirip HTML'i günceller.
 * Sonuç alanını görünür yapar.
 * @param {number} amount - Hesaplanan toplam tutar
 */
function updateResultUI(amount) {
    const resultArea = document.getElementById('resultArea');
    const displaySpan = document.getElementById('displayTotal');

    // Türk Lirası formatlama (Örn: 25.000)
    const formattedAmount = new Intl.NumberFormat('tr-TR').format(amount);

    // DOM Güncelleme
    displaySpan.innerText = formattedAmount;

    // Sonuç alanı gizliyse efektli bir şekilde göster
    if (resultArea.style.display === 'none') {
        resultArea.style.display = 'block';
        resultArea.style.animation = 'fadeIn 0.5s ease-in-out';
    }

    // Kullanıcı deneyimi için sonuca doğru hafifçe kaydır
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
}