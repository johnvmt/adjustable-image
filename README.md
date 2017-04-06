## Description

Web component to embed an image in a webpage, with cropping controls. Image will entirely fill its container

## Usage

	<!DOCTYPE html>
    <html>
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    	<!-- Polyfill -->
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.7/webcomponents.min.js"></script>
    	<link rel="import" href="adjustable-image.html">
    
    	<style>
    		body, html {
    			height: 100%;
    			padding: 0;
    			margin: 0;
    			background-color: #ffffff;
    		}
    	</style>
    </head>
    <body>
    <div style="width: 30%; height: 30%; position: relative; display: block;">
    	ORIGINAL
    	<adjustable-image>
    		<img src="image.jpg" style="width: 100%; height: 100%;"/>
    	</adjustable-image>
    	
    	RED ONLY
    	<adjustable-image matrix-r="1" matrix-g="0" matrix-b="0">
    		<img src="image.jpg" style="width: 100%; height: 100%;"/>
    	</adjustable-image>
    	
    	PARTIALLY MAP BLUES AND GREENS TO RED
    	<adjustable-image matrix-r="1" matrix-g-r="0.2" matrix-b-r="0.2" matrix-g="1" matrix-b="1">
    		<img src="image.jpg" style="width: 100%; height: 100%;"/>
    	</adjustable-image>
    
    	CROP 25% ALL THE WAY AROUND
    	<adjustable-image crop-top="25" crop-left="25" crop-right="25" crop-bottom="25">
    		<img src="image.jpg" style="width: 100%; height: 100%;"/>
    	</adjustable-image>
    
    	FILTER: HUE ROTATE 90deg
    	<adjustable-image filter-hue-rotate="90deg">
    		<img src="image.jpg" style="width: 100%; height: 100%;"/>
    	</adjustable-image>
    
    	FILTER: BLUR
    	<adjustable-image filter-blur="5px">
    		<img src="image.jpg" style="width: 100%; height: 100%;"/>
    	</adjustable-image>
    </div>
    </body>
    </html>