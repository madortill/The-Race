// דף קולי שמסדר בעזרת השם את הבעיה בטלפונים שהמסך יהיה רק לרוחב
$(function () {
    if (screen.orientation.type.indexOf("primary") === -1) {
        screen.orientation.lock("landscape");    
    }
});