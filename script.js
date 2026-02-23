// Empty Plates - Photo data
// Original image ratio: 3024x4032 (portrait, 3:4 ratio)
// Display size: 210px width, 280px height to maintain aspect ratio
const photos = [
    { url: 'images/2023-berlin-01.jpg',             width: 210, height: 280, year: '2023', location: 'Berlin' },
    { url: 'images/2025-tokyo-01.jpg',              width: 210, height: 280, year: '2025', location: 'Tokyo' },
    { url: 'images/2022-new-york-02.jpg',           width: 210, height: 280, year: '2022', location: 'New York' },
    { url: 'images/2024-heraklion-01.jpg',          width: 210, height: 280, year: '2024', location: 'Heraklion' },
    { url: 'images/2023-copenhagen-03.jpg',         width: 210, height: 280, year: '2023', location: 'Copenhagen' },
    { url: 'images/2022-munich-01.jpg',             width: 210, height: 280, year: '2022', location: 'Munich' },
    { url: 'images/2025-hamburg-01.jpg',            width: 210, height: 280, year: '2025', location: 'Hamburg' },
    { url: 'images/2023-nuernberg-02.jpg',          width: 210, height: 280, year: '2023', location: 'Nürnberg' },
    { url: 'images/2024-porto-01.jpg',              width: 210, height: 280, year: '2024', location: 'Porto' },
    { url: 'images/2022-berlin-02.jpg',             width: 210, height: 280, year: '2022', location: 'Berlin' },
    { url: 'images/2023-vienna-01.jpg',             width: 210, height: 280, year: '2023', location: 'Vienna' },
    { url: 'images/2025-nara-01.jpg',               width: 210, height: 280, year: '2025', location: 'Nara' },
    { url: 'images/2022-copenhagen-01.jpg',         width: 210, height: 280, year: '2022', location: 'Copenhagen' },
    { url: 'images/2024-lisbon-01.jpg',             width: 210, height: 280, year: '2024', location: 'Lisbon' },
    { url: 'images/2023-bolzano-01.jpg',            width: 210, height: 280, year: '2023', location: 'Bolzano' },
    { url: 'images/2022-new-york-01.jpg',           width: 210, height: 280, year: '2022', location: 'New York' },
    { url: 'images/2024-wuerzburg-01.jpg',          width: 210, height: 280, year: '2024', location: 'Würzburg' },
    { url: 'images/2023-matera-01.jpg',             width: 210, height: 280, year: '2023', location: 'Matera' },
    { url: 'images/2025-tokyo-02.jpg',              width: 210, height: 280, year: '2025', location: 'Tokyo' },
    { url: 'images/2022-berlin-03.jpg',             width: 210, height: 280, year: '2022', location: 'Berlin' },
    { url: 'images/2024-heidelberg-01.jpg',         width: 210, height: 280, year: '2024', location: 'Heidelberg' },
    { url: 'images/2023-copenhagen-01.jpg',         width: 210, height: 280, year: '2023', location: 'Copenhagen' },
    { url: 'images/2022-nuernberg-01.jpg',          width: 210, height: 280, year: '2022', location: 'Nürnberg' },
    { url: 'images/2025-hamburg-02.jpg',            width: 210, height: 280, year: '2025', location: 'Hamburg' },
    { url: 'images/2023-berlin-02.jpg',             width: 210, height: 280, year: '2023', location: 'Berlin' },
    { url: 'images/2024-sagres-01.jpg',             width: 210, height: 280, year: '2024', location: 'Sagres' },
    { url: 'images/2022-new-york-03.jpg',           width: 210, height: 280, year: '2022', location: 'New York' },
    { url: 'images/2023-nuernberg-01.jpg',          width: 210, height: 280, year: '2023', location: 'Nürnberg' },
    { url: 'images/2022-heidelberg-01.jpg',         width: 210, height: 280, year: '2022', location: 'Heidelberg' },
    { url: 'images/2024-nazare-01.jpg',             width: 210, height: 280, year: '2024', location: 'Nazaré' },
    { url: 'images/2023-lavagna-01.jpg',            width: 210, height: 280, year: '2023', location: 'Lavagna' },
    { url: 'images/2022-berlin-01.jpg',             width: 210, height: 280, year: '2022', location: 'Berlin' },
    { url: 'images/2023-naples-01.jpg',             width: 210, height: 280, year: '2023', location: 'Naples' },
    { url: 'images/2022-copenhagen-02.jpg',         width: 210, height: 280, year: '2022', location: 'Copenhagen' },
    { url: 'images/2024-heraklion-02.jpg',          width: 210, height: 280, year: '2024', location: 'Heraklion' },
    { url: 'images/2023-copenhagen-02.jpg',         width: 210, height: 280, year: '2023', location: 'Copenhagen' },
    { url: 'images/2025-fujikawaguchiko-01.jpg',    width: 210, height: 280, year: '2025', location: 'Fujikawaguchiko' },
    { url: 'images/2023-marseille-01.jpg',          width: 210, height: 280, year: '2023', location: 'Marseille' },

];



