//console.log('%c HI', 'color: firebrick') 

document.addEventListener('DOMContentLoaded', () => { 

    let allBreeds = []
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"  
    const dogImgContainer = document.getElementById('dog-image-container') 

    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    const dogBreedUl = document.getElementById('dog-breeds')  
    const breedDropDown = document.getElementById('breed-dropdown')  

    // added click event and color 
    dogBreedUl.addEventListener('click', (event) => {
        event.target.style.color = 'red' 
    }) 
 
    // filter breeds that start with a particular letter using a dropdown. 
      
     breedDropDown.addEventListener('change', (event) => {
        const letter = event.target.value 
        const filterBreeds = allBreeds.filter((breed) => breed.startsWith(letter))
 
        dogBreedUl.innerHTML = createDogList(filterBreeds) 
    })
 

    fetch(imgUrl, {method: 'GET'}) 
    .then((response) => { 
      //console.log(response);
      if(response.ok){
        return response.json() 
      } 
    })  
    .then((dogImgData) => { 
      //console.log(dogImgData); 
       dogImgData.message.forEach((imgUrl) => {
        dogImgContainer.innerHTML += `<img src"${imgUrl}">`
       }) 
       const dogString = dogImgData.message.map((imgUrl) => {
         return  `<img src"${imgUrl}">`
       })
     }) 
    

   fetch((breedUrl), {method: 'GET'}) 
   .then((response) => {
       console.log(response); 
       if(response.ok){
           return response.json()
       }
   }) 
   .then((breedData) => {
      //console.log(breedData); // message
      const allBreeds = Object.keys(breedData.message) 
      //console.log(allBreeds)
      dogBreedUl.innerHTML = createDogList(allBreeds)
   }) 
     

}) // onload 


    
    // this is a function helper it created <li> </li> template by using template literal
    function createDogList(dogBreedArray){
        const dogLiStringArray = dogBreedArray.map((breed) => {
          return `<li>${breed}</li>`
        }) 
          return dogLiStringArray.join(" ")
    }

