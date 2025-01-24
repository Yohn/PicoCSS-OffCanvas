# Offcanvas Component

An accessible, responsive, and customizable offcanvas component built using SCSS, HTML, and Vanilla JavaScript. The component is designed to work seamlessly on all modern browsers and devices, offering flexible configuration through data attributes and JavaScript.

---

## Features
- Configurable sliding directions (`top`, `left`, `bottom`, `right`).
- Content loading from a URL or inline source.
- Push or overlay page content.
- Optional backdrop.
- Configurable scroll behavior for the main page.
- Closeable via backdrop clicks or buttons.
- Easily customizable animations.
- Events for opening, loading content, and closing.
- Support for multiple offcanvas instances.
- Can slide into specific containers instead of the entire body.

---

## Installation
Include the PicoCSS stylesheet and your custom JavaScript and SCSS:

### PicoCSS CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yohn/PicoCSS@2.2.8/css/pico.lime.css">
```

### Custom Files:
```html
<link rel="stylesheet" href="path/to/offcanvas.css">
<script src="path/to/offcanvas.js" defer></script>
```

---

## HTML Structure
Each offcanvas requires a trigger button and a corresponding target container:

### Example:
```html
<button class="offcanvas-trigger" data-offcanvas-target="#offcanvas-1" data-offcanvas-options='{"direction": "left", "backdrop": true}'>
	Open Offcanvas
</button>

<div id="offcanvas-1" class="offcanvas">
	<button class="offcanvas-close">Close</button>
	<div class="offcanvas-content">
		<p>Offcanvas Content</p>
	</div>
</div>
```

---

## Configuration
The component can be configured via:
- **Data Attributes**
- **JavaScript Options**

### Data Attributes
#### `data-offcanvas-target` (required):
Specifies the target offcanvas element to open.
- **Value:** CSS selector of the target element.

#### `data-offcanvas-options` (optional):
JSON string to define offcanvas options.

### JavaScript Options
Options can also be passed programmatically when initializing the `Offcanvas` class.

```javascript
const offcanvas = new Offcanvas(trigger, {
	direction: 'left',
	push: true,
	backdrop: true,
	scroll: false,
	animation: 'slide-in',
	container: 'body',
});
offcanvas.init();
```

---

## Options
The following options are available:

| Option         | Type      | Default   | Description                                                                 |
|----------------|-----------|-----------|-----------------------------------------------------------------------------|
| `direction`    | `string`  | `right`   | The direction from which the offcanvas appears (`top`, `left`, `bottom`, `right`). |
| `push`         | `boolean` | `false`   | Whether the offcanvas pushes or overlays the page content.                 |
| `backdrop`     | `boolean` | `true`    | Whether to display a backdrop when the offcanvas is open.                  |
| `scroll`       | `boolean` | `false`   | Whether the page remains scrollable when the offcanvas is open.            |
| `animation`    | `string`  | `slide-in`| Animation class for showing/hiding the offcanvas.                          |
| `container`    | `string`  | `body`    | Selector for the container element into which the offcanvas slides.        |

---

## Methods
The `Offcanvas` class provides the following methods:

### `init()`
Initializes the offcanvas component by adding event listeners.

### `open()`
Opens the offcanvas.

### `close()`
Closes the offcanvas.

### Example:
```javascript
const trigger = document.querySelector('.offcanvas-trigger');
const offcanvas = new Offcanvas(trigger, { direction: 'top' });
offcanvas.init();
offcanvas.open();
offcanvas.close();
```

---

## Events
The component triggers the following custom events:

| Event              | Description                                               |
|--------------------|-----------------------------------------------------------|
| `offcanvas:open`   | Triggered when the offcanvas is opened.                   |
| `offcanvas:close`  | Triggered when the offcanvas is closed.                   |
| `offcanvas:loaded` | Triggered when the offcanvas content is loaded via a URL. |

### Example:
```javascript
const offcanvas = new Offcanvas(trigger);
offcanvas.init();

offcanvas.target.addEventListener('offcanvas:open', () => {
	console.log('Offcanvas opened');
});

offcanvas.target.addEventListener('offcanvas:close', () => {
	console.log('Offcanvas closed');
});
```

---

## Styling
Default dimensions for the offcanvas can be customized via SCSS variables.

### Default Dimensions:
```scss
.offcanvas {
	width: 20rem; // For left and right directions
	height: 20rem; // For top and bottom directions
}
```

To customize animations or dimensions, override the SCSS variables or write additional styles.

---

## Examples
### Multiple Offcanvas Buttons:
```html
<button class="offcanvas-trigger" data-offcanvas-target="#offcanvas-1" data-offcanvas-options='{"direction": "left"}'>Open Left</button>
<button class="offcanvas-trigger" data-offcanvas-target="#offcanvas-2" data-offcanvas-options='{"direction": "right"}'>Open Right</button>
<button class="offcanvas-trigger" data-offcanvas-target="#offcanvas-3" data-offcanvas-options='{"direction": "top"}'>Open Top</button>
<button class="offcanvas-trigger" data-offcanvas-target="#offcanvas-4" data-offcanvas-options='{"direction": "bottom"}'>Open Bottom</button>

<div id="offcanvas-1" class="offcanvas"><button class="offcanvas-close">Close</button></div>
<div id="offcanvas-2" class="offcanvas"><button class="offcanvas-close">Close</button></div>
<div id="offcanvas-3" class="offcanvas"><button class="offcanvas-close">Close</button></div>
<div id="offcanvas-4" class="offcanvas"><button class="offcanvas-close">Close</button></div>
```

---

## License
This offcanvas component is provided under the [MIT License](LICENSE).
