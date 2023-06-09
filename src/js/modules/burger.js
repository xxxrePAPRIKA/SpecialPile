const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector),
          phone = document.querySelector('.header__info_e_p .header__info_phone ');

    menuElem.style.display = 'none';

    

    burgerElem.addEventListener('click', () => {
        burgerElem.classList.toggle('active');

        if (burgerElem.classList.contains('active')) {
            phone.style.visibility = 'hidden'
        } else {
            phone.style.visibility = 'visible'
        }

        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = '';
            menuElem.classList.add('fadeIn');
            menuElem.classList.remove('fadeOut');
            
        } else {
            menuElem.classList.add('fadeOut');
            menuElem.classList.remove('fadeIn');
            setTimeout(() => {
                menuElem.style.display = 'none';
            }, 300);
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    })

};

export default burger;