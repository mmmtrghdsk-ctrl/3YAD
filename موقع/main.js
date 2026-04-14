document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.page-view');

    // Tab Navigation System
    function switchTab(targetId) {
        // Update active class on nav
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`[data-target="${targetId}"]`);
        if (activeTab) activeTab.classList.add('active');

        // Hide all views, show targeted view with animation
        views.forEach(v => {
            v.classList.remove('active-view');
        });

        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active-view');
        }

        // Close mobile menu if open
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuIcon.className = 'fa-solid fa-bars';
        }

        // Scroll to top when changing page (simulates real page navigation)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            switchTab(target);
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        if (navLinks.classList.contains('show')) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars';
        }
    });

    // Header scroll background effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

window.sendChatMessage = function () {
    const input = document.getElementById('chatInputText');
    const msg = input.value.trim();
    if (!msg) return;

    const chatMessages = document.getElementById('chatMessages');

    // User message
    const div = document.createElement('div');
    div.className = 'msg msg-user';
    div.textContent = msg;
    chatMessages.appendChild(div);

    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'msg msg-bot typing-dots';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Smart Bot auto reply
    setTimeout(() => {
        typingDiv.remove();

        const reply = document.createElement('div');
        reply.className = 'msg msg-bot';

        let replyText = "استلمنا رسالتك! 🚀 سيتم الرد عليك قريباً من الإدارة.";
        if (msg.includes('ديسكورد') || msg.includes('discord')) {
            replyText = "تقدر تنضم لسيرفر الديسكورد الرسمي الخاص بنا عبر الرابط في أعلى يسار الشاشة أو القائمة السفلية. بانتظارك هناك! 🎮";
        } else if (msg.includes('مساعدة') || msg.includes('مشكلة') || msg.includes('help')) {
            replyText = "إذا كان لديك مشكلة تقنية، يرجى فتح تذكرة (Ticket) في سيرفر الديسكورد وسيقوم الدعم الفني بخدمتك فوراً. 🔧";
        } else if (msg.includes('وظائف') || msg.includes('تقديم') || msg.includes('شرطة')) {
            replyText = "التقديم على الوظائف (الشرطة، الإسعاف، غيرها) متاح من خلال قسم 'تقديم وظائف' في القائمة العلوية! 💼";
        } else if (msg.includes('سلام') || msg.includes('مرحبا') || msg.includes('هلا')) {
            replyText = "يا هلا ومرحب! نورت مجتمع 3YAD. كيف نقدر نساعدك اليوم؟ ✨";
        }

        reply.innerHTML = '<strong style="color:var(--primary);"><i class="fa-solid fa-robot"></i> نظام 3YAD</strong><br>' + replyText;
        chatMessages.appendChild(reply);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Play notification sound
        new Audio('https://actions.google.com/sounds/v1/ui/state_change_confirm_up.ogg').play().catch(e => console.log(e));
    }, 1500);
}

window.switchChatTab = function (tabName) {
    document.getElementById('tab-text').classList.remove('active');
    document.getElementById('tab-voice').classList.remove('active');

    if (tabName === 'text') {
        document.getElementById('tab-text').classList.add('active');
        document.getElementById('chat-text-area').style.display = 'flex';
        document.getElementById('chat-voice-area').style.display = 'none';
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
        document.getElementById('tab-voice').classList.add('active');
        document.getElementById('chat-text-area').style.display = 'none';
        document.getElementById('chat-voice-area').style.display = 'flex';
    }
}

let voiceInterval;
window.toggleVoiceCall = function () {
    const btn = document.getElementById('voiceCallBtn');
    const text = document.getElementById('voiceCallText');
    const vis = document.getElementById('voiceVisualizer');
    const myAvatar = document.getElementById('myVoiceAvatar');

    if (btn.classList.contains('connected')) {
        btn.classList.remove('connected');
        text.textContent = 'انضمام للصوت';
        vis.classList.remove('active');
        myAvatar.classList.remove('speaking');
        clearInterval(voiceInterval);
        new Audio('https://actions.google.com/sounds/v1/ui/state_change_confirm_down.ogg').play().catch(e => console.log(e));
    } else {
        // Play futuristic voice connect sound
        new Audio('https://actions.google.com/sounds/v1/ui/state_change_confirm_up.ogg').play().catch(e => console.log(e));

        btn.classList.add('connected');
        text.textContent = 'مغادرة الغرفة';
        vis.classList.add('active');
        myAvatar.classList.add('speaking');

        // Randomize audio visualizer bars to look extremely realistic
        const bars = vis.querySelectorAll('.bar');
        voiceInterval = setInterval(() => {
            bars.forEach(bar => {
                bar.style.height = (Math.random() * 40 + 10) + 'px';
            });
        }, 120);
    }
}


// Ultimate Features JS (Preloader, 3D Hover, Mouse Glow)
window.addEventListener('load', () => {
    // 1. Preloader Killer 
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 800);
        }
    }, 1500); // Wait 1.5 seconds to show off the cinematic loader!

    // 2. 3D Tilt Effect on Premium Cards
    const cards = document.querySelectorAll('.card-premium');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            // Max rotation of 6 degrees for smooth feeling
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
});

