// 建築詩学 - 詩的な建築サイト JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // スムーズスクロール
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールに応じたナビゲーション変化
    const navigation = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navigation.style.background = 'rgba(247, 245, 243, 0.98)';
            navigation.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navigation.style.background = 'rgba(247, 245, 243, 0.95)';
            navigation.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // スクロールインジケーターのクリックイベント
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const journeySection = document.querySelector('#journey');
            if (journeySection) {
                journeySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 旅路カードのアニメーション
    const journeyCards = document.querySelectorAll('.journey-card');
    journeyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // 詩カードのアニメーション
    const poemCards = document.querySelectorAll('.poem-card');
    poemCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // ギャラリーアイテムのアニメーション
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // セクションタイトルのアニメーション
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(title);
    });

    // マウス追従効果
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    // パララックス効果（浮遊要素）
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floatingDots = document.querySelectorAll('.floating-dot');
        floatingDots.forEach((dot, index) => {
            const speed = 0.05 + (index * 0.02);
            dot.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ホバーエフェクトの強化
    const cards = document.querySelectorAll('.journey-card, .poem-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('journey-card') || this.classList.contains('poem-card')) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            } else {
                this.style.transform = 'translateY(-8px) scale(1.03)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 詩の内容にタイピング効果（カタカタ表示）
    const poemContents = document.querySelectorAll('.poem-content p');
    const poemContentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                entry.target.classList.add('visible'); // CSSアニメーション用
                
                const originalText = entry.target.textContent;
                entry.target.textContent = '';
                
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < originalText.length) {
                        entry.target.textContent += originalText.charAt(i);
                        i++;
                        
                        // タイピング音効果（控えめ）
                        if (audioContext && isAudioEnabled && Math.random() > 0.7) {
                            createTypingSound();
                        }
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 60); // 60msでカタカタと表示
            }
        });
    }, { threshold: 0.3 });

    poemContents.forEach(content => {
        poemContentObserver.observe(content);
    });

    // 詩カードの建築的パターンアニメーション
    const poemHeaders = document.querySelectorAll('.poem-header');
    poemHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            const pattern = this.querySelector('::before');
            this.style.animationPlayState = 'running';
        });
    });

    // 反射コンテンツのフェードイン効果
    const reflectionContent = document.querySelector('.reflection-content');
    if (reflectionContent) {
        reflectionContent.style.opacity = '0';
        reflectionContent.style.transform = 'translateY(20px)';
        reflectionContent.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(reflectionContent);
    }

    // ロゴの詩的アニメーション
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.color = '#a0927f';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '#8b7b66';
        });
    }

    // 季節に応じた色調調整（簡易版）
    function adjustSeasonalColors() {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-12
        const body = document.body;
        
        if (month >= 3 && month <= 5) {
            // 春: 桜色のアクセント
            body.style.setProperty('--accent-color', '#f8d7da');
        } else if (month >= 6 && month <= 8) {
            // 夏: 青緑のアクセント
            body.style.setProperty('--accent-color', '#d1ecf1');
        } else if (month >= 9 && month <= 11) {
            // 秋: 紅葉色のアクセント
            body.style.setProperty('--accent-color', '#f5c6cb');
        } else {
            // 冬: 雪色のアクセント
            body.style.setProperty('--accent-color', '#e2e3e5');
        }
    }

    adjustSeasonalColors();

    // スクロール進捗インディケーター
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #8b7b66, #d4c4b0);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrolled + '%';
        });
    }

    createScrollIndicator();

    // 音響効果（オプション）
    let audioContext;
    let isAudioEnabled = false;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // ページクリックで音響効果を有効化（ユーザーインタラクション後）
    document.addEventListener('click', function enableAudio() {
        if (!isAudioEnabled) {
            initAudio();
            isAudioEnabled = true;
            document.removeEventListener('click', enableAudio);
        }
    }, { once: true });

    // タイピング音効果
    function createTypingSound() {
        if (!audioContext || !isAudioEnabled) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.005, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // 環境音生成（雨音のような白色雑音）
    function createAmbientSound() {
        if (!audioContext || !isAudioEnabled) return;
        
        const bufferSize = audioContext.sampleRate * 2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
        
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        
        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 10秒後に自動停止
        whiteNoise.start();
        whiteNoise.stop(audioContext.currentTime + 10);
    }

    // ページ読み込み完了後に環境音を開始（控えめに）
    setTimeout(() => {
        if (isAudioEnabled) {
            createAmbientSound();
        }
    }, 3000);

    // デバッグ用：コンソールに詩的メッセージ
    console.log('%c建築詩学 - Architecture as Poetry', 'color: #8b7b66; font-size: 18px; font-family: "Playfair Display", serif;');
    console.log('%c石と光が織りなす言葉、空間に響く無言の詩', 'color: #a0927f; font-size: 12px; font-style: italic;');
    console.log('%c建築とは、人間の精神が物質に与える最も崇高な表現である。', 'color: #666; font-size: 11px;');
});

// パフォーマンス最適化
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // アイドル時間中に重い処理を実行
        console.log('アイドル時間中の最適化処理完了');
    });
}