import { mixinDOMEvents } from 'dom-events-mixin';
import isTouchDevice from 'is-touch-device';

var Evented = function Evented(element){
    this.element = element;
};

mixinDOMEvents(Evented.prototype);

var HoverBehavior = (function (Evented) {
    function HoverBehavior(element, ref){
        if ( ref === void 0 ) ref = {};
        var cursor = ref.cursor; if ( cursor === void 0 ) cursor = 'default';
        var target = ref.target; if ( target === void 0 ) target = null;
        var hover = ref.hover; if ( hover === void 0 ) hover = function (){};
        var unhover = ref.unhover; if ( unhover === void 0 ) unhover = function (){};


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

    if ( Evented ) HoverBehavior.__proto__ = Evented;
    HoverBehavior.prototype = Object.create( Evented && Evented.prototype );
    HoverBehavior.prototype.constructor = HoverBehavior;

    var prototypeAccessors = { cursor: {} };
    prototypeAccessors.cursor.set = function (v){
        var cursor = this._cursor = v;
        if(this.target){
            Array.prototype.slice(this.element.querySelectorAll(this.target))
            .forEach(function (el){
                el.style.cursor = cursor;
            });
        }else{
            this.element.style.cursor = cursor;
        }
    };
    HoverBehavior.prototype.on = function on (event, listener, options){
        if(event === 'hover'){
            return Evented.prototype.on.call(this, 'mouseover', listener, options);
        }else if(event === 'unhover'){
            return Evented.prototype.on.call(this, 'mouseleave', listener, options);
        }
        return this;
    };
    HoverBehavior.prototype.off = function off (event, listener, options){
        if(event === 'hover'){
            return Evented.prototype.off.call(this, 'mouseover', listener, options);
        }else if(event === 'unhover'){
            return Evented.prototype.off.call(this, 'mouseleave', listener, options);
        }
        return this;
    };

    Object.defineProperties( HoverBehavior.prototype, prototypeAccessors );

    return HoverBehavior;
}(Evented));



function hoverize(element, options){
    return new HoverBehavior(element, options);
}

export { hoverize };
//# sourceMappingURL=bundle.es.js.map
