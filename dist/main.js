import { Space } from "./space.js";
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 4;
canvas.height = window.innerHeight * 4;
const ctx = canvas.getContext("2d");
const space = new Space(ctx, canvas.width, canvas.height);
function animate() {
    space.update();
    requestAnimationFrame(animate);
}
animate();
// This is a hack to make the cleanup function available to the server
const cleanup = "__sserver_cleanup_main";
window[cleanup] = () => {
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
