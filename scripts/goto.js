document.querySelectorAll('.Seeds a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Stop the browser from instantly snapping raw links
        e.preventDefault(); 
        
        // Find the target anchor destination ID string from the clicked href
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Animate a smooth, fluid physical slide downward to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