// State
let isDraggingCanvas = false;
let isDraggingPhoto = false;
let startX, startY;
// Center the view to give impression of being in a field of photos
// Calculate offset to show middle area (approximately row 2, columns 2-4)
let currentX = -window.innerWidth * 0.1;
let currentY = -window.innerHeight * 0.1;
let velocityX = 0;
let velocityY = 0;
let currentScale = 0.7;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 0.15;

// Photo dragging state
let draggedPhoto = null;
let photoOffsetX = 0;
let photoOffsetY = 0;

// Elements
const canvas = document.getElementById('canvas');
const cursor = document.querySelector('.cursor');

// Apply current pan + zoom to canvas
function applyTransform() {
    canvas.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
}

// Zoom centered on a viewport point (ox, oy)
function zoomAt(ox, oy, delta) {
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, currentScale + delta));
    const ratio = newScale / currentScale;
    currentX = ox - ratio * (ox - currentX);
    currentY = oy - ratio * (oy - currentY);
    currentScale = newScale;
    applyTransform();
}

// Initialize canvas position
applyTransform();

// Debug: log when photos are created
console.log('Portfolio initialized with', photos.length, 'photos');

// Create photo elements
function createPhotoElements() {
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';

        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = `Photo ${index + 1}`;
        img.draggable = false;

        // Debug: log when image loads or fails
        img.onload = () => console.log(`✓ Photo ${index + 1} loaded:`, photo.url);
        img.onerror = () => console.error(`✗ Photo ${index + 1} failed to load:`, photo.url);

        photoItem.appendChild(img);

        // Add caption with year and location
        if (photo.year && photo.location) {
            const caption = document.createElement('div');
            caption.className = 'photo-caption';
            caption.textContent = `${photo.year} · ${photo.location}`;
            photoItem.appendChild(caption);
        }

        // Custom grid layout with varying rows: 5, 6, 4, 5, 6, etc.
        // Responsive spacing - less on mobile
        const isMobile = window.innerWidth <= 768;
        const padding = isMobile ? 20 : 80; // Reduced spacing on mobile
        const startPadding = isMobile ? 30 : 50; // Reduced initial offset on mobile
        // First row has fewer photos to leave space for logo (skip 2 cells)
        const rowPattern = [5, 6, 7, 6, 7, 8, 7, 6, 7]; // Photos per row - varying pattern

        // Skip first 2 cells - shift all photos by 2 to leave more space for logo
        const adjustedIndex = index + 2;

        // Calculate which row and column based on the varying row pattern
        let row = 0;
        let col = adjustedIndex;
        let totalPhotosInPreviousRows = 0;

        // Find which row this photo belongs to
        for (let i = 0; i < rowPattern.length; i++) {
            if (col <= rowPattern[i]) {
                row = i;
                col = col - 1; // Adjust for 0-based column index
                break;
            }
            col -= rowPattern[i];
            totalPhotosInPreviousRows += rowPattern[i];
        }

        // If we've gone past the pattern, continue cycling through it
        if (row >= rowPattern.length) {
            const cycleLength = rowPattern.reduce((sum, val) => sum + val, 0);
            const cycleNum = Math.floor(adjustedIndex / cycleLength);
            const posInCycle = adjustedIndex % cycleLength;

            for (let i = 0; i < rowPattern.length; i++) {
                if (posInCycle <= rowPattern[i]) {
                    row = cycleNum * rowPattern.length + i;
                    col = posInCycle - 1;
                    break;
                }
                col -= rowPattern[i];
            }
        }

        // Use max dimensions for grid consistency
        // On mobile, photos are scaled to 0.7 via CSS, so shrink the grid cell accordingly
        const mobileScale = isMobile ? 0.7 : 1;
        const maxWidth = 280 * mobileScale;
        const maxHeight = 280 * mobileScale;

        // Calculate base position
        const baseX = col * (maxWidth + padding) + startPadding;
        const baseY = row * (maxHeight + padding) + startPadding;

        // Pseudo-random offset using multiple sine/cosine harmonics for organic scatter
        const randomOffsetX = Math.sin(index * 1.234) * 55 + Math.sin(index * 3.71) * 25;  // ≈ ±80px
        const randomOffsetY = Math.cos(index * 2.345) * 40 + Math.cos(index * 5.13) * 20;  // ≈ ±60px

        // Center photos within their grid cell with random variation
        const x = baseX + (maxWidth - photo.width * mobileScale) / 2 + randomOffsetX;
        const y = baseY + (maxHeight - photo.height * mobileScale) / 2 + randomOffsetY;

        photoItem.style.width = `${photo.width}px`;
        photoItem.style.height = `${photo.height}px`;
        photoItem.style.left = `${x}px`;
        photoItem.style.top = `${y}px`;
        // Don't set transform inline - let CSS handle it for hover effects

        console.log(`Photo ${index + 1} positioned at x:${x}, y:${y}`);

        // Add individual photo drag functionality
        photoItem.addEventListener('mousedown', onPhotoMouseDown);

        canvas.appendChild(photoItem);
    });
}

