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
            
            // Wait for fade to finish, then snap to section and fade in
            setTimeout(() => {
                // Temporarily disable smooth scrolling on html to ensure instant snap
                const html = document.documentElement;
                const originalScrollBehavior = html.style.scrollBehavior;
                html.style.scrollBehavior = 'auto';

                targetSection.scrollIntoView({
                    behavior: 'auto', // CSS scrollBehavior is 'auto', making this instant
                    block: 'start'
                });
                
                // Fade back from black
                overlay.style.opacity = '0';
                
                // Restore original scroll behavior
                html.style.scrollBehavior = originalScrollBehavior;

                // Remove the overlay after it fades out
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 510); // Wait 500ms for transition + 10ms delay
        }
    });
});
