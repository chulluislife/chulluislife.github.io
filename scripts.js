
    const grabBtn = document.getElementById("grabBtn");
    const magicBtn = document.getElementById("magicBtn");
    const serveModal = document.getElementById("serveModal");
    const magicModal = document.getElementById("magicModal");
    const bottleG = document.getElementById("bottleG");
    const stream = document.getElementById("stream");
    const liquidRect = document.getElementById("liquidRect");
    const serveText = document.getElementById("serveText");
    const serveClose = document.getElementById("serveClose");
    const magicClose = document.getElementById("magicClose");
  
    let busy = false;
  
    function hardReset() {
      bottleG.style.transition = "none";
      stream.style.transition = "none";
      liquidRect.style.transition = "none";
      bottleG.style.transform = "rotate(0deg)";
      stream.setAttribute("height", "0");
      stream.setAttribute("y", "90");
      liquidRect.setAttribute("y", "245");
      liquidRect.setAttribute("height", "0");
      serveText.textContent = "Serving your Premium Chullu...";
      // re-enable transitions next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bottleG.style.transition = "transform 1s cubic-bezier(.4,0,.2,1)";
          stream.style.transition = "height 0.4s ease, y 0.4s ease";
          liquidRect.style.transition = "y 2s ease, height 2s ease";
        });
      });
    }
  
    function startPour() {
      if (busy) return;
      busy = true;
      hardReset();
      serveModal.classList.add("show");
  
      // After bottle tilt transition completes, grow the stream then fill the glass
      // Bottle rotates ~110deg clockwise — mouth swings from top down to point into glass
      setTimeout(() => {
        bottleG.style.transform = "rotate(110deg)";
      }, 70);
  
      // stream grows downward from bottle mouth (now around y=90 area, x~107)
      setTimeout(() => {
        stream.setAttribute("y", "105")
        stream.setAttribute("height", "130");
      }, 1050);
  
      // liquid rises in glass
      setTimeout(() => {
        liquidRect.setAttribute("y", "152");
        liquidRect.setAttribute("height", "90");
      }, 1200);
  
      //stream go off
      setTimeout(() => {
        stream.setAttribute("y", "105")
        stream.setAttribute("height", "0");
      }, 2800);

      // bottle go straight and bye bye
      setTimeout(() => {
      bottleG.style.transform = "translateX(-300px) rotate(0deg)";
    }, 3200);


      setTimeout(() => {
        serveText.textContent = "🍷 Your Premium Chullu is Ready!";
      }, 3200);
    }
  
    function closePour() {
      serveModal.classList.remove("show");
      setTimeout(() => {
        hardReset();
        busy = false;
      }, 450);
    }
  
    grabBtn.addEventListener("click", startPour);
    serveClose.addEventListener("click", closePour);
    serveModal.addEventListener("click", (e) => {
      if (e.target === serveModal) closePour();
    });
  
    magicBtn.addEventListener("click", () => magicModal.classList.add("show"));
    magicClose.addEventListener("click", () =>
      magicModal.classList.remove("show"),
    );
    magicModal.addEventListener("click", (e) => {
      if (e.target === magicModal) magicModal.classList.remove("show");
    });
  