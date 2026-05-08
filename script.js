const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');
const clearBtn = document.getElementById('clearBtn');

// Canvas ko Container ke hisab se resize karna
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 450;
}

window.addEventListener('load', resizeCanvas);

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function finishedPosition() {
    painting = false;
    ctx.beginPath(); 
}

function draw(e) {
    if (!painting) return;

    // Mouse coordinates calculate karna
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Brush settings
    ctx.lineWidth = sizePicker.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Event Listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// Touch support for mobile (Agar mam mobile par check karein)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPosition(e.touches[0]);
});
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e.touches[0]);
});

// Clear Screen
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});