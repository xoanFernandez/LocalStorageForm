//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')


let tweets = []




//event Listeners
eventListeners();
function eventListeners() {
    //cuando el usuario creo un nuevo twwet
    formulario.addEventListener('submit',agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') || [] );

        crearHTML();
    });
}



//funciones

function agregarTweet(e) {
    e.preventDefault();

   
    const tweet = document.querySelector('#tweet').value;

    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj];
    crearHTML();

    formulario.reset();

    
    console.log(tweets);
}


function mostrarError(error) {

    limpiarAlerta();
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove()
    }, 3000);

}

function limpiarAlerta() {
    const alert = document.querySelector('.error')
    if(alert) {
        alert.remove();
    }
}




function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            const li  = document.createElement('li');

            li.innerText = tweet.tweet;

            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id != id);
    crearHTML();
    
}

