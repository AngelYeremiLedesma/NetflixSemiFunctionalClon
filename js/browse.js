function init(){
    let header = document.querySelector('nav');
    window.addEventListener('scroll', e=>{
        let color = `RGBA(0,0,0,${(window.scrollY/500)})` 
        header.style.setProperty('background',color)
    })
    clickListeners();
    document.addEventListener("click", (event) => {
        let searcherSymbol = document.getElementById("search-symbol");
        let searcher = document.getElementById("searcher");
        const isClickInside = (searcherSymbol.contains(event.target))||(searcher.contains(event.target));
        if (!isClickInside) {
            searcher.style.opacity=0;
            searcher.style.width = "0px";
            searcher.style.padding = "8px 15px 8px 15px";
        }
    });
    search();
}

function search(){
    let searcher = document.getElementById("searcher");
    searcher.addEventListener("keypress",(event)=>{
        if(event.key!=""){
            if(searcher.value.length>3){
                awaitResponseResults()
            }
        }
    })
}

function clickListeners(){
    for(let i= 0; i<19; i++){
        console.log(i)
        document.getElementById(`${i}b`).addEventListener("click",()=> {
            let carousel = document.getElementById(`${i}a`);
            let carouselContainer = document.querySelector(".carousel-container")
            let step = carousel.clientWidth;
            let steps = [-1*step,-2*step,-3*step]
            console.log(steps)
            console.log(carouselContainer.clientWidth)
            if(carousel.style.transform == `translateX(${steps[1]}px)`){
                carousel.style.transform = `translateX(${steps[2]}px)`
            }
            else if(carousel.style.transform == `translateX(${steps[0]}px)`){
                carousel.style.transform = `translateX(${steps[1]}px)`
            }
            else{
                carousel.style.transform = `translateX(${steps[0]}px)`
            }
        });
    }
    document.getElementById("search-symbol").addEventListener("click",()=> {
        let searcher = document.getElementById("searcher");
        searcher.style.opacity=1;
        searcher.style.width = "250px";
        searcher.style.padding = "8px 15px 8px 43px";
    })
}



