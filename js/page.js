let burgerBtn = document.querySelector('.burger__menu'),
    burgerContent = document.querySelector('.burger__content')

burgerBtn.addEventListener('click', (e)=> {
    burgerBtn.classList.toggle('active')
    burgerContent.classList.toggle('active')
})