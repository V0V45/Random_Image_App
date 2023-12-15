// Блок переменных
let imageObject1;
let imageObject2;
let imageObject3;
let imageObject4;
let time = 100;
let timerId;
let loadedImages = 0;
let chosenImageId = 1;
let bigImageLoaded = false;

function updateTimer() {
    timerId = setTimeout(updateTimer, 10);
    time -= 0.2;
    if (time <= 0) {
        switchChosenImage();
        time = 100;
    }
    document.querySelector('.progressBar').style.width = time + '%';
}

// Блок функций
function loadImageData() {
    clearTimeout(timerId);
    chosenImageId = 1;
    loadedImages = 0;
    bigImageLoaded = false;
    document.querySelector('.playStopButton').textContent = 'LOADING';
    document.querySelector('.playStopButton').classList.add('blocked');
    document.querySelectorAll('img').forEach((image) => {
        image.classList.add('loading');
    });
    for (let index = 1; index < 5; index++) {
        fetch('https://api.unsplash.com//photos/random/?client_id=GNeNOqeAYm1-trZPK0LQtfzzQol_eJvtcgEyIdYNWsI')
        .then((response) => response.json())
        .then((result) => {
            if (index === 1) {
                imageObject1 = result;
                document.querySelector('#bigImg1').src = imageObject1.urls.full;
                document.querySelector('#authorName').textContent = imageObject1.user.name;
                document.querySelector('#bigImg1').onload = (event) => {
                    event.target.classList.remove('loading');
                    bigImageLoaded = true;
                    checkLoadedPicturesCount();
                }
                document.querySelector('#img1').src = imageObject1.urls.small;
                document.querySelector('#img1').onload = (event) => {
                    event.target.classList.remove('loading');
                    loadedImages += 1;
                    checkLoadedPicturesCount();
                }
                document.querySelector('#img1').onclick = () => {
                    chosenImageId = 1;
                    clearTimeout(timerId);
                    playButtonLogic();
                    bigImageLoaded = false;
                    document.querySelector('#bigImg1').classList.add('loading');
                    document.querySelector('#bigImg1').src = imageObject1.urls.full;
                    document.querySelector('#bigImg1').onload = (event) => {
                        event.target.classList.remove('loading');
                        bigImageLoaded = true;
                    }
                    document.querySelector('#authorName').textContent = imageObject1.user.name;
                }
            } else if (index === 2) {
                imageObject2 = result;
                document.querySelector('#img2').src = imageObject2.urls.small;
                document.querySelector('#img2').onload = (event) => {
                    event.target.classList.remove('loading');
                    loadedImages += 1;
                    checkLoadedPicturesCount();
                }
                document.querySelector('#img2').onclick = () => {
                    chosenImageId = 2;
                    clearTimeout(timerId);
                    playButtonLogic();
                    bigImageLoaded = false;
                    document.querySelector('#bigImg1').classList.add('loading');
                    document.querySelector('#bigImg1').src = imageObject2.urls.full;
                    document.querySelector('#bigImg1').onload = (event) => {
                        event.target.classList.remove('loading');
                        bigImageLoaded = true;
                    }
                    document.querySelector('#authorName').textContent = imageObject2.user.name;
                }
            } else if (index === 3) {
                imageObject3 = result;
                document.querySelector('#img3').src = imageObject3.urls.small;
                document.querySelector('#img3').onload = (event) => {
                    event.target.classList.remove('loading');
                    loadedImages += 1;
                    checkLoadedPicturesCount();
                }
                document.querySelector('#img3').onclick = () => {
                    chosenImageId = 3;
                    clearTimeout(timerId);
                    playButtonLogic();
                    bigImageLoaded = false;
                    document.querySelector('#bigImg1').classList.add('loading');
                    document.querySelector('#bigImg1').src = imageObject3.urls.full;
                    document.querySelector('#bigImg1').onload = (event) => {
                        event.target.classList.remove('loading');
                        bigImageLoaded = true;
                    }
                    document.querySelector('#authorName').textContent = imageObject3.user.name;
                }
            } else if (index === 4) {
                imageObject4 = result;
                document.querySelector('#img4').src = imageObject4.urls.small;
                document.querySelector('#img4').onload = (event) => {
                    event.target.classList.remove('loading');
                    loadedImages += 1;
                    checkLoadedPicturesCount();
                }
                document.querySelector('#img4').onclick = () => {
                    chosenImageId = 4;
                    clearTimeout(timerId);
                    playButtonLogic();
                    bigImageLoaded = false;
                    document.querySelector('#bigImg1').classList.add('loading');
                    document.querySelector('#bigImg1').src = imageObject4.urls.full;
                    document.querySelector('#bigImg1').onload = (event) => {
                        event.target.classList.remove('loading');
                        bigImageLoaded = true;
                    }
                    document.querySelector('#authorName').textContent = imageObject4.user.name;
                }
            } else {
                throw 'Image number is not defined in loadImageData function';
            }
        });
    }
}

