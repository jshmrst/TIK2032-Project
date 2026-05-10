document.addEventListener("DOMContentLoaded", function() {
    setActiveNavLink();
    setFooterYear();
    initializeIndexFeatures();
    initializeCalendarWidget();
    initializeGalleryModal();
    initializeBlogModal();
    initializeContactInteractions();
});

function setActiveNavLink() {
    var links = document.querySelectorAll('nav a');
    var current = window.location.pathname.toLowerCase();
    links.forEach(function(link) {
        var href = link.getAttribute('href').toLowerCase();
        if (current.endsWith(href) || (href === 'index.html' && current.endsWith('/')) || (href === 'index.html' && current.indexOf('index.html') !== -1)) {
            links.forEach(function(item) { item.classList.remove('active'); });
            link.classList.add('active');
        }
    });
}

function setFooterYear() {
    var yearItems = document.querySelectorAll('.current-year');
    if (!yearItems.length) {
        return;
    }
    var year = new Date().getFullYear();
    yearItems.forEach(function(item) {
        item.textContent = year;
    });
}

function initializeIndexFeatures() {
    var showcase = document.getElementById('showcase');
    if (!showcase) return;

    var greeting = document.createElement('p');
    greeting.className = 'greeting-text';
    greeting.textContent = getTimeGreeting();
    showcase.appendChild(greeting);

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'learn-more-button';
    button.textContent = 'Pelajari Lebih Lanjut';
    button.addEventListener('click', function() {
        var aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    showcase.appendChild(button);
}

function initializeCalendarWidget() {
    var widget = document.getElementById('calendarWidget');
    if (!widget) {
        return;
    }

    function updateCalendar() {
        var now = new Date();
        var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        widget.textContent = days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
        widget.style.visibility = 'visible';
    }

    updateCalendar();
    setInterval(updateCalendar, 60000);
}

function getTimeGreeting() {
    var hour = new Date().getHours();
    if (hour < 12) {
        return 'Selamat pagi! Semoga hari Anda menyenangkan.';
    }
    if (hour < 18) {
        return 'Selamat siang! Terima kasih sudah berkunjung.';
    }
    return 'Selamat sore! Nikmati portofolio ini.';
}

function initializeGalleryModal() {
    var images = document.querySelectorAll('.gallery-item img');
    var modal = document.getElementById('galleryModal');
    var modalImage = document.getElementById('galleryModalImage');
    var caption = document.getElementById('galleryCaption');
    var close = modal ? modal.querySelector('.close') : null;

    if (!images.length || !modal || !modalImage || !close) {
        return;
    }

    images.forEach(function(img) {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImage.src = img.src;
            caption.textContent = img.alt || 'Foto proyek';
        });
    });

    close.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function initializeBlogModal() {
    var images = document.querySelectorAll('.blog-image');
    var modal = document.getElementById('imageModal');
    var modalImage = document.getElementById('modalImage');
    var caption = document.getElementById('caption');
    var close = modal ? modal.querySelector('.close') : null;

    if (!images.length || !modal || !modalImage || !close) {
        return;
    }

    images.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImage.src = img.src;
            caption.textContent = img.alt || 'Gambar blog';
        });
    });

    close.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function initializeContactInteractions() {
    var emailLink = document.querySelector('a[href^="mailto:"]');
    if (!emailLink) return;

    emailLink.addEventListener('click', function(event) {
        var email = emailLink.getAttribute('href').replace('mailto:', '');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(function() {
                alert('Alamat email disalin: ' + email);
            });
        }
    });
}