// Individual photo drag handlers
function onPhotoMouseDown(e) {
    e.stopPropagation(); // Prevent canvas drag

    isDraggingPhoto = true;
    draggedPhoto = e.currentTarget;

    // Calculate offset in canvas-space (divide screen pixels by scale)
    const canvasRect = canvas.getBoundingClientRect();
    photoOffsetX = (e.clientX - canvasRect.left) / currentScale - parseFloat(draggedPhoto.style.left);
    photoOffsetY = (e.clientY - canvasRect.top) / currentScale - parseFloat(draggedPhoto.style.top);

    draggedPhoto.style.transition = 'none'; // Disable transition during drag
    draggedPhoto.style.zIndex = '1000'; // Bring to front
}

// Mouse events for dragging canvas
function onMouseDown(e) {
    // Don't start canvas drag if clicking on a photo
    if (e.target.closest('.photo-item')) return;

    isDraggingCanvas = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    document.body.classList.add('dragging');
    cursor.classList.add('clicking');
    velocityX = 0;
    velocityY = 0;
}

function onMouseMove(e) {
    // Update cursor position
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Handle photo dragging
    if (isDraggingPhoto && draggedPhoto) {
        // Convert screen-space mouse position to canvas-space by dividing by currentScale
        const canvasRect = canvas.getBoundingClientRect();
        const newLeft = (e.clientX - canvasRect.left) / currentScale - photoOffsetX;
        const newTop = (e.clientY - canvasRect.top) / currentScale - photoOffsetY;

        draggedPhoto.style.left = `${newLeft}px`;
        draggedPhoto.style.top = `${newTop}px`;
        return;
    }

    // Handle canvas dragging
    if (!isDraggingCanvas) return;

    const newX = e.clientX - startX;
    const newY = e.clientY - startY;

    velocityX = newX - currentX;
    velocityY = newY - currentY;

    currentX = newX;
    currentY = newY;

    applyTransform();
}

function onMouseUp() {
    // Reset photo dragging
    if (isDraggingPhoto && draggedPhoto) {
        draggedPhoto.style.transition = ''; // Re-enable transition
        draggedPhoto.style.zIndex = ''; // Reset z-index
        isDraggingPhoto = false;
        draggedPhoto = null;
    }

    // Reset canvas dragging
    if (isDraggingCanvas) {
        isDraggingCanvas = false;
        document.body.classList.remove('dragging');
        cursor.classList.remove('clicking');
        applyMomentum();
    }
}

