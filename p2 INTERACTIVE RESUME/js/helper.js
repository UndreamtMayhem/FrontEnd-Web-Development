/*
This file contains all of the code running in the background that makes
resumeBuilder.js possible.
*/

//HEADER
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="header-text">%data%</span><hr>';

//BIO
var HTMLcontactGeneric = '<li class="flex-item"><span class="blue-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="blue-text">mobile</span><span class="white-text"><a class="social-links">%data%</a></span></li>';
var HTMLemail = '<li class="flex-item"><span class="blue-text">email</span><span class="white-text"><a class="social-links" href="mailto:undreamtmayhem@outlook.com?Subject=Enquires">%data%</a></span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="blue-text">twitter</span><span class="white-text"><a class="social-links" href="https://twitter.com/undreamtmayhem">%data%</a></span></li>';
var HTMLgithub = '<li class="flex-item"><span class="blue-text">github</span><span class="white-text"><a class="social-links" href="https://github.com/UndreamtMayhem">  %data% </a></span></li>';
var HTMLfacebook = '<li class="flex-item"><span class="blue-text">Facebook</span><span class="white-text"><a class="social-links" href="https://www.facebook.com/UndreamtMayhem>%data%</a></span></li>';
var HTMLaboutme = '<li class="flex-item"><span class="blue-text">AboutME</span><span class="white-text"><a class="social-links" href="https://about.me/undreamtmayhem">%data%</a></span></li>';
var HTMLblog = '<li class="flex-item"><span class="blue-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="blue-text">location</span><span class="white-text"><a class="social-links" href="https://goo.gl/maps/a4GSqM7G6vB2">%data%</a></span></li>';
var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

//SKILLS
var HTMLskillsStart = '<h3 id="skills-h3">Programming Skills</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

//WORK  // Future projects
var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a  href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p class="work-text">%data%</p>';

//PROJECT
var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a class="course-title" href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

//EDUCATION
var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

//ONLINE CLASSES
var HTMLonlineClasses = '<h3 id="online-header">Online Classes</h3>';
var HTMLonlineTitle = '<a href="#" class="online-titles">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineCourseDescriptionHeader = '<h4 class="course-description">Course Description</h4>';
var HTMLonlineDescription = '<p class="online-description">%data%</p>';
var HTMLonlineCourseLearningHeader = '<h5>Course Learning</h5>';
var HTMLonlineCourseLearning = '<p class="course-learning">%data%</p>';
var HTMLonlineCourseLanguagesUsedHeader = '<h6>Languages Used</h6>';
var HTMLonlineCourseLanguagesUsed = '<p>%data%</p>';

var HTMLonlineURL = '<a href="#" class="online-url">%data%</a>';

var HTMLonlineGrade = '<p class="online-grade">Grade: %data%</p>';

//EXTRA FEATURES
var googleMap = '<div id="map"></div>';

/*
The International Name change.
*/
function inName(name){
	name = name.trim().split(" ");
	name[1] = name[1].toUpperCase();
	name[0] = name[0].slice(0,1).toUpperCase() +
    name[0].slice(1).toLowerCase();

	return name[0] + " " + name[1];
}



$(document).ready(function() {
  $('button').click(function() {
    var $name = $('#name');
    var iName = inName($name.text()) || function(){};
    $name.html(iName);
  });
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!

      infoWindow.open(map, marker);




    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}


//Uncomment the code below when you're ready to implement a Google Map!


// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
});
