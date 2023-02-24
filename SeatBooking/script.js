const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

populateUI();

let tiketPrice = +movieSelect.value;

// save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// updates count of selected places
const uppdateSelectedCount = () =>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex =[...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * tiketPrice
}

// get data from loclstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !==null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }

        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select event
movieSelect.addEventListener('change', e=>{
    tiketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    uppdateSelectedCount();
})

// seat click event
container.addEventListener('click', e=>{
    if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        uppdateSelectedCount();
    }
});

// initial count and total set
uppdateSelectedCount();