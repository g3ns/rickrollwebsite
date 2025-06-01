document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const loadingTitle = document.getElementById('loading-title');
    const openButton = document.getElementById('open-button');
    const videoContainer = document.getElementById('video-container');
    const rickRollVideo = document.getElementById('rick-roll-video');
    
    // Loading animation variables
    const loadingTexts = ['Loading', 'Processing', 'Preparing', 'Almost ready'];
    let currentTextIndex = 0;
    
    // Function to animate the loading title
    function animateLoadingTitle() {
        setInterval(() => {
            currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
            loadingTitle.innerHTML = `${loadingTexts[currentTextIndex]}<span class="dots">...</span>`;
        }, 2000);
    }
    
    // Start the loading animation
    animateLoadingTitle();
    
    // Simulate loading time (3 seconds)
    setTimeout(() => {
        // Show the open button after loading completes
        openButton.classList.remove('hidden');
        
        // Update loading text to indicate completion
        loadingTitle.innerHTML = 'Ready<span class="dots">!</span>';
    }, 3000);
    
    // Handle click on the open button
    openButton.addEventListener('click', function() {
        // Change the document title
        document.title = "You've been Rickrolled!";
        
        // Fade out the loading screen
        loadingScreen.classList.add('fade-out');
        
        // Wait for the fade-out animation to complete
        setTimeout(() => {
            // Hide the loading screen and show the video
            loadingScreen.classList.add('hidden');
            videoContainer.classList.remove('hidden');
            
            // Start playing the video
            rickRollVideo.play()
                .then(() => {
                    console.log('Video playback started');
                })
                .catch(error => {
                    console.error('Error playing the video:', error);
                    // Create fallback button if autoplay is blocked
                    if (error.name === 'NotAllowedError') {
                        const playButton = document.createElement('button');
                        playButton.textContent = 'Click to Play';
                        playButton.style.position = 'absolute';
                        playButton.style.zIndex = '20';
                        playButton.style.padding = '1rem 2rem';
                        playButton.style.backgroundColor = '#ff4655';
                        playButton.style.color = 'white';
                        playButton.style.border = 'none';
                        playButton.style.borderRadius = '4px';
                        playButton.style.cursor = 'pointer';
                        
                        playButton.addEventListener('click', () => {
                            rickRollVideo.play();
                            playButton.remove();
                        });
                        
                        videoContainer.appendChild(playButton);
                    }
                });
        }, 500);
    });
});
