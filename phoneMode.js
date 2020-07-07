// ספריית אופליין, מאפשרת פתיחה של הדף ללא אינטרנט וללא מחיקה של הקאש כל פעם מחדש
if('serviceWorker' in navigator && location.hostname !== 'localhost'){
    let location = "../"
    navigator.serviceWorker.register(location + 'sw.js');
}


// דף קולי שמסדר בעזרת השם את הבעיה בטלפונים שהמסך יהיה רק לרוחב
$(function () {
    if ('ontouchstart' in document) {
        document.body.requestFullscreen().then(null, console.log);
        screen.orientation.lock("landscape").than(null, e => {
            console.log(e);
            window.matchMedia("(orientation: portrait)").addListener(function() {
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
        );
    }
});