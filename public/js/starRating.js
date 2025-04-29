document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            ratingInput.value = value;

            // Highlight selected stars
            stars.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            let currentStar = this;
            while (currentStar = currentStar.previousElementSibling) {
                currentStar.classList.add('active');
            }
        });

        star.addEventListener('mouseover', function () {
            const value = this.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('hover'));
            this.classList.add('hover');
            let currentStar = this;
            while (currentStar = currentStar.previousElementSibling) {
                currentStar.classList.add('hover');
            }
        });

        star.addEventListener('mouseout', function () {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
});
