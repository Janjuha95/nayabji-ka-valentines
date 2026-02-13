// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");

// Photo screen elements
const photoScreen = document.getElementById("photo-screen");
const photoInner = document.getElementById("photo-inner");
const photoFrame = document.querySelector(".photo-frame");
const poemBtn = document.getElementById("poem-btn");


// Poem elements
const poemOverlay = document.getElementById("poem-overlay");
const poemText = document.getElementById("poem-text");
const poemCursor = document.getElementById("poem-cursor");
const poemClose = document.getElementById("poem-close");


//video elements
const videoScreen = document.getElementById("video-screen");
const video = document.getElementById("surprise-video");


// ============================================
// YOUR POEM — edit this!
// Use \n for new lines.
// ============================================
const poem = `
at the banks i stood, feet set on green
grass beneath firm 
overcome was i entirely ,
by the rivers flow
who gazed at me with a deep blue hue

it spills o’er the bank
engulfs me, whole
the air doth grow scarce
as I drown below

with maniacal wrath i fight her, pushing against the current
“tis too strong”, she whispered 
how gentle her pull, how soft her hold
“why must thou fight what carries thee” 
she reasoned

ceased my thrashing i did
waters flood into my chest
she sang songs of great to my soul 
of love, of care, of rest -
i listen’d

and so i sank into her arms 
no more did i resist the flow
and beneath the gentle tide
there it was 
home`;

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES is clicked → show photo screen
yesBtn.addEventListener("click", () => {
    letter.style.display = "none";

    photoScreen.classList.add("active");

    setTimeout(() => {
        photoInner.classList.add("visible");
    }, 100);

    setTimeout(() => {
        photoFrame.classList.add("visible");
    }, 500);

    setTimeout(() => {
        poemBtn.classList.add("visible");
    }, 1200);
});

// Poem button clicked → fade to black + typewriter
poemBtn.addEventListener("click", () => {
    poemOverlay.classList.add("active");

    // Start typing after the fade-in
    setTimeout(() => {
        typePoem(poem, 50);
        poemClose.classList.add("visible");
    }, 2200);
});

// Cross button clicked → play video
poemClose.addEventListener("click", () => {
    // Hide poem overlay
    poemOverlay.classList.remove("active");
    poemClose.classList.remove("visible");

    // Show video screen and play
    videoScreen.classList.add("active");
    video.currentTime = 0;
    video.play();
});

// When video ends → try closing the tab, fallback to end screen
video.addEventListener("ended", () => {
    window.close();

    // If window.close() didn't work (opened directly), show end screen
    videoScreen.innerHTML = `
        <div style="color: white; text-align: center; font-family: 'Cormorant Garamond', serif; padding: 40px;">
            <p style="font-size: 24px; font-style: italic;">love you nawab ji♡</p>
        </div>
    `;
});

// Typewriter effect
function typePoem(text, speed) {
    let i = 0;

    function type() {
        if (i < text.length) {
            poemText.textContent += text.charAt(i);
            i++;
            // Pause longer on line breaks for breathing room
            const delay = text.charAt(i - 1) === "\n" ? speed * 6 : speed;
            setTimeout(type, delay);
        } else {
            // Done typing — hide cursor after a moment
            setTimeout(() => {
                poemCursor.classList.add("hidden");
            }, 1500);
        }

        
    }

    type();
}