function addImageDarkOnClick() {
    document.querySelector('.littleImageContainer').addEventListener('click', (event) => {
        for (let index = 1; index < 5; index++) {
            if (document.querySelector('#img' + index).classList.contains('chosen')) {
                document.querySelector('#img' + index).classList.remove('chosen');
            }
        }
        if (event.target.tagName === 'IMG') {
            event.target.classList.add('chosen');
        }
    });
}

function checkLoadedPicturesCount() {
    if (loadedImages === 4 && bigImageLoaded === true) {
        updateTimer();
        document.querySelector('.playStopButton').classList.remove('blocked');
        stopButtonLogic();
    }
}

function stopButtonLogic() {
    document.querySelector('.playStopButton').textContent = 'STOP';
    document.querySelector('.playStopButton').onclick = () => {
        clearTimeout(timerId);
        playButtonLogic();
    }
}

function playButtonLogic() {
    document.querySelector('.playStopButton').textContent = 'PLAY';
    document.querySelector('.playStopButton').onclick = () => {
        timerId = setTimeout(updateTimer, 10);
        stopButtonLogic();
    }
}

function switchChosenImage() {
    for (let index = 1; index < 5; index++) {
        if (document.querySelector('#img' + index).classList.contains('chosen')) {
            document.querySelector('#img' + index).classList.remove('chosen');
        }
    }
    clearTimeout(timerId);
    if (chosenImageId === 1) {
        document.querySelector('#img2').classList.add('chosen');
        document.querySelector('#bigImg1').classList.add('loading');
        document.querySelector('#bigImg1').src = imageObject2.urls.full;
        document.querySelector('#bigImg1').onload = (event) => {
            event.target.classList.remove('loading');
            bigImageLoaded = true;
            timerId = setTimeout(updateTimer, 10);
        }
        document.querySelector('#authorName').textContent = imageObject2.user.name;
        chosenImageId += 1;
    } else if (chosenImageId === 2) {
        document.querySelector('#img3').classList.add('chosen');
        document.querySelector('#bigImg1').classList.add('loading');
        document.querySelector('#bigImg1').src = imageObject3.urls.full;
        document.querySelector('#bigImg1').onload = (event) => {
            event.target.classList.remove('loading');
            bigImageLoaded = true;
            timerId = setTimeout(updateTimer, 10);
        }
        document.querySelector('#authorName').textContent = imageObject3.user.name;
        chosenImageId += 1;
    } else if (chosenImageId === 3) {
        document.querySelector('#img4').classList.add('chosen');
        document.querySelector('#bigImg1').classList.add('loading');
        document.querySelector('#bigImg1').src = imageObject4.urls.full;
        document.querySelector('#bigImg1').onload = (event) => {
            event.target.classList.remove('loading');
            bigImageLoaded = true;
            timerId = setTimeout(updateTimer, 10);
        }
        document.querySelector('#authorName').textContent = imageObject3.user.name;
        chosenImageId += 1;
    } else if (chosenImageId === 4) {
        loadImageData();
    } else {
        throw 'Exception inside switchChosenImage function'
    }
}


// Блок выполнения
loadImageData();
document.querySelector('#img1').classList.add('chosen');
addImageDarkOnClick();
document.querySelector('.newButton').onclick = loadImageData;