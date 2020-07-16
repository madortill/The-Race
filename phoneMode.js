// דף קולי שמסדר בעזרת השם את הבעיה בטלפונים שהמסך יהיה רק לרוחב
$(function () {
    if ('ontouchstart' in document) {
        let media = window.matchMedia("(orientation: portrait)");
        media.addListener(orient);
        function orient(e) {
            rotation.angle = window.orientation || screen.orientation.angle;
            if (media.matches) {
                rotation.sin = /*Math.sin(90 / 180 * Math.PI)*/1;
                rotation.cos = /*Math.cos(90 / 180 * Math.PI)*/0;
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
                rotation.sin = /*Math.sin(0 / 180 * Math.PI)*/0;
                rotation.cos = /*Math.cos(0 / 180 * Math.PI)*/1;
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

let rotation = {angle: 90, sin: 0, cos: 1};

function transform(el) {
    let {x, y, left, top,  height, width} = el;
    if (x || y) {
        el.x = rotation.cos * x + rotation.sin * y;
        el.y = -rotation.sin * x + rotation.cos * y;
    }

    if (left || top) {
        el.left = rotation.cos * left + rotation.sin * top;
        el.top = -rotation.sin * left + rotation.cos * top;
    }

    if (width || height) {
        el.width = Math.abs(rotation.cos * width + rotation.sin * height);
        el.height =  Math.abs(-rotation.sin * width + rotation.cos * height);
    }
    return el;
}

function transformDrag(e, ui) {
    let left = ui.position.left;
    let top = ui.position.top;
    ui.position.left = rotation.cos * left + rotation.sin * top;
    ui.position.top = -rotation.sin * left + rotation.cos * top;
    ui.helper.css({
        left: rotation.cos * left + rotation.sin * top,
        top: -rotation.sin * left + rotation.cos * top
    });
}