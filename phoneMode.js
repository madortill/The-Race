// דף קולי שמסדר בעזרת השם את הבעיה בטלפונים שהמסך יהיה רק לרוחב
$(function () {
    if ('ontouchstart' in document) {
        var promise = document.body.requestFullscreen();
        promise.then(() => {
            screen.orientation.lock("landscape");
        }, () => {
            window.matchMedia("(orientation: portrait) or (orientation: portrait-primary)").addListener(function() {
                if (!this.matches) {
                    document.documentElement.style.transform = `rotateY(-90deg)`;
                    document.documentElement.style.width = "100vh";
                    document.documentElement.style.height = "100vw";
                    e.preventDefault();
                }else {
                    document.documentElement.style.transform = "";
                    document.documentElement.style.width = "";
                    document.documentElement.style.height = "";
                }
            });
        })
    }
});