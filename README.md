dom-behavior-hover
===

Install
---

`npm install dom-behavior-hover`

Usage
---

```javascript
import { hoverize } from 'dom-behavior-hover';

const el = document.createElement('p');
el.textContent = 'Hello universe!';
document.body.appendChild(el);

const hover = hoverize(el, {
    //If target is set to a selector
    //then the hover will happen on those
    //selected elements instead.
    target: null,
    //Change the cursor of the element, or target
    cursor: 'default',
    hover(){
        this.style.opacity = 0.5;
    },
    unhover(){
        this.style.opacity = 1;
        //Clean up after one hover
        hover.destroy();
    }
});

//You can set events outside the constructor too.
//In a touch environment setting events
//like this won't be as useful.
hover.on('hover', ()=>{
    console.log('Hovered!');
});
```

About
---

Quickly give an element hover behaviors.

For saving memory when in a touch device the hover/unhover constructor methods do not get used.

`dom-behavior-hover` uses [dom-events-mixin](https://github.com/hollowdoor/dom_events_mixin)
