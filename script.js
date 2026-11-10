const weDo = document.querySelectorAll(".reveal")

function showCards(entries){
    entries.forEach(entry => {
        if (entry.isIntersecting === true){
            entry.target.classList.add("visible")
        }
        
        else entry.target.classList.remove("visible")
        
        
    });

}

const observer = new IntersectionObserver(showCards)

weDo.forEach(card => {
    observer.observe(card)
})

IntersectionObserver(0.3)

