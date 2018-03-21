import { hoverize } from '../';

const el = document.createElement('p');
el.textContent = 'Hello universe!';
document.body.appendChild(el);

const hover = hoverize(el, {
    hover(){
        this.style.opacity = 0.5;
    },
    unhover(){
        this.style.opacity = 1;
        //hover.destroy();
    }
});