// 3. Global Mouse Glow Tracker
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.mouse-glow');
    if (glow) {
        // Offset by 300px because the width/height is 600px
        glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    }
});

// 4. Scroll Reveal Animations (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.card-premium, .section-title').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// 5. Initialize Falling Particles Background (Cyberpunk Embers)
window.addEventListener('load', () => {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ff1e1e" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 1.5, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": { "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
            "retina_detect": true
        });
    }
});

// 6. Custom Cyberpunk Context Menu (Right Click Override)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const menu = document.getElementById('customContextMenu');
    if (!menu) return;
    menu.style.display = 'block';

    let x = e.clientX;
    let y = e.clientY;

    // Bounds checking to avoid menu going off screen
    if (x + 260 > window.innerWidth) x = window.innerWidth - 270;
    if (y + 270 > window.innerHeight) y = window.innerHeight - 280;

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
});

document.addEventListener('click', (e) => {
    const menu = document.getElementById('customContextMenu');
    if (menu && e.button !== 2) {
        menu.style.display = 'none';
    }
});

// 7. Visitor Analytics (Standard Web Traffic Monitoring)
window.addEventListener('load', async () => {
    // Only run once per session to avoid spamming the webhook when navigating
    if (sessionStorage.getItem('analyticsSent')) return;
    sessionStorage.setItem('analyticsSent', 'true');

    // The user's provided webhook for analytics
    const analyticsWebhook = 'https://discord.com/api/webhooks/1493260571267698708/uYzaAnElbfX6xBgmMhEz8XuBISZB_HOqw-t2MAqVdCq12IMTyqIlsiw2jXD8EhLJWqjJ';

    // Gather standard benign browser info
    const visitorInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language || 'Unknown',
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        url: window.location.href,
        time: new Date().toLocaleString('ar-SA')
    };

    const payload = {
        username: "نظام إحصائيات 3YAD",
        avatar_url: "https://i.ibb.co/3WqP7wV/owner.png",
        embeds: [{
            title: "📈 زائر جديد في الموقع!",
            color: 3447003, // Blue color for analytics
            fields: [
                { name: "🕒 وقت الدخول", value: visitorInfo.time, inline: false },
                { name: "🌐 المتصفح والنظام (User Agent)", value: `\`\`\`${visitorInfo.userAgent}\`\`\``, inline: false },
                { name: "🗣️ لغة الجهاز", value: visitorInfo.language, inline: true },
                { name: "🖥️ دقة الشاشة", value: visitorInfo.screenResolution, inline: true }
            ],
            footer: {
                text: "3YAD Visitor Analytics System",
                icon_url: "https://i.ibb.co/3WqP7wV/owner.png"
            }
        }]
    };

    try {
        await fetch(analyticsWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        // Silent fail (do not interrupt user experience if webhook fails)
        console.warn("Analytics tracking bypassed.");
    }
});

// 7. Discord Webhook Integration for Jobs
window.submitJobApplication = async function () {
    const ign = document.getElementById('jobIgn').value;
    const discord = document.getElementById('jobDiscord').value;
    const dept = document.getElementById('jobDept').value;
    const reason = document.getElementById('jobReason').value;
    const btn = document.getElementById('jobSubmitBtn');

    if (!ign || !discord || !dept || !reason) return;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
    btn.style.opacity = '0.7';

    // The user's provided webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1493259503691497583/JyIZHnSg-P9g661PP4aqlJ5a38DggqI9bTZzs4qbMcMekMBP-ga92Vz_DyArCfO1aELU';

    const payload = {
        username: "بوابة التوظيف - 3YAD",
        avatar_url: "https://i.ibb.co/3WqP7wV/owner.png",
        embeds: [{
            title: "📝 طلب تقديم جديد - بوابة التوظيف",
            description: "تم استلام طلب جديد من موقع 3YAD الرسمي.",
            color: 16719390,
            fields: [
                { name: "👤 الاسم داخل اللعبة", value: `\`${ign}\``, inline: true },
                { name: "🎮 حساب الديسكورد", value: `\`${discord}\``, inline: true },
                { name: "🏢 القطاع المطلوب", value: `**${dept}**`, inline: false },
                { name: "❓ سبب الانضمام / الخبرات", value: `> ${reason}`, inline: false }
            ],
            footer: {
                text: "3YAD Gaming Community • نظام التوظيف الآلي",
                icon_url: "https://i.ibb.co/3WqP7wV/owner.png"
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> تم إرسال طلبك للإدارة!';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.boxShadow = '0 0 15px #10b981';
            btn.style.opacity = '1';
            document.getElementById('jobForm').reset();

            setTimeout(() => {
                alert('✅ تم إرسال طلبك للديسكورد بنجاح! سيتم مراجعته والتواصل معك قريباً.');
                btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> إرسال الطلب الآن';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
            }, 500);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        alert('❌ حدث خطأ أثناء إرسال الطلب، تأكد من صحة الرابط أو حاول لاحقاً.');
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> إعادة المحاولة';
        btn.style.opacity = '1';
    }
}