// Touch events for mobile
let longPressTimer = null;
let longPressTarget = null;
const LONG_PRESS_MS = 400;
const LONG_PRESS_MOVE_THRESHOLD = 8; // px — cancel long press if finger moves this far
let touchStartX = 0;
let touchStartY = 0;

function cancelLongPress() {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    if (longPressTarget) {
        longPressTarget.classList.remove('long-press-active');
        longPressTarget = null;
    }
}

function onTouchStart(e) {
    // Two fingers — switch to pinch mode, cancel any ongoing drag
    if (e.touches.length === 2) {
        cancelLongPress();
        isPinching = true;
        isDraggingCanvas = false;
        isDraggingPhoto = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.hypot(dx, dy);
        e.preventDefault();
        return;
    }

    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    // If touching a photo, start a long-press timer — don't drag the photo immediately
    const photoItem = e.target.closest('.photo-item');
    if (photoItem) {
        longPressTarget = photoItem;
        photoItem.classList.add('long-press-active');

        longPressTimer = setTimeout(() => {
            longPressTimer = null;
            // Activate photo drag
            isDraggingCanvas = false;
            isDraggingPhoto = true;
            draggedPhoto = photoItem;

            const canvasRect = canvas.getBoundingClientRect();
            const currentTouch = longPressTarget._currentTouch || touch;
            photoOffsetX = (currentTouch.clientX - canvasRect.left) / currentScale - parseFloat(photoItem.style.left);
            photoOffsetY = (currentTouch.clientY - canvasRect.top) / currentScale - parseFloat(photoItem.style.top);

            photoItem.classList.remove('long-press-active');
            photoItem.style.transition = 'none';
            photoItem.style.zIndex = '1000';
        }, LONG_PRESS_MS);
    }

    // Always start canvas drag — will be cancelled if long press activates
    isDraggingCanvas = true;
    startX = touch.clientX - currentX;
    startY = touch.clientY - currentY;
    velocityX = 0;
    velocityY = 0;
    e.preventDefault();
}

function onTouchMove(e) {
    // Handle pinch zoom
    if (isPinching && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (lastPinchDist !== null) {
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            zoomAt(midX, midY, (dist - lastPinchDist) * 0.01);
        }
        lastPinchDist = dist;
        e.preventDefault();
        return;
    }

    const touch = e.touches[0];

    // Track current touch position for long press offset calculation
    if (longPressTarget) longPressTarget._currentTouch = touch;

    // Cancel long press if finger moved too far
    if (longPressTimer) {
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (Math.hypot(dx, dy) > LONG_PRESS_MOVE_THRESHOLD) {
            cancelLongPress();
        }
    }

    // Handle photo dragging (activated by long press)
    if (isDraggingPhoto && draggedPhoto) {
        isDraggingCanvas = false;
        const canvasRect = canvas.getBoundingClientRect();
        const newLeft = (touch.clientX - canvasRect.left) / currentScale - photoOffsetX;
        const newTop = (touch.clientY - canvasRect.top) / currentScale - photoOffsetY;

        draggedPhoto.style.left = `${newLeft}px`;
        draggedPhoto.style.top = `${newTop}px`;
        e.preventDefault();
        return;
    }

    // Handle canvas dragging
    if (!isDraggingCanvas) return;

    const newX = touch.clientX - startX;
    const newY = touch.clientY - startY;

    velocityX = newX - currentX;
    velocityY = newY - currentY;

    currentX = newX;
    currentY = newY;

    applyTransform();
    e.preventDefault();
}

function onTouchEnd(e) {
    cancelLongPress();

    // Leaving pinch (one finger lifted)
    if (isPinching) {
        if (e.touches.length < 2) {
            isPinching = false;
            lastPinchDist = null;
        }
        return;
    }

    // Reset photo dragging
    if (isDraggingPhoto && draggedPhoto) {
        draggedPhoto.style.transition = '';
        draggedPhoto.style.zIndex = '';
        isDraggingPhoto = false;
        draggedPhoto = null;
    }

    // Reset canvas dragging
    if (isDraggingCanvas) {
        isDraggingCanvas = false;
        applyMomentum();
    }
}

