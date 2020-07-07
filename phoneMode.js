// ספריית אופליין, מאפשרת פתיחה של הדף ללא אינטרנט וללא מחיקה של הקאש כל פעם מחדש
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    let location = "../"
    navigator.serviceWorker.register(location + 'sw.js');
}


// דף קולי שמסדר בעזרת השם את הבעיה בטלפונים שהמסך יהיה רק לרוחב
$(function () {
    if ('ontouchstart' in document) {
        window.matchMedia("(orientation: portrait)").addListener(function (e) {
            if (this.matches) {
                document.documentElement.style.transform = "translate(calc(-100% + 100vw)) rotateZ(-90deg) translate(100%)";
                document.documentElement.style.transformOrigin = "top right";
                document.documentElement.style.left = "0";
                document.documentElement.style.position = "absolute";
                document.documentElement.style.width = `${window.innerHeight}px`;
                document.documentElement.style.height = `${window.innerWidth}px`;
                if(window.onportrait) onportrait();
                e.preventDefault();
            } else {
                if(window.onlandscape) onlandscape();
                document.documentElement.style.transform = "";
                document.documentElement.style.transformOrigin = "";
                document.documentElement.style.left = "";
                document.documentElement.style.position = "";
                document.documentElement.style.width = ``;
                document.documentElement.style.height = ``;
            }
        });
    }
});