class CookieClass {
    constructor() {
        
    }

    acceptAll () {
        console.log("összes elfogadva");
        document.querySelector(".cookieBox")?.classList.remove("show");
    }

    rejectAll () {
        console.log("összes elutasítva");
        document.querySelector(".cookieBox")?.classList.remove("show");
    }

    cookieToggle () {
        console.log("toggle activated");
        document.querySelector(".cookieBox")?.classList.toggle("show");
    }

    afterFetch (apiData) {
        console.log(apiData);
        const toggleBtn = document.querySelector("#cookie #cookieToggle");
        const acceptBtn = document.querySelector(".cookieBox .accept");
        const rejectBtn = document.querySelector(".cookieBox .reject");
        const welcomeText = document.querySelector(".cookieBox .description");
        const cookieBox = document.querySelector(".cookieBox");

        acceptBtn.textContent = apiData.translate.accept;
        rejectBtn.textContent = apiData.translate.reject;
        welcomeText.textContent = apiData.translate.welcomeText;

        toggleBtn?.addEventListener("click", this.cookieToggle)
        acceptBtn?.addEventListener("click", this.acceptAll)
        rejectBtn?.addEventListener("click", this.rejectAll)

        cookieBox?.classList.add("show");
    }

    buildBase () {
        fetch("/redcat_api/cookie")
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                throw new Error("bad status");
            }
            this.afterFetch(data);
        })
        .catch(err => {
          console.log(err);
        });
      
        
        document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="css/cookie.css">`);
        document.body.insertAdjacentHTML("beforeend", `<div id="cookie"></div>`);
        document.querySelector("#cookie").innerHTML = `
            <div class="cookieBox">
                <div class="description">We use cookies to improve your experience and for marketing. Read our cookie policy or manage cookies.</div>
                <div class="buttons">
                    <div class="accept btn">Y</div>
                    <div class="settings btn">Sett</div>
                    <div class="reject btn">N</div>
                </div>
            </div>
            <div id="cookieToggle">
                
            </div>`;
    }
}

console.log("--- START ---");
const CookieCat = new CookieClass;
CookieCat.buildBase();
console.log("--- END ---");