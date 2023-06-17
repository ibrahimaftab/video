# VideoMania

This project has been created using Vanilla JavaScript.

## Description

VideoMania is a JavaScript library that supports various video formats and streaming technologies. It allows you to easily integrate videos into your web applications.

## Features

- **Browser Support:** VideoMania supports all major browsers' video formats, including MP4, WebM, Ogg, AVI, MOV, and MKV.

- **HLS Support:** VideoMania provides support for HTTP Live Streaming (HLS) for both Video on Demand (VOD) and Live Streaming scenarios. You can seamlessly stream videos using the HLS protocol.

- **DASH Support:** VideoMania supports Dynamic Adaptive Streaming over HTTP (DASH) for VOD and Live Streaming. It allows for adaptive streaming, adjusting video quality based on the viewer's network conditions.

## Installation

To use VideoMania in your project, follow these steps:

1. Install VideoMania by running the command: `npm install videoMania`

2. Import VideoMania into your JavaScript file:

   ```javascript
   import { videoMania } from 'videomania';

#### Property Descriptions

- `width` (number, default: 800): Specifies the width of the video player in pixels.

- `height` (number, default: 450): Specifies the height of the video player in pixels.

- `autoplay` (boolean, default: false): Determines whether the video should start playing automatically when loaded.

- `muted` (boolean, default: false): Specifies whether the video should be muted initially.

- `loop` (boolean, default: false): Indicates whether the video should loop and restart automatically after it finishes playing.

- `url` (string): The URL or path to the video file that you want to play. This is a required property.

- `id` (string): Optional identifier for the video player element.

- `qualities` (array): An array of objects representing different video quality options. Each object should have `label` (string) and `src` (string) properties.

- `subtitles` (array): An array of objects representing different subtitle options for the video. Each object should have `label` (string), `src` (string), and `srclang` (string) properties.

- `toggleSubtitle` (boolean, default: false): Specifies whether the user can toggle the display of subtitles on or off.

- `forward` (number, default: 10): The number of seconds to skip forward when the user clicks the forward button.

- `backward` (number, default: 10): The number of seconds to skip backward when the user clicks the backward button.

- `controls` (boolean, default: true): Determines whether the default video controls are displayed.

- `rounded` (boolean, default: true): Specifies whether to apply rounded corners to the video player element.

- `addStyle` (boolean, default: true): Specifies whether to add default styling to the video player element.

- `disablePictureInPictureMode` (boolean, default: false): Specifies whether to disable Picture-in-Picture mode for the video.

- `activeBrowserTabPlay` (boolean, default: false): Specifies whether the video should continue playing when the browser tab is inactive.