window.onload = function () {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        console.log('Theme toggle button not found!');
        return;
    }
    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) {
        console.log('Theme icon not found!');
        return;
    }

    function setTheme(dark) {
        if (dark) {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            console.log('Set to dark mode');
        } else {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            console.log('Set to light mode');
        }
    }

    // On load, set theme from localStorage (default to dark)
    const userTheme = localStorage.getItem('theme');
    if (userTheme === 'light') {
        setTheme(false);
    } else {
        setTheme(true);
    }

    themeToggle.onclick = function () {
        setTheme(document.body.classList.contains('light-mode'));
        console.log('Theme toggle clicked');
    };
};
// Certificate slider functionality with auto-slide and arrows
window.addEventListener('DOMContentLoaded', function () {
    const certSlider = document.querySelector('.cert-slider');
    const certItems = document.querySelectorAll('.cert-item');
    const leftArrow = document.querySelector('.cert-arrow-left');
    const rightArrow = document.querySelector('.cert-arrow-right');
    
    if (certSlider && certItems.length) {
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Function to scroll to specific index
        function scrollToIndex(index) {
            const itemWidth = certItems[0].offsetWidth + 40; // 40px gap
            certSlider.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
            currentIndex = index;
        }
        
        // Function to go to previous certificate
        function goToPrevious() {
            if (currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            } else {
                scrollToIndex(certItems.length - 1);
            }
        }
        
        // Function to go to next certificate
        function goToNext() {
            if (currentIndex < certItems.length - 1) {
                scrollToIndex(currentIndex + 1);
            } else {
                scrollToIndex(0);
            }
        }
        
        // Function to auto slide from start to end, then back to start
        function autoSlide() {
            goToNext();
        }
        
        // Start auto sliding
        function startAutoSlide() {
            autoSlideInterval = setInterval(autoSlide, 1500); // 1.5 seconds
        }
        
        // Stop auto sliding
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        // Arrow click handlers
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                stopAutoSlide();
                goToPrevious();
                // Restart auto slide after 3 seconds
                setTimeout(startAutoSlide, 3000);
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                stopAutoSlide();
                goToNext();
                // Restart auto slide after 3 seconds
                setTimeout(startAutoSlide, 3000);
            });
        }
        
        // Pause auto slide on hover
        certSlider.addEventListener('mouseenter', stopAutoSlide);
        certSlider.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto slide from the beginning
        startAutoSlide();
    }
});