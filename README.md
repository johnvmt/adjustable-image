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
					background-color: #ff0000;
				}
			</style>
		</head>
		<body>
		<div style="width: 90%; height: 90%; position: relative; top: 5%; left: 5%; display: block; background-color: #333333">
			<adjustable-image src="img.jpg" croptop="20" cropleft="10" cropright="0" cropbottom="30"></adjustable-image>
		</div>
		</body>
    </html>