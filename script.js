async function shareInvitationWithImage() {
    const imageUrl = "https://i.ibb.co/p6S5Tc8N/photo18.jpg";
    
    // ✅ පළමුව Name එක අහනවා (Title නැතුව)
    let guestName = prompt('👤 ආරාධනාව ලබන පුද්ගලයාගේ නම ඇතුලත් කරන්න:', '');
    
    if (guestName === null) return;
    if (guestName.trim() === '') {
        alert('🙏 කරුණාකර නමක් ඇතුලත් කරන්න!');
        return;
    }
    guestName = guestName.trim();
    
    // ✅ ඊට පස්සේ Title එක තෝරන්න
    let titleChoice = prompt(
        '👤 Title එක තෝරන්න / Select Title:\n\n' +
        '1. Mr.\n' +
        '2. Miss.\n' +
        '3. Ms.\n' +
        '4. Mrs.\n\n' +
        'අංකය ඇතුලත් කරන්න (1, 2, 3, හෝ 4):',
        '1'
    );
    
    let title = '';
    if (titleChoice === '1' || titleChoice === 'Mr.' || titleChoice === 'mr') {
        title = 'Mr.';
    } else if (titleChoice === '2' || titleChoice === 'Miss.' || titleChoice === 'miss') {
        title = 'Miss.';
    } else if (titleChoice === '3' || titleChoice === 'Ms.' || titleChoice === 'ms') {
        title = 'Ms.';
    } else if (titleChoice === '4' || titleChoice === 'Mrs.' || titleChoice === 'mrs') {
        title = 'Mrs.';
    } else {
        title = 'Mr.';
    }
    
    // ✅ Title + Name display සඳහා
    const fullName = `${title} ${guestName}`;
    
    const baseUrl = window.location.href.split('?')[0];
    const encodedFullName = encodeURIComponent(fullName);
    const shareUrl = `${baseUrl}?name=${encodedFullName}`;
    
    // ✅ WhatsApp Message එක - Image link එක උඩින්
    let message = `${imageUrl}\n\n`;
    message += `💜💜 *Lahiru & Salomi Wedding Invitation* 💜💜\n\n`;
    message += `✨✨ *A Special Invitation for ${fullName}* ✨✨\n\n`;
    message += `📅 *Date:* 14 September 2026\n`;
    message += `📍 *Venue:* Hotel Thisunya, Anamaduwa\n\n`;
    message += `👁️ *View Your Invitation:*\n${shareUrl}\n\n`;
    message += `─────────────────────\n`;
    message += `💜 ඔබගේ පැමිණීම සැප්තැම්බර් 05 දිනට පෙර තහවුරු කරන්න\n`;
    message += `💜 Please confirm your presence by September 5th.\n\n`;
    message += `💗💗 අපගේ ආදර කතාවේ සොඳුරුම පරිච්ඡේදයට ඔබත් සෙනෙහසින් එක්වෙන්නයි සාදරයෙන් ඇරයුම් කරමු! 💗💗`;
    
    // ✅ Mobile Share API - Image එකත් එක්ක
    if (navigator.share) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "wedding-invitation.jpg", { type: "image/jpeg" });
            
            const shareData = {
                title: "Lahiru & Salomi - Wedding Invitation",
                text: message,
                files: [file]  // ← photo18.jpeg උඩින්
            };
            
            await navigator.share(shareData);
            return;
        } catch (err) {
            console.log("Share cancelled:", err);
        }
    }
    
    // ✅ Fallback: WhatsApp Web
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}
