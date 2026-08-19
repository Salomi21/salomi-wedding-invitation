// ----- 1. FLOATING HEARTS -----
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const isPurple = Math.random() > 0.5;
    
    if (isPurple) {
        heart.classList.add('purple');
        heart.innerHTML = '💜';
        heart.style.color = '#c084fc';
        heart.style.textShadow = '0 0 20px rgba(192, 132, 252, 0.4)';
    } else {
        heart.classList.add('white');
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

setInterval(createHeart, 350);

window.addEventListener('load', () => {
    for (let i = 0; i < 6; i++) {
        setTimeout(createHeart, i * 200);
    }
});

// ----- 2. SPARKLE PARTICLES -----
function createSparkle() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.classList.add(Math.random() > 0.5 ? 'purple' : 'white');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.width = (Math.random() * 6 + 3) + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.animationDuration = (Math.random() * 10 + 6) + 's';
    sparkle.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 16000);
}

setInterval(createSparkle, 300);

window.addEventListener('load', () => {
    for (let i = 0; i < 8; i++) {
        setTimeout(createSparkle, i * 150);
    }
});

// ================================================================
// 🎯 GET NAME FROM URL AND DISPLAY PERSONALIZED MESSAGE
// ================================================================

function getGuestNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || '';
}

function displayGuestName() {
    const name = getGuestNameFromURL();
    if (name) {
        const decodedName = decodeURIComponent(name);
        
        const subtitle = document.getElementById('mainSubtitle');
        if (subtitle) {
            subtitle.innerHTML = `💜 ${decodedName} ඔබට ආරාධනා කරනවා! 💜`;
            subtitle.style.color = '#f5edff';
            subtitle.style.fontSize = '16px';
            subtitle.style.letterSpacing = '2px';
        }
        
        const invText = document.getElementById('invitationText');
        if (invText) {
            invText.innerHTML = `💜 ${decodedName}, අපගේ විවාහ උත්සවයට ඔබට ආරාධනා කරනවා!<br>With hearts full of love and joy, we invite you to celebrate our wedding!`;
        }
    }
}

// ================================================================
// 🎯 SHOW/HIDE SHARE BUTTON BASED ON URL PARAMETER
// ================================================================

function checkAndHideButtons() {
    const params = new URLSearchParams(window.location.search);
    const hasName = params.get('name') || '';
    const isQR = params.get('qr') === 'true';
    
    const shareContainer = document.getElementById('shareButtonContainer');
    if (shareContainer) {
        if (hasName || isQR) {
            shareContainer.style.display = 'none';
        } else {
            shareContainer.style.display = 'block';
        }
    }
}

// ================================================================
// 🎯 SHARE INVITATION WITH IMAGE + NAME (WhatsApp)
// ================================================================

async function shareInvitationWithImage() {
    const imageUrl = "https://i.ibb.co/Q78bqW2y/sticker.webp";
    
    // Name එක අහනවා
    let guestName = prompt('👤 ආරාධනාව ලබන පුද්ගලයාගේ නම ඇතුලත් කරන්න:', '');
    
    if (guestName === null) return;
    if (guestName.trim() === '') {
        alert('🙏 කරුණාකර නමක් ඇතුලත් කරන්න!');
        return;
    }
    guestName = guestName.trim();
    
    const baseUrl = window.location.href.split('?')[0];
    const encodedName = encodeURIComponent(guestName);
    const shareUrl = `${baseUrl}?name=${encodedName}`;
    
    // Message එක හදන්න
    let message = `💜💜 *Lahiru & Salomi Wedding Invitation* 💜💜\n\n`;
    message += `✨✨ *A Special Invitation for ${guestName}* ✨✨\n\n`;
    message += `📅 *Date:* 14 September 2026\n`;
    message += `📍 *Venue:* Hotel Thisunya, Anamaduwa\n\n`;
    message += `👁️ *View Your Invitation:*\n${shareUrl}\n\n`;
    message += `─────────────────────\n`;
    message += `💜 ඔබගේ පැමිණීම සැප්තැම්බර් 05 දිනට පෙර තහවුරු කරන්න\n`;
    message += `💜 Please confirm your presence by September 5th.\n\n`;
    message += `💗💗 අපගේ ආදර කතාවේ සොඳුරුම පරිච්ඡේදයට ඔබත් සෙනෙහසින් එක්වෙන්නයි සාදරයෙන් ඇරයුම් කරමු! 💗💗`;
    
    // Mobile Share API try කරන්න
    if (navigator.share) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "invitation.jpg", { type: "image/jpeg" });
            
            const shareData = {
                title: "Lahiru & Salomi - Wedding Invitation",
                text: message,
                files: [file]
            };
            
            await navigator.share(shareData);
            return;
        } catch (err) {
            console.log("Share cancelled:", err);
            return;
        }
    }
    
    // Fallback: WhatsApp Web
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ================================================================
// 🎯 CHECK IF VIEWED VIA QR CODE
// ================================================================

