document.querySelectorAll('.Seeds a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Stop the browser from instantly snapping raw links
        e.preventDefault(); 
        
        // Find the target anchor destination ID string from the clicked href
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Create a black overlay for transition
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'black';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s ease';
            overlay.style.zIndex = '9999';
            overlay.style.pointerEvents = 'none';
            document.body.appendChild(overlay);

            // Small timeout to allow the browser to render the overlay before transitioning
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            // Wait for fade to finish (500ms) before going to destination
            setTimeout(() => {
                // Disable smooth scrolling temporarily to force instant jump
                document.documentElement.style.scrollBehavior = 'auto';

                // Jump to the section while screen is black
                targetSection.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
                
                // Let the browser process the instant scroll before fading back
                setTimeout(() => {
                    // Restore original scroll behavior
                    document.documentElement.style.scrollBehavior = '';
                    
                    // Then fade back from black
                    overlay.style.opacity = '0';
                    
                    // Remove the overlay after it fades out
                    setTimeout(() => {
                        overlay.remove();
                    }, 500);
                }, 50);
            }, 510); // Wait 500ms for transition + 10ms delay
        }
    });
});
