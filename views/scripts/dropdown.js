document.addEventListener("DOMContentLoaded", function(e) {
    const setsButton = document.querySelector('.sets')    
    const dropdown = document.querySelector('.dropdown')
    const icon = document.querySelector('.sets h3 span')

    setsButton.addEventListener('click', (e) => {
        dropdown.classList.toggle('open')
        
        if(icon.innerHTML == 'keyboard_arrow_down') icon.innerHTML = 'keyboard_arrow_up'
        else icon.innerHTML = 'keyboard_arrow_down'
    })
});