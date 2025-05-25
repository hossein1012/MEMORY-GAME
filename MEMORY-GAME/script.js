// گرفتن ارجاع به المنت‌های صفحه
const gameBoard = document.getElementById('game-board'); // صفحه بازی که کارت‌ها را نمایش می‌دهد
const movesDisplay = document.getElementById('moves'); // نمایش تعداد حرکات انجام شده
const timerDisplay = document.getElementById('timer'); // نمایش زمان سپری شده
const restartButton = document.getElementById('restart-button'); // دکمه شروع مجدد بازی

// تعریف متغیرهای اصلی بازی
let cards = []; // آرایه کارت‌ها
let flippedCards = []; // کارت‌های فعلاً معکوس شده (باز شده)
let moves = 0; // تعداد حرکات انجام شده
let timer; // شناسه تایمر
let seconds = 0; // زمان سپری شده به ثانیه
let matchedPairs = 0; // تعداد جفت‌های پیدا شده

// تابع ساخت دسته کارت‌ها (deck)
function createDeck() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // مقادیر کارت‌ها (۸ جفت)
    cards = [...cardValues, ...cardValues]; // دو بار هر کارت برای جفت شدن
    cards.sort(() => 0.5 - Math.random()); // مرتب‌سازی تصادفی برای شفافیت بازی
}

// تابع راه‌اندازی اولیه بازی
function initializeGame() {
    createDeck(); // ساخت دسته کارت‌ها
    gameBoard.innerHTML = ''; // پاک کردن صفحه بازی
    moves = 0; // صفر کردن تعداد حرکات
    matchedPairs = 0; // صفر کردن تعداد جفت‌های پیدا شده
    seconds = 0; // صفر کردن زمان
    movesDisplay.textContent = moves; // نمایش صفر حرکت
    timerDisplay.textContent = seconds; // نمایش صفر ثانیه

    // ایجاد کارت‌ها در صفحه
    cards.forEach((value, index) => {
        const card = document.createElement('div'); // ساخت عنصر div برای کارت
        card.classList.add('card'); // اضافه کردن کلاس کارت
        card.setAttribute('data-value', value); // ذخیره مقدار کارت در data-value
        card.setAttribute('data-index', index); // ذخیره اندیس کارت
        card.addEventListener('click', flipCard); // افزودن رویداد کلیک برای معکوس کردن کارت
        gameBoard.appendChild(card); // افزودن کارت به صفحه بازی
    });

    clearInterval(timer); // پاک کردن تایمر قبلی اگر وجود داشته باشد
    timer = setInterval(updateTimer, 1000); // شروع تایمر جدید که هر ثانیه اجرا می‌شود
}

// تابع معکوس کردن کارت هنگام کلیک
function flipCard() {
    // فقط اگر کمتر از ۲ کارت معکوس شده باشند و کارت فعلی معکوس یا جفت نشده باشد
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped'); // اضافه کردن کلاس معکوس شده
        this.textContent = this.getAttribute('data-value'); // نمایش مقدار کارت
        flippedCards.push(this); // اضافه کردن کارت به آرایه کارت‌های معکوس شده

        if (flippedCards.length === 2) { // اگر دو کارت معکوس شده باشند
            checkForMatch(); // بررسی تطابق کارت‌ها
        }
    }
}

// تابع بررسی تطابق دو کارت معکوس شده
function checkForMatch() {
    moves++; // افزایش تعداد حرکات
    movesDisplay.textContent = moves; // نمایش تعداد حرکات

    const [firstCard, secondCard] = flippedCards; // گرفتن دو کارت معکوس شده

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        // اگر مقدار دو کارت برابر بود، جفت شده‌اند
        firstCard.classList.add('matched'); // اضافه کردن کلاس جفت شده
        secondCard.classList.add('matched');
        matchedPairs++; // افزایش تعداد جفت‌های پیدا شده

        if (matchedPairs === cards.length / 2) { // اگر همه جفت‌ها پیدا شده باشند
            clearInterval(timer); // توقف تایمر
            alert(`Congratulations! You completed the game in ${seconds} seconds and ${moves} moves.`); // پیام تبریک
        }
    } else {
        // اگر جفت نبودند، بعد از ۱ ثانیه کارت‌ها را برگردان
        setTimeout(() => {
            firstCard.classList.remove('flipped'); // حذف کلاس معکوس شده
            secondCard.classList.remove('flipped');
            firstCard.textContent = ''; // پاک کردن متن کارت
            secondCard.textContent = '';
        }, 1000);
    }

    flippedCards = []; // خالی کردن آرایه کارت‌های معکوس شده برای حرکت بعدی
}

// تابع به‌روزرسانی تایمر هر ثانیه
function updateTimer() {
    seconds++; // افزایش ثانیه‌ها
    timerDisplay.textContent = seconds; // نمایش زمان سپری شده
}

// افزودن رویداد کلیک به دکمه شروع مجدد بازی
restartButton.addEventListener('click', initializeGame);

// شروع بازی هنگام بارگذاری صفحه
initializeGame();
