// דף קולי שמסדר בעזרת השם את הבעיה בטלפונים שהמסך יהיה רק לרוחב
$(function () {
    if ('ontouchstart' in document) {
        let media = window.matchMedia("(orientation: portrait)");
        media.addListener(orient);
        function orient(e) {
            if (media.matches) {
                document.body.style.display = "block";
                void document.body.offsetWidth;
                document.body.style.display = "";
                document.documentElement.style.transform = "translate(calc(-100% + 100vw)) rotateZ(90deg) translate(100%)";
                document.documentElement.style.transformOrigin = "top right";
                document.documentElement.style.left = "0";
                document.documentElement.style.position = "absolute";
                document.documentElement.style.width = `${document.documentElement.clientHeight}px`;
                document.documentElement.style.height = `${document.documentElement.clientWidth}px`;
                if(window.onportrait) Promise.resolve().then(onportrait);
                e.preventDefault();
            } else {
                document.documentElement.style.transform = "";
                document.documentElement.style.transformOrigin = "";
                document.documentElement.style.left = "";
                document.documentElement.style.position = "";
                document.documentElement.style.width = ``;
                document.documentElement.style.height = ``;
                if(window.onlandscape) Promise.resolve().then(onlandscape);
            }
        }
        orient.call(media, new Event("orientationchange"));
    }
});