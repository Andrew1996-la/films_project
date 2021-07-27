/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логаны",
            "Лиги справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Акотт Пилигрим против..."
        ]
    };


    // Добавление фильмов в массив и на страницу.
    const addForm = document.querySelector('form.add');
    const addInput = document.querySelector('.adding__input');
    const checkbox = document.querySelector('[type=checkbox]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        let favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring (0, 22)}...`
            }

            if (favorite) {
                console.log(`${newFilm} люимый фильм`);
            }



            movieDB.movies.push(newFilm)
            sortArr(movieDB.movies)

            createMovieFilms(movieDB.movies, promoList)
        }

        addForm.reset()
    })




    //Удаление рекламы из блока рекламы
    const adv = document.querySelectorAll('.promo__adv img');
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove()
        })
    }




    //Замена жанра фильма и бэк кратинки
    const genre = document.querySelector('.promo__genre');
    const poster = document.querySelector('.promo__bg')

    const makeChange = () => {
        genre.textContent = 'Драмма';
        poster.style.backgroundImage = 'url(img/bg.jpg)'

    }


    //Функция сортировки по алфавиту
    const sortArr = (arr) => {
        arr.sort()
    }



    //Стираем уже существующий html список, генерируем новый согласно массива
    const promoList = document.querySelector('.promo__interactive-list');

    function createMovieFilms(films, perent) {
        perent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            perent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}
                                      <div class="delete"></div>
                                    </li>`
        });


        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1)
                createMovieFilms(films, perent) //рекурсия
            })
        })
    }




    deleteAdv(adv)
    makeChange();
    createMovieFilms(movieDB.movies, promoList)
});