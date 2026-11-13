const weDo = document.querySelectorAll(".reveal")
const observer = new IntersectionObserver(showCards)
const verses = [
    { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13"},
    { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", ref: "Jeremiah 29:11"},
    { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1"},
    { text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5"},
    { text: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.", ref: "1 Thessalonians 5:18"},
    {text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9"},
    {text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?", ref: "Psalm 27:1"}, 
    {text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", ref: "Matthew 6:33"},
    {text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", ref: "Romans 8:28"},
    {text: "Let all your things be done with charity.", ref: "1 Corinthians 16:14"},
    {text: "For we walk by faith, not by sight.", ref: "2 Corinthians 5:7"}

]
const versesDaily = document.querySelector("#verse")
const refDaily = document.querySelector("#chapter")
const today = new Date()
const dayNumber = today.getDate()
const index = dayNumber % verses.length
const todayVerse = verses[index]

if(versesDaily && refDaily){
    versesDaily.textContent = todayVerse.text
    refDaily.textContent = todayVerse.ref
}




function showCards(entries){
    entries.forEach(entry => {
        if (entry.isIntersecting === true){
            entry.target.classList.add("visible")
        }
        
        else entry.target.classList.remove("visible")
        
        
    });

}



weDo.forEach(card => {
    observer.observe(card)
})

const enterScreen = document.querySelector("#enter")
const song = document.querySelector("#song")
const musicButton = document.querySelector("#music")
const time = document.querySelector("#time")


if (song && musicButton && time) {
    function updateMuteLabel() {
        if (song.muted) {
            musicButton.setAttribute("aria-label", "Unmute music")
        } else {
            musicButton.setAttribute("aria-label", "Mute music")
        }
    }

    musicButton.addEventListener("click", () => {
        song.muted = !song.muted
        updateMuteLabel()
    })

    song.addEventListener("timeupdate", () => {
        const minutes = Math.floor(song.currentTime / 60)
        const seconds = Math.floor(song.currentTime % 60)

        time.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    })

    window.addEventListener("pagehide", () => {
        sessionStorage.setItem("musicTime", song.currentTime)
        sessionStorage.setItem("musicPlaying", !song.paused)
        sessionStorage.setItem("musicMuted", song.muted)
    })

    const savedTime = sessionStorage.getItem("musicTime")

    if (savedTime !== null) {
        const wasPlaying = sessionStorage.getItem("musicPlaying") === "true"
        const wasMuted = sessionStorage.getItem("musicMuted") === "true"

        song.muted = wasMuted
        updateMuteLabel()

        if (song.readyState >= 1) {
            song.currentTime = Number(savedTime)
        } else {
            song.addEventListener("loadedmetadata", () => {
                song.currentTime = Number(savedTime)
            }, { once: true })
        }

        if (wasPlaying) {
            song.play().catch(error => {
                console.log(error)
                document.addEventListener("click", () => {
                    song.play()
                }, { once: true })
            })
        }
    }
}


if (enterScreen) {
    if (sessionStorage.getItem("entered")) {
        enterScreen.remove()
    } else {
        document.body.classList.add("locked")

        enterScreen.addEventListener("click", () => {
            sessionStorage.setItem("entered", "yes")
            enterScreen.classList.add("hide")
            document.body.classList.remove("locked")
            song.play().catch(error => console.log(error))
        })
    }
}


