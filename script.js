// Navegação entre categorias
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Hide all sections
            menuSections.forEach(section => section.classList.remove('active'));

            // Show selected section
            const selectedSection = document.getElementById(category);
            if (selectedSection) {
                selectedSection.classList.add('active');
                
                // Smooth scroll to section
                selectedSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // Add smooth scroll behavior for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for menu items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        observer.observe(item);
    });

    // Add hover effect sound (optional - can be removed if not needed)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '6px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });

    // Search functionality (optional enhancement)
    function createSearchBar() {
        const nav = document.querySelector('.category-nav');
        const searchContainer = document.createElement('div');
        searchContainer.style.width = '100%';
        searchContainer.style.marginTop = '1rem';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Buscar no cardápio...';
        searchInput.style.width = '100%';
        searchInput.style.padding = '0.75rem 1.5rem';
        searchInput.style.borderRadius = '25px';
        searchInput.style.border = '2px solid var(--primary-color)';
        searchInput.style.fontSize = '1rem';
        searchInput.style.fontFamily = 'Poppins, sans-serif';
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const allMenuItems = document.querySelectorAll('.menu-item');
            
            allMenuItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = searchTerm ? 'none' : 'block';
                }
            });
        });
        
        searchContainer.appendChild(searchInput);
        nav.appendChild(searchContainer);
    }

    //Inclusão de script para adição de classes menu-image

    // Adicionar alt text automaticamente às imagens que não têm
document.addEventListener('DOMContentLoaded', function() {
    const menuImages = document.querySelectorAll('.menu-item img.menu-image');
    
    menuImages.forEach(img => {
        // Adicionar alt text se não existir ou estiver vazio
        if (!img.alt || img.alt === '') {
            const menuItem = img.closest('.menu-item');
            const title = menuItem.querySelector('h3').textContent;
            img.alt = title;
        }
    });
});

    // Uncomment to enable search functionality
    // createSearchBar();
});
