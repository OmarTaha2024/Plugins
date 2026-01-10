    /* function hideNextStageButton() {
 var interval = setInterval(function () {
        var element = parent.document.getElementById("MscrmControls.Containers.ProcessStageControl-nextButtonContainer");
        if (element != null) {
            element.disabled = true;                   
            element.setAttribute("disabled", "true");  
            element.setAttribute("aria-disabled", "true");
            element.style.pointerEvents = "none";      
            element.style.opacity = "0.5";         

            element.style.display = "none";

            clearInterval(interval);
        }
    }, 100);
    }
    */
    function hideNextStageButton() {
  try {
    const doc = (window.top && window.top.document) ? window.top.document : document;
    const selector = '[id="MscrmControls.Containers.ProcessStageControl-nextButtonContainer"]';

    const el = doc.querySelector(selector);
    if (el) {
      el.disabled = true;
      el.setAttribute("disabled", "true");
      el.setAttribute("aria-disabled", "true");
      el.style.pointerEvents = "none";
      el.style.opacity = "0.5";
      el.style.display = "none";
    }

    const style = doc.createElement("style");
    style.type = "text/css";
    style.textContent = `
      ${selector} {
        display: none !important;
        pointer-events: none !important;
        opacity: 0.5 !important;
      }
      ${selector} button {
        pointer-events: none !important;
      }
    `;
    doc.head.appendChild(style);
  } catch (e) {
    console.warn("hideNextStageButton failed:", e);
  }
}
