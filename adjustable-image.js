class AdjustableImage extends HTMLElement {
	constructor() {
		super(); // Always call super first in constructor

		let thisElem = this;

		// Gets content from <template>
		let shadow = thisElem.attachShadow({mode: 'open'});

		shadow.innerHTML = `<style>
				:host {
					display: block;
					height: 100%;
					width: 100%;
				}
			</style>
			<div id="outerContainer" style="width: 100%; height: 100%; overflow: hidden;">
				<div id="container" style="width: 100%; height: 100%; background-color: #00ff00; clip-path: url(#cropRectangle); overflow: hidden;"><slot></slot></div>
			</div>
			<svg height="0" width="0" style="display: none;">
				<defs>
					<clipPath id="cropRectangle">
						<rect x="50" y="50" width="50" height="50" />
					</clipPath>
					<filter id="colorize">
						<feColorMatrix
								type="matrix"
								values="1	0	0	0	0
										0	1	0	0	0
										0	0	1	0	0
										0	0	0	1	0 ">
						</feColorMatrix>
					</filter>
				</defs>
			</svg>`;

		thisElem._config = {
			colorizeFilterId: 'colorize'
		};

		// Get the container (div)
		thisElem._elements = {
			container: shadow.querySelector('#container'),
			svg: shadow.querySelector('svg'),
			clipPath: shadow.querySelector('svg #cropRectangle rect'),
			feColorMatrix: shadow.querySelector('svg feColorMatrix')
		};

		// For Polyfill
		document.head.appendChild(thisElem._elements.svg); // Append SVG to end of head
		let currentColorizedFilterId = thisElem._config.colorizeFilterId;
		thisElem._config.colorizeFilterId = thisElem._uniqueId();
		thisElem._elements.svg.querySelector('#' + currentColorizedFilterId).setAttribute('id', thisElem._config.colorizeFilterId)
	}

	connectedCallback() {
		const thisElem = this;

		thisElem.updateCropsAndStyles();

		// Observe attributes
		const observer = new MutationObserver(function() {
			thisElem.updateCropsAndStyles();
		});

		observer.observe(thisElem, {attributes: true, childList: false, subtree: false });

		// Triggered when the window is resized
		window.addEventListener('resize', function() {
			thisElem.crop();
		});
	}

	updateCropsAndStyles() {
		this.crop();
		this.applyCss();
		this.applyMatrix();
	}

	crop() {
		let thisElem = this;

		let cropTop = Number(thisElem.getAttribute('crop-top'));
		let cropBottom = Number(thisElem.getAttribute('crop-bottom'));
		let cropLeft = Number(thisElem.getAttribute('crop-left'));
		let cropRight = Number(thisElem.getAttribute('crop-right'));

		window.requestAnimationFrame(function() {
			let originalWidth = thisElem._elements.container.clientWidth;
			let originalHeight = thisElem._elements.container.clientHeight;

			let clipX = (cropLeft / 100) * originalWidth;
			let clipY = (cropTop / 100) * originalHeight;
			let clipWidth = originalWidth * ((100 - (cropLeft + cropRight)) / 100);
			let clipHeight = originalHeight * ((100 - (cropTop + cropBottom)) / 100);

			// Crop
			thisElem._elements.clipPath.setAttribute('x', clipX);
			thisElem._elements.clipPath.setAttribute('y', clipY);
			thisElem._elements.clipPath.setAttribute('width', clipWidth);
			thisElem._elements.clipPath.setAttribute('height', clipHeight);

			// Reposition & scale
			thisElem._elements.container.style.position = 'relative';
			thisElem._elements.container.style.transformOrigin = 'top left';
			thisElem._elements.container.style.transform = 'scale(' + originalWidth / clipWidth + ', ' + originalHeight / clipHeight + ') translate(' + -1 * clipX + 'px, ' + -1 * clipY + 'px)';
		});
	}

	applyCss() {
		let filters = this._getAttributes();

		let filterPrefix = 'filter-';
		let filtersString = 'url(#' + this._config.colorizeFilterId + ')';
		this._objectForEach(filters, function(filterVal, filterKey) {
			if(filterKey.indexOf(filterPrefix) === 0)
				filtersString += " " + filterKey.substr(filterPrefix.length) + '(' + filterVal + ')';
		});

		this.style['filter'] = filtersString;
		this.style['-webkit-filter'] = filtersString;
	};

	applyMatrix() {
		let elemAttributes = this._getAttributes();
		let matrixAttributePrefix = 'matrix-';

		let horizontalKeys = ['r', 'g', 'b', 'a', 'm'];
		let verticalKeys = ['r', 'g', 'b', 'a'];

		let matrixString = '';
		verticalKeys.forEach(function(verticalKey, verticalKeyIndex) {
			if(verticalKeyIndex)
				matrixString += '\r\n';
			horizontalKeys.forEach(function(horizontalKey, horizontalKeyIndex) {
				if(horizontalKeyIndex)
					matrixString += ' ';

				let matrixValue = undefined;
				if(verticalKey === horizontalKey && typeof elemAttributes[matrixAttributePrefix + horizontalKey] !== 'undefined')
					matrixValue = Number(elemAttributes[matrixAttributePrefix + horizontalKey]);
				else if(typeof elemAttributes[matrixAttributePrefix + horizontalKey + '-' + verticalKey] !== 'undefined')
					matrixValue = Number(elemAttributes[matrixAttributePrefix + horizontalKey + '-' + verticalKey]);
				else if(verticalKey === horizontalKey)
					matrixValue = 1;
				else
					matrixValue = 0;
				matrixString += matrixValue;
			});
		});

		this._elements.feColorMatrix.setAttribute('values', matrixString);
	};

	emitMirror(mirrorTag, functionName, functionArgs) {
		if(typeof functionArgs === 'undefined')
			functionArgs = [];

		let emitMirrorDetail = {function: functionName, arguments: Array.prototype.slice.call(functionArgs)};
		if(typeof mirrorTag !== 'undefined')
			emitMirrorDetail.tag = mirrorTag;

		let emitEvent = document.createEvent('CustomEvent');
		emitEvent.initCustomEvent('mirror', true, true, emitMirrorDetail);
		this.dispatchEvent(emitEvent);
	};

	/* Component utility Functions */
	// Get all attributes of element, converting keys to lowercase
	_getAttributes(target) {
		if(typeof target === 'undefined')
			target = this;

		let attributes = {};
		for(let ctr = 0; ctr < target.attributes.length; ctr++) {
			attributes[target.attributes[ctr].nodeName.toLowerCase()] = target.attributes[ctr].nodeValue;
		}
		return attributes;
	}

	// Iterate over object properties
	_objectForEach(object, callback) {
		// run function on each property (child) of object
		let property;
		for(property in object) { // pull keys before looping through?
			if (object.hasOwnProperty(property))
				callback(object[property], property, object);
		}
	}

	_uniqueId() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	};
}

customElements.define('adjustable-image', AdjustableImage);

export default AdjustableImage;