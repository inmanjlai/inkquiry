document.addEventListener("DOMContentLoaded", function(e) {
    const setsButton = document.querySelector('.sets')    
    const dropdown = document.querySelector('.dropdown')

    setsButton.addEventListener('click', (e) => {
        dropdown.classList.toggle('open')
    })
});