function checkQRCode() {
    const params = new URLSearchParams(window.location.search);
    const isQR = params.get('qr');
    
    if (isQR === 'true') {
        // Hide share button
        const shareContainer = document.getElementById('shareButtonContainer');
        if (shareContainer) {
            shareContainer.style.display = 'none';
        }
        
        // Auto open invitation after 1.5 seconds
        setTimeout(function() {
            openDoorAnimation();
        }, 1500);
    }
}

// ================================================================
// 🚪 SLOW DOOR OPEN ANIMATION - 5 SECONDS TOTAL
// ================================================================

function openDoorAnimation() {
    const doorOverlay = document.getElementById('doorOverlay');
    const mainCard = document.getElementById('mainCard');
    
    // Reset door
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'none';
    doorOverlay.style.opacity = '0';
    
    // Reset BG image
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
        bgImage.style.transition = 'opacity 3.5s ease';
    }
    
    // Hide main card
    mainCard.style.transition = 'opacity 0.5s ease';
    mainCard.style.opacity = '0';
    
    setTimeout(() => {
        mainCard.style.display = 'none';
    }, 500);
    
    // Show door overlay with fade in
    setTimeout(() => {
        doorOverlay.style.display = 'flex';
        doorOverlay.style.opacity = '1';
        doorOverlay.style.transition = 'opacity 0.6s ease';
    }, 50);
    
    // 🐌 SLOW DOOR OPEN - starts after 0.5s, takes 3.5s
    setTimeout(() => {
        doorOverlay.classList.add('open');
        
        // 🐌 SLOW BG IMAGE - appears slowly over 3.5s
        setTimeout(() => {
            if (bgImage) {
                bgImage.style.opacity = '0.85';
            }
        }, 100);
        
    }, 500);
    
    // 🐌 SLOW INVITATION - shown after door fully opens (5s total)
    setTimeout(() => {
        doorOverlay.classList.add('hidden');
        setTimeout(() => {
            doorOverlay.style.display = 'none';
            // 🐌 SLOW INVITATION FADE IN - 3 seconds
            openInvitationVerySlow();
        }, 400);
    }, 5000);
}

// ================================================================
// 🎯 OPEN INVITATION WITH VERY SLOW FADE IN (3s)
// ================================================================

function openInvitationVerySlow() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.add('show');
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'modalVerySlowFadeIn 3s ease forwards';
        }
        document.body.style.overflow = 'hidden';
    }
}

// ================================================================
// 🎯 CLOSE INVITATION AND GO BACK TO MAIN PAGE
// ================================================================

function closeInvitationAndGoBack() {
    const modal = document.getElementById('invitationModal');
    const mainCard = document.getElementById('mainCard');
    
    // Close modal
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Reset door for next time
    const doorOverlay = document.getElementById('doorOverlay');
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'none';
    doorOverlay.style.opacity = '0';
    
    // Reset BG image
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
    }
    
    // Show main card with fade in
    setTimeout(() => {
        mainCard.style.display = 'block';
        mainCard.style.opacity = '0';
        mainCard.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            mainCard.style.opacity = '1';
        }, 100);
    }, 300);
}

// ----- CLOSE INVITATION MODAL (Normal close) -----
function closeInvitation() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('invitationModal');
    if (event.target === modal) {
        closeInvitationAndGoBack();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeInvitationAndGoBack();
    }
});

// ================================================================
// 🎯 SHARE INVITATION (Normal - without image)
// ================================================================