// Momentum/inertia effect
function applyMomentum() {
    const friction = 0.92;

    function animate() {
        if (Math.abs(velocityX) < 0.5 && Math.abs(velocityY) < 0.5) {
            return;
        }

        velocityX *= friction;
        velocityY *= friction;

        currentX += velocityX;
        currentY += velocityY;

        applyTransform();
        requestAnimationFrame(animate);
    }

    animate();
}

// Scroll to zoom (centered on cursor)
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    zoomAt(e.clientX, e.clientY, delta);
}, { passive: false });

// Pinch to zoom (mobile) — handled inside onTouchStart/Move/End
let lastPinchDist = null;
let isPinching = false;


// Prevent canvas touch handlers from swallowing taps on the footer nav links
document.querySelector('.footer-links').addEventListener('touchstart', (e) => {
    e.stopPropagation();
}, { passive: true });
document.querySelector('.footer-links').addEventListener('touchend', (e) => {
    e.stopPropagation();
}, { passive: true });

// Prevent context menu on long press (mobile)
window.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.canvas')) {
        e.preventDefault();
    }
});

// Event listeners
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mouseleave', onMouseUp);

document.addEventListener('touchstart', onTouchStart, { passive: false });
document.addEventListener('touchmove', onTouchMove, { passive: false });
document.addEventListener('touchend', onTouchEnd);

// Panel text cursor
const panelCursor = document.getElementById('panel-cursor');
document.addEventListener('mousemove', (e) => {
    panelCursor.style.left = `${e.clientX}px`;
    panelCursor.style.top = `${e.clientY}px`;
});

// Slide-in panels
function setupPanel(openId, panelId) {
    const panel = document.getElementById(panelId);

    document.getElementById(openId).addEventListener('click', (e) => {
        e.preventDefault();
        panel.classList.add('open');
        document.body.classList.add('panel-open');
    });

    const close = () => {
        panel.classList.remove('open');
        document.body.classList.remove('panel-open');
    };

    // Desktop: click anywhere on panel to close (but not on links)
    panel.addEventListener('click', (e) => {
        if (!e.target.closest('a')) close();
    });

    // Mobile: swipe left or tap to close (but not on links)
    let swipeStartX = 0;
    let swipeStartY = 0;
    panel.addEventListener('touchstart', (e) => {
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
    }, { passive: true });
    panel.addEventListener('touchend', (e) => {
        if (e.target.closest('a')) return;
        const dx = e.changedTouches[0].clientX - swipeStartX;
        const dy = Math.abs(e.changedTouches[0].clientY - swipeStartY);
        const isTap = Math.abs(dx) < 10 && dy < 10;
        const isSwipeLeft = dx < -50 && dy < 60;
        if (isTap || isSwipeLeft) close();
    }, { passive: true });
}
setupPanel('open-about', 'panel-about');
setupPanel('open-impressum', 'panel-impressum');

// Loading screen
const loadingScreen = document.getElementById('loading-screen');
const loadingBar = document.getElementById('loading-bar');
let loadedCount = 0;
const totalPhotos = photos.length;
const MIN_DISPLAY_MS = 800; // always show the screen for at least this long
const loadStart = Date.now();

function onImageProgress() {
    loadedCount++;
    loadingBar.style.width = `${(loadedCount / totalPhotos) * 100}%`;

    if (loadedCount >= totalPhotos) {
        const elapsed = Date.now() - loadStart;
        const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            loadingScreen.addEventListener('transitionend', () => loadingScreen.remove(), { once: true });
        }, delay);
    }
}

// Build mailto links client-side to prevent email harvesting by bots
(function () {
    const u = 'mail';
    const d = ['emptyplates', 'de'].join('.');
    const addr = u + '@' + d;

    document.getElementById('contact-link').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mailto:' + addr;
    });

    document.querySelectorAll('.impressum-mail').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:' + addr;
        });
        el.textContent = addr;
    });
})();

// Initialize
createPhotoElements();

// Hook into the already-created img elements for load tracking
document.querySelectorAll('.photo-item img').forEach(img => {
    if (img.complete) {
        onImageProgress();
    } else {
        img.addEventListener('load', onImageProgress, { once: true });
        img.addEventListener('error', onImageProgress, { once: true }); // don't stall on broken images
    }
});
