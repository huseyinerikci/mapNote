# Map Note Project

**MapNote** is a web application that allows you to create notes on the map, edit these notes and save your bookmarks. It takes map data with the Leaflet.js library, saves the coordinates of places that users specify on the map and adds notes. Notes can be saved with title, date, type of task to be done (visit, work, park, home) and images. It is also possible to delete notes and fly to the specified coordinate on the map. Notes are stored using local storage (localStorage).

## Preview

A preview of my Map Note project is in the gif below.

![mapnote](https://github.com/user-attachments/assets/972147e5-4039-4f4b-bdec-8408c7724850)

## Features

* Map Integration with Leaflet.js: Map data was obtained using Leaflet.js and you can navigate on the map.
* Selecting Coordinates and Adding Markers: The user can get coordinates by clicking on a point on the map and add a "marker" on it.
* Adding Notes: A note can be added to each marker. Notes include information such as title, date and type of task to be done (visit, work, park, home).
* Delete and Fly Icons Inside Note: Each note has a delete icon and a fly icon that can be used to zoom into a map and go to a specific coordinate.
* LocalStorage Support: All notes and markers to be added are stored in local storage, so data will not be lost even if the page is refreshed.
* Responsive Design: The application has a responsive design that adapts to different screen sizes.

## Technologies
* HTML5
* CSS3
* JavaScript
* Leaflet.js
* LocalStorage
