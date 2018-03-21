import { mixinDOMEvents } from 'dom-events-mixin';
import isTouchDevice from 'is-touch-device';

class Evented {
    constructor(element){
        this.element = element;
    }
}

mixinDOMEvents(Evented.prototype);

class HoverBehavior extends Evented {
    constructor(element, {
        cursor = 'default',
        target = null,
        hover = ()=>{},
        unhover = ()=>{}
    } = {}){

        this.element = element;
        this.target = target;
        this.cursor = cursor;

        if(!isTouchDevice()){
            if(!target){
                this
                .on('hover', hover)
                .on('unhover', unhover);
            }else{
                this
                .on('hover', target, hover)
                .on('unhover', target, unhover);
            }
        }

        this.destroy = function(){
            if(!isTouchDevice()){
                if(!target){
                    this
                    .off('hover', hover)
                    .off('unhover', unhover);
                }else{
                    this
                    .off('hover', target, hover)
                    .off('unhover', target, unhover);
                }
            }
        };
    }
    set cursor(v){
        let cursor = this._cursor = v;
        if(this.target){
            Array.prototype.slice(this.element.querySelectorAll(this.target))
            .forEach(el=>{
                el.style.cursor = cursor;
            });
        }else{
            this.element.style.cursor = cursor;
        }
    }
    on(event, listener, options){
        if(event === 'hover'){
            return super.on('mouseover', listener, options);
        }else if(event === 'unhover'){
            return super.on('mouseleave', listener, options);
        }
        return this;
    }
    off(event, listener, options){
        if(event === 'hover'){
            return super.off('mouseover', listener, options);
        }else if(event === 'unhover'){
            return super.off('mouseleave', listener, options);
        }
        return this;
    }
}



export function hoverize(element, options){
    return new HoverBehavior(element, options);
}
