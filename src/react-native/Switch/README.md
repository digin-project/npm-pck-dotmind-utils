## Switch

* 📄 index.js
* 📄 Switch.js

---

### DOC

```javascript
type Props = {
  activeBackgroundColor?: string, // active container background color (default: 'transparent')
  activeSwitchColor?: string, // active switch color (default: 'white')
  activeText?: string, // active text
  activeTextColor?: string, // active text color (default: 'white')
  handleChange: (boolean) => void, // handler on click (passes the active state as parameter)
  inactiveBackgroundColor?: string, // inactive container background color (default: 'transparent')
  inactiveSwitchColor?: string, // inactive switch color (default: 'white')
  inactiveText?: string, // inactive text
  inactiveTextColor?: string, // inactive text color (default: 'white')
  isActive?: boolean, // initial active state (default: false)
  styles?: { // styles of the element
    activeText?: TextStyleProp, // active text style
    container?: ViewStyleProp, // container style
    inactiveText?: TextStyleProp, // inactive text style
    switch?: ViewStyleProp, // switch style
    text?: TextStyleProp, // all text style
    textContainer?: ViewStyleProp, // text container style
    textsContainer?: ViewStyleProp, // texts container style
  },
  switchSize?: number, // switch size (default: 15)
};
```