function shareInvitation() {
    let guestName = prompt('👤 ආරාධනාව ලබන පුද්ගලයාගේ නම ඇතුලත් කරන්න:', '');
    
    if (guestName === null) return;
    if (guestName.trim() === '') {
        alert('🙏 කරුණාකර නමක් ඇතුලත් කරන්න!');
        return;
    }
    guestName = guestName.trim();
    
    const url = window.location.href.split('?')[0];
    const encodedName = encodeURIComponent(guestName);
    const shareUrl = `${url}?name=${encodedName}`;
    
    let message = `💜💜 *Lahiru & Salomi Wedding Invitation* 💜💜\n\n`;
    message += `✨✨ *A Special Invitation for ${guestName}* ✨✨\n\n`;
    message += `📅 *Date:* 14 September 2026\n`;
    message += `📍 *Venue:* Hotel Thisunya, Anamaduwa\n\n`;
    message += `👁️ *View Your Invitation:*\n${shareUrl}\n\n`;
    message += `─────────────────────\n`;
    message += `💜 ඔබගේ පැමිණීම සැප්තැම්බර් 05 දිනට පෙර තහවුරු කරන්න\n`;
    message += `💜 Please confirm your presence by September 5th.\n\n`;
    message += `💗💗 අපගේ ආදර කතාවේ සොඳුරුම පරිච්ඡේදයට ඔබත් සෙනෙහසින් එක්වෙන්නයි සාදරයෙන් ඇරයුම් කරමු! 💗💗`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ----- GET FORM DATA -----
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

// ================================================================
// 📤 SEND RSVP DATA TO GOOGLE SHEETS
// ================================================================

function saveToGoogleSheets(formData) {
    // ⚠️ මෙතනට ඔයාගේ Web App URL එක දාන්න
    const WEB_APP_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
    
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        console.log('✅ Data sent to Google Sheets!');
    })
    .catch(error => {
        console.error('❌ Error:', error);
    });
}

// ----- SEND VIA WHATSAPP (RSVP) -----
function sendWhatsApp() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    
    // Save to Google Sheets first
    saveToGoogleSheets({ name, phone, attendance, notes });
    
    const whatsappNumber = '94716521119';
    
    let message = `🎉 *Wedding RSVP Confirmation* 🎉\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📌 *Attendance:* ${attendance}\n`;
    
    if (notes) {
        message += `📝 *Notes:* ${notes}\n`;
    }
    
    message += `\n💒 *Lahiru & Salomi - 14 September 2026*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    document.getElementById('rsvpForm').reset();
}

// ----- SEND VIA EMAIL (GMAIL WEB) -----
function sendEmail() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    
    // Save to Google Sheets first
    saveToGoogleSheets({ name, phone, attendance, notes });
    
    const emailAddress = 'salomirechali9999@gmail.com';
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

// ----- COUNTDOWN TIMER -----
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

// ================================================================
// 🎵 MUSIC - FORCE AUTO-PLAY
// ================================================================

var audio = document.getElementById('bgMusic');
var musicIcon = document.getElementById('musicIcon');
var isMusicPlaying = false;
var musicStarted = false;

function forceAutoPlay() {
    if (audio && !musicStarted) {
        var hiddenButton = document.createElement('button');
        hiddenButton.style.display = 'none';
        document.body.appendChild(hiddenButton);
        
        hiddenButton.click();
        
        audio.play().then(function() {
            isMusicPlaying = true;
            musicStarted = true;
            if (musicIcon) {
                musicIcon.textContent = '🔊';
            }
            console.log('🎵 Music playing automatically!');
        }).catch(function(error) {
            console.log('Auto-play blocked:', error);
            if (musicIcon) {
                musicIcon.textContent = '🔊';
            }
            setTimeout(function() {
                if (!musicStarted) {
                    forceAutoPlay();
                }
            }, 1000);
        });
        
        setTimeout(function() {
            if (hiddenButton.parentNode) {
                hiddenButton.parentNode.removeChild(hiddenButton);
            }
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayGuestName();
    checkAndHideButtons();
    checkQRCode();  // QR code check එක
    
    setTimeout(forceAutoPlay, 100);
    setTimeout(forceAutoPlay, 300);
    setTimeout(forceAutoPlay, 500);
    setTimeout(forceAutoPlay, 1000);
    setTimeout(forceAutoPlay, 2000);
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden && !musicStarted) {
        setTimeout(forceAutoPlay, 200);
    }
});

function backupPlay() {
    if (!musicStarted) {
        forceAutoPlay();
    }
}

document.addEventListener('click', backupPlay);
document.addEventListener('touchstart', backupPlay);
document.addEventListener('scroll', backupPlay);

function toggleMusic() {
    if (audio) {
        if (isMusicPlaying) {
            audio.pause();
            isMusicPlaying = false;
            if (musicIcon) {
                musicIcon.textContent = '🔇';
            }
        } else {
            audio.play().then(function() {
                isMusicPlaying = true;
                musicStarted = true;
                if (musicIcon) {
                    musicIcon.textContent = '🔊';
                }
            }).catch(function(error) {
                console.log('Play failed:', error);
            });
        }
    }
}

// ================================================================
// 🎯 LIGHTBOX FUNCTIONS
// ================================================================

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    const imgSrc = element.querySelector('img').src;
    const imgAlt = element.querySelector('img').alt || 'Memory';
    
    img.src = imgSrc;
    caption.textContent = imgAlt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
