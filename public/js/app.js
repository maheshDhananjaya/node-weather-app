console.log("client side js loaded")


const form = document.querySelector('form');
const search = document.querySelector('input');
const searchResult = document.querySelector('textarea')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(search.value){
        const url = `http://localhost:5000/weather?address=${search.value}`;
        fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log("data",data)
                searchResult.value = data.forcast
            }
           
        })
        })
    }
})