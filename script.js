// ----- 1. FLOATING HEARTS -----
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Randomly select between Purple and White hearts
    const isPurple = Math.random() > 0.5;
    
    if (isPurple) {
        heart.innerHTML = '💜';
        heart.style.color = '#c084fc';
        heart.style.textShadow = '0 0 20px rgba(192, 132, 252, 0.5)';
    } else {
        heart.innerHTML = '🤍';
        heart.style.color = '#ffffff';
        heart.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
    }
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 14 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
    heart.style.opacity = Math.random() * 0.6 + 0.4;

    container.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 14000);
}

setInterval(createHeart, 400);

window.addEventListener('load', () => {
    for (let i = 0; i < 4; i++) {
        setTimeout(createHeart, i * 200);
    }
});

// ----- 2. OPEN INVITATION MODAL -----
function openInvitation() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// ----- 3. CLOSE INVITATION MODAL -----
function closeInvitation() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Click outside modal to close
window.addEventListener('click', function(event) {
    const modal = document.getElementById('invitationModal');
    if (event.target === modal) {
        closeInvitation();
    }
});

// Escape key to close
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeInvitation();
    }
});

// ----- 4. GET FORM DATA -----
function getFormData() {
    const name = document.getElementById('rsvpName').value.trim();
    const phone = document.getElementById('rsvpPhone').value.trim();
    const attendance = document.getElementById('rsvpAttendance').value;
    const notes = document.getElementById('rsvpNotes').value.trim();
    
    return { name, phone, attendance, notes };
}

function validateForm() {
    const { name, phone, attendance } = getFormData();
    
    if (name === '') {
        alert('🙏 කරුණාකර ඔබගේ නම ඇතුලත් කරන්න.');
        return false;
    }
    
    if (phone === '') {
        alert('📱 කරුණාකර දුරකථන අංකය ඇතුලත් කරන්න.');
        return false;
    }
    
    if (attendance === '') {
        alert('📌 කරුණාකර පැමිණීම තෝරන්න.');
        return false;
    }
    
    return true;
}

// ----- 5. SEND VIA WHATSAPP -----
function sendWhatsApp() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    
    // WhatsApp Number - ඔබගේ WhatsApp අංකය
    const whatsappNumber = '94716516444';
    
    let message = `🎉 *Wedding RSVP Confirmation* 🎉\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📌 *Attendance:* ${attendance}\n`;
    
    if (notes) {
        message += `📝 *Notes:* ${notes}\n`;
    }
    
    message += `\n💒 *Lahiru & Salomi - 14 Sep 2026*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    document.getElementById('rsvpForm').reset();
}

// ----- 6. SEND VIA EMAIL (GMAIL WEB VERSION) -----
function sendEmail() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    
    const emailAddress = 'lahirusujith9999@gmail.com';
    const subject = `Wedding RSVP - ${name}`;
    
    let body = `Wedding RSVP Confirmation\n`;
    body += `==========================\n\n`;
    body += `Name: ${name}\n`;
    body += `Phone: ${phone}\n`;
    body += `Attendance: ${attendance}\n`;
    
    if (notes) {
        body += `\nSpecial Notes:\n${notes}\n`;
    }
    
    body += `\n\n--\nLahiru & Salomi Wedding\n14 September 2026`;
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodedSubject}&body=${encodedBody}`;
    
    window.open(gmailURL, '_blank');
    document.getElementById('rsvpForm').reset();
}

// ----- 7. SHARE INVITATION ON WHATSAPP -----
function shareInvitation() {
    const url = window.location.href;
    const message = `💒 *Lahiru & Salomi Wedding Invitation* 💒\n\nඅපගේ විවාහ උත්සවයට ඔබට ආරාධනා කරනවා!\n\n📅 14 September 2026\n📍 Hotel Thisunya, Anamaduwa\n\nView Invitation: ${url}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ----- 8. COUNTDOWN TIMER -----
var weddingDate = new Date("Sep 14, 2026 00:00:00").getTime();

var countdownInterval = setInterval(function() {
    var now = new Date().getTime();
    var distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "🎉 අදම විවාහය! 🎉";
        clearInterval(countdownInterval);
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        days + "d " + 
        String(hours).padStart(2, '0') + "h " + 
        String(minutes).padStart(2, '0') + "m " + 
        String(seconds).padStart(2, '0') + "s";

}, 1000);

// ----- 9. MUSIC AUTOPLAY -----
document.addEventListener("click", function playMusic() {
    var audio = document.getElementById("music");
    if (audio && audio.paused) {
        audio.play().catch(function() {});
    }
    document.removeEventListener("click", playMusic);
});

window.addEventListener("load", function() {
    var audio = document.getElementById("music");
    if (audio) {
        audio.play().catch(function() {});
    }
});
