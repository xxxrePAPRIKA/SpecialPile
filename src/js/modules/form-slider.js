/// slider

function formSlider(prevBtn, nextBtn, slidesItems, sliderWrapper, sliderInner) {
        const slides = document.querySelectorAll(slidesItems),
        prev = document.querySelector(prevBtn),
        next = document.querySelector(nextBtn),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        counter = document.querySelector('.form-slider__counter'),
        slidesWrapper = document.querySelector(sliderWrapper),
        slidesInner = document.querySelector(sliderInner),
        width = window.getComputedStyle(slidesWrapper).width,
        titles = document.querySelectorAll('.form-slider__title'),
        buttonForm = document.querySelector('.form-slider__navigation_btn-form');

    let slideIndex = 1;
    let offset = 0;
    let slideCounter = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length - 1}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length - 1;
        current.textContent = slideIndex;
    };


    slidesInner.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    hideElements();
    showTitle();
    hidePrev();
    setTimeout(() => {
        next.click();
        prev.click();
    }, 10);



    function showTitle() {
        titles.forEach(title => title.style.display = 'none')
        titles[slideIndex - 1].style.display = '';
    };


    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2)
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        next.disabled = true;
        hideElements();
        showTitle();
        hidePrev();
        slideCounter++
        checkSelecteditems(slideCounter);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2)
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        hideElements();
        showTitle();
        hidePrev();
        slideCounter--
        checkSelecteditems(slideCounter);
    });

    function hidePrev() {
        if ((slideIndex - 1) == 0) {
            prev.style.visibility = 'hidden';
        } else {
            prev.style.visibility = '';
        }
    };

    function hideElements() {
        if (slideIndex == slides.length) {
            counter.style.visibility = 'hidden';
            next.style.display = 'none';
            buttonForm.style.display = '';
        } else {
            counter.style.visibility = '';
            next.style.display = '';
            buttonForm.style.display = 'none';
        }
    };

    const slideSelect = () => {    

        slides.forEach(slide => {
            const images = slide.querySelectorAll('.form-slider__img'),
                cardAskSelects = slide.querySelectorAll('.form-slider__item__card-form_select');

            images.forEach(element => {

                element.addEventListener('click', () => {
                    images.forEach(element => {
                        element.children[1].classList.remove('img-selected');
                    });
                    element.children[1].classList.add('img-selected');
                    next.disabled = false;
                    if (!element.children[1].classList.contains('img-selected')) {
                        element.children[1].previousElementSibling.style.cssText = "border-bottom: 1px solid $black-color;"
                    } else {
                        images.forEach(element => {
                            element.children[1].previousElementSibling.style.cssText = "border-bottom: 1px solid $black-color;"
                        });
                        element.children[1].previousElementSibling.style.cssText = "background-color: transparent; border-bottom: none; color: white; text-shadow: 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000, 0 -1px 1px #000;";
                    }
                });
            });

            cardAskSelects.forEach(select => {
                select.addEventListener('click', () => {
                    next.disabled = false;
                    cardAskSelects.forEach(select => {
                        select.classList.remove('ask-selected');
                    });
                    select.classList.add('ask-selected');

                    
                });
            });
        });
    };
    slideSelect();


    // проверяет карточки в слайдере на наличие класса и включает или оключает кнопку next 
    function checkSelecteditems(i) {
        let slidesItems = slides[i].querySelectorAll('.form-slider__img');
        let askitems = slides[i].querySelectorAll('.form-slider__item__card-form_select');
        function chek(typeSlide) {
                for (i = 0; i < typeSlide.length; i++) {
                    try {
                        if (!(typeSlide[i].children[1].classList.contains('img-selected'))) {
                            next.disabled = true;
                        } else {
                            next.disabled = false;
                            return
                        }
                    } catch (error) {
                        if (!(typeSlide[i].classList.contains('ask-selected'))) {
                            next.disabled = true;
                        } else {
                            next.disabled = false;
                            return
                        }
                    }
                };
        };
        chek(slidesItems);
        chek(askitems);
    };

}

export default formSlider;