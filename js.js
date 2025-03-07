const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = 500; // السعر الأساسي للمقعد

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

    // حساب السعر الإجمالي مع زيادة 10 أوقية للمقاعد الأمامية
    let totalPrice = 0;
    selectedSeats.forEach(seat => {
        if (seat.parentElement.classList.contains('front')) {
            totalPrice += ticketPrice + 100;
        } else {
            totalPrice += ticketPrice;
        }
    });

    total.innerText = totalPrice;
}
const qrPaymentButton = document.getElementById('qr-payment');
const codePaymentButton = document.getElementById('code-payment');
const qrCodeDiv = document.getElementById('qr-code');
const paymentCodeDiv = document.getElementById('payment-code');

qrPaymentButton.addEventListener('click', () => {
    // إنشاء رمز QR باستخدام مكتبة QRious
    let qrcode = new QRious({
        value: 'مبلغ الدفع: ' + total.innerText,
        size: 200
    });
    qrCodeDiv.appendChild(qrcode.image);
    paymentCodeDiv.innerHTML = '';
});

codePaymentButton.addEventListener('click', () => {
    // إنشاء كود دفع عشوائي
    const paymentCode = Math.floor(Math.random() * 1000000);
    paymentCodeDiv.innerHTML = 'كود الدفع: ' + paymentCode;
    qrCodeDiv.innerHTML = '';
});


// معالجة تغيير تحديد الفيلم
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

// معالجة النقر على المقعد
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// تهيئة العد والسعر
updateSelectedCount();
