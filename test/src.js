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

const hover2 = hoverize(document.querySelector('ul'), {
    target: 'li',
    hover(e){
        e.target.style.opacity = 0.5;
    },
    unhover(e){
        e.target.style.opacity = 1;
        //hover.destroy();
    }
});
