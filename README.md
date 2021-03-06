## adjustable-image

Web component to embed an image in a webpage, with cropping controls. Image will entirely fill its container

## Usage

	<!DOCTYPE html>
	<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
		<script type="module" src="AdjustableImage.js"></script>
	
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
	<div style="width: 75%; height: 75%; position: relative; top: 10%; left: 10%; display: block;">
		ORIGINAL
		<adjustable-image>
			<img src="image.jpg" style="width: 100%; height: 100%;"/>
		</adjustable-image>
	
		<br/>RED ONLY
		<adjustable-image matrix-r="1" matrix-g="0" matrix-b="0">
			<img src="image.jpg" style="width: 100%; height: 100%;"/>
		</adjustable-image>
	
		<br/>PARTIALLY MAP BLUES AND GREENS TO RED
		<adjustable-image matrix-r="1" matrix-g-r="0.2" matrix-b-r="0.2" matrix-g="1" matrix-b="1">
			<img src="image.jpg" style="width: 100%; height: 100%;"/>
		</adjustable-image>
	
		<br/>CROP 25% ALL THE WAY AROUND
		<adjustable-image crop-top="25" crop-left="25" crop-right="25" crop-bottom="25">
			<img src="image.jpg" style="width: 100%; height: 100%;"/>
		</adjustable-image>
	
		<br/>FILTER: HUE ROTATE 90deg
		<adjustable-image filter-hue-rotate="90deg">
			<img src="image.jpg" style="width: 100%; height: 100%;"/>
		</adjustable-image>
	
		<br/>FILTER: BLUR
		<adjustable-image filter-blur="5px">
			<img src="image.jpg" style="width: 100%; height: 100%;"/>
		</adjustable-image>
	
		<br/>IFRAME, RED ONLY AND CROPPED 10% ALL THE WAY AROUND
		<adjustable-image matrix-r="1" matrix-g="0" matrix-b="0" crop-top="10" crop-left="10" crop-right="10" crop-bottom="10">
			<iframe src="http://wikipedia.org" style="width: 100%; height: 100%;"></iframe>
		</adjustable-image>
	</div>
	</body>
	</html>