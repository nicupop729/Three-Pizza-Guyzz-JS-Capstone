const displayPizza = document.querySelector('.display-pizza');


const getPizza = async ()=>{
    const url = 'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=c9510895-3e98-4f84-a4ff-c56d29bdf5e0'
    const pizza = await fetch(url);
    const pizzaData = await pizza.json();
    const data = pizzaData.data.recipes
    data.forEach(dat => {
    
       const divContainer = document.createElement('div')
       divContainer.className = 'pizza-container';
       const image = document.createElement('img');
       image.src = dat.image_url;

       const namePub = document.createElement('span');
       namePub.innerHTML = dat.publisher;

       const namePizz = document.createElement('span');
       namePizz.innerHTML = dat.title;
    
       const commentBtn = document.createElement('button');
       commentBtn.innerHTML = "Comment";

       const reservationBtn = document.createElement('button');
       reservationBtn.innerHTML = "Reservation";
    

       divContainer.appendChild(image);
       divContainer.appendChild(namePub)
       divContainer.appendChild(namePizz);
       divContainer.appendChild(commentBtn);
       divContainer.appendChild(reservationBtn);


       displayPizza.appendChild(divContainer);
        console.log(dat)
        
    });
    
}

getPizza();

export default getPizza;