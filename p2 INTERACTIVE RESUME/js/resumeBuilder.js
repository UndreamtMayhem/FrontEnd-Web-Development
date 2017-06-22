 function DisplayHeader(){
	var programmerName = "Daniel Johnson";
	var programmerRole = "FRONT-END WEB DEVELOPER";
	var formattedName = HTMLheaderName.replace("%data%", programmerName);

	var formattedRole = HTMLheaderRole.replace("%data%", programmerRole);
	$("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);

}
DisplayHeader();

//Bio object eventually send this down 
var bio = {
	"name" : "Daniel Johnson",
	"role" : "FRONT-END WEB DEVELOPER",
	"contacts" : {
		"mobile" : "000-0000-000",
		"email": "undreamtmayhem@outlook.com",
		"github" : "UndreamtMayhem",
		"twitter" : "@undreamtmayhem",
		"location": "Hayle",
		"facebook": "Daniel-P-Johnson",
		"aboutme": "undreamtmayhem",
		},
		"skills" : ["HTML5", "CSS/Less/Sass","JS/jQuery/Angular/nodeJS","Python Django", "Ruby on the rails", "ASP.net"],
		"pictureURL" :"./images/profile.jpg"
};

bio.Display = function(){
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
	var formattedGithub= HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	$("#topContacts").append(formattedEmail);
	$("#topContacts").append(formattedTwitter);
	$("#topContacts").append(formattedGithub);
	$("#topContacts").append(formattedLocation);

	var formattedBioPic = HTMLbioPic.replace("%data%", bio.pictureURL);
	$("#topContacts").after(formattedBioPic);
		
	function skills(){
	if(bio.skills.length > 0){
		$('#header').append(HTMLskillsStart);
		
		for(var i = 0; i < bio.skills.length; i++){
			var formattedSkills = HTMLskills.replace("%data%",bio.skills[i]);
			$('#skills-h3').append(formattedSkills);
		}

	}
};

skills();
	
};

bio.Display();


var work = { 
		"jobs": [{
		"currentJobPosition" : "",
		"Employer" : "<a href='https://www.freecodecamp.com/undreamtmayhem' class='project-links'>CodeCamp</a>",
		"YearsWorker" : "March 5th",
		"City" : "Hayle",
		"jobDescription": "Currently have a portfolio to build and javascript algorithms"
		},
		{
		"currentJobPosition" : "",
		"Employer" : "<a href='#' class='project-links'>Python projects</a>",
		"YearsWorker" : "Feb  27th",
		"City" : "Miami",
		"jobDescription": "Currently Planing on building python projects with TK and kivvy <ul><li class='future-project-desc'> - Calculator</li><li class='future-project-desc'>- Text editor</li><li class='future-project-desc'>- Paint app</li><li class='future-project-desc'>- Database app</li></ul>"		}]
};

function DisplayWork(){
	for (var w in work.jobs) {
		if (work.jobs.hasOwnProperty(w)) {
			var element = work.jobs[w];
			$('#workExperience').append(HTMLworkStart);
			var formattedEmployer = HTMLworkEmployer.replace("%data%", element.Employer + " " + element.currentJobPosition);
			$('.work-entry:last').append(formattedEmployer);
			var formattedWorkDate = HTMLworkDates.replace("%data%", element.YearsWorker);
			$('.work-entry:last').append(formattedWorkDate);
			//var formattedLocation = HTMLworkLocation.replace("%data%", element.City)
			//$('.work-entry:last').append(formattedLocation);
			var formattedWorkDescription = HTMLworkDescription.replace("%data%", element.jobDescription);
			$('.work-entry:last').append(formattedWorkDescription);
		}
	}
};



DisplayWork();






var project = { 
			"projects" : [ {
	"title" : "Front-End Developer Nanodegree",
	"dates" : "In process",
	"description": "<a class='title' href=”#” >Project: Build a Portfolio Site</a><p class='programming-languages'>HTML, CSS, Bootstrap</p><ul><li class='objectives'>Precisely translate initial design documents into static web pages</li><li class='objectives'>Diligently employ a code/test/refine strategy</li><li class='objectives'>Investigate the Document Object Model (DOM)</li><li  class='objectives'>Create and personalize your own multi-platform, responsive CSS framework</li></ul><a  class='title' href=”#”>Project: Interactive Resume</a><p  class='programming-languages'> Module 2: JavaScript Basics </p><ul><li class='objectives'>Transform static web pages into dynamic applications</li><li class='objectives'>Use variables, data structures, conditional statements, loops, and function in JavaScript</li><li class='objectives'>Use the core features of jQuery -- DOM element selections, traversal and manipulation</li></ul><a class='title' href=”#”>Project: Classic Arcade Game Clone</a><p class='programming-languages'>Scope, closures, prototypal inheritance, code reuse</p><li class='objectives'>Add entities to a game loop engine and create the classic arcade game Frogger</li><ul><li class='objectives'>Utilize the various object-oriented programming features within JavaScript</li><li class='objectives'>Write reusable and maintainable libraries</li><li class='objectives'>Create well architected and performant applications</li><li class='objectives'>Make compositions with text and images with memes</li><li class='objectives'>Modify images by applying various effects and filters</li><li class='objectives'>Create animations</li></ul><a href=”#” class='title'>Project: optimize an existing website that achieves 60 frames per second performance</a><ul><li class='objectives'>Recognize the four distinct phases in an app's lifecycle: Response, Animation, Idle and Load (RAIL)</li><li class='objectives'>Profile different apps to find the source of jank</li><li class='objectives'>Optimize layers to reduce the number of steps the browser needs to take to render each frame</li><li class='objectives'>Measure performance via the Timeline view in Chrome Developer Tools</li><li class='objectives'>Use key metrics to triangulate potential performance bottlenecks</li><a href=”#” class='title'>Project: Neighborhood Map</a><p class='programming-languages'>KnockoutJS, third-party APIs, asynchronous programming</p><p>Create a single page app featuring a map of a neighborhood of your choice</p><p>The neighborhood map application is complex enough and incorporates a variety of data points that it can easily become unwieldy to manage.<br/>There are a number of frameworks, libraries and APIs available to make this process more manageable and many employers are looking for specific skills in using these packages.</p><a href=”#” class='title'>Project: Feed Reader Testing</a><ul><li class='objectives'>Query servers using AJAX</li><li class='objectives'>Build a project with an overall organizational paradigm</li><li class='objectives'>Explore code you didn't write, and use a library or framework you aren't familiar with</li><li class='objectives'>Interact with API servers</li><li class='objectives'>Use third-party libraries and APIs</li></ul><ul><li class='objectives'>Write comprehensive suites of tests to validate your application is functioning as intended at all times</li><li class='objectives'>Use the red-green-refactor workflow</li><li class='objectives'>Test asynchronous functions</li>,",
	"image": "./images/197x148.gif"
				},
					{
							"title" : "Full Stack Web Developer Nanodegree",
							"dates" : "A long way off",
							"description": "<h3 class='project-header'>Project: Movie Trailer Website</h3><p>You will write server-side code to store a list of your favorite movies, including box art imagery and a movie trailer URL. You will then serve this data as a web page allowing visitors to review their movies and watch the trailers.</p><ul><li class='objectives' >Programming Foundations with Python</li></ul><h3 class='project-header'>Project: Build a Portfolio Site</h3><p>You will be provided with a design mockup as a PDF-file and must replicate that design in HTML and CSS. You will develop a responsive website that will display images, descriptions and links to each of the portfolio projects you will complete throughout the course of the Front-End Web Developer Nanodegree.</p><ul><li class='objectives'>Responsive Web Design Fundamentals</li><li class='objectives'>Intro to HTML and CSS</li><li class='objectives'>Responsive Images</li></ul><h3 class='project-header'>Project: Multi User Blog</h3><p>In this project you will be building a multi user blog(along the lines of Medium) where users can sign in and post blog posts as well as 'Like' and 'Comment' on other posts made on the blog. You will be hosting this blog on Google App Engine and you will also be creating an authentication system for users to be able to register and sign in and then create blog posts!</p><ul><li class='objectives'>Intro to Backend</li></ul><h3 class='project-header'>Project: Tournament Results</h3><p>You will develop a database schema to store the game matches between players. You will then write code to query this data and determine the winners of various games.</p><ul><li class='objectives'>Intro to Relational Databases<li></ul><h3 class='project-header'>Project: Item Catalog</h3><p>You will develop an application that provides a list of items within a variety of categories as well as provide a user registration and authentication system. Registered users will have the ability to post, edit and delete their own items.</p><ul><li class='objectives'>Authentication & Authorization: OAuth</li><li class='objectives'>Full Stack Foundations</li><h3 class='project-header'>Project: Neighborhood Map</h3><p>You will develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this application, including: map markers to identify popular locations or places you’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. You will then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc).</p><ul><li class='objectives'>Intro to AJAX</li><li class='objectives'>JavaScript Design Patterns</li><h3 class='project-header'>Project: Design a Game</h3><p>In this project you will use these skills to develop your own game! You will write an API with endpoints that will allow anyone to develop a front-end for your game. Since you aren't required to write a front-end you can use API explorer to test your API.</p><ul><li class='objectives'>Developing Scalable Apps in Python</li></ul><h3 class='project-header'>Project: Linux Server Configuration</h3><p>You will take a baseline installation of a Linux distribution on a virtual machine and prepare it to host your web applications, to include installing updates, securing it from a number of attack vectors and installing/configuring web and database servers.</p><ul><li class='objectives'>Configuring Linux Web Servers</li><li class='objectives'>Linux Command Line Basics</li>"
						
							}	
	   					 ]	
};


project.display = function(){
	
	for (var p in project.projects) {
		if (project.projects.hasOwnProperty(p)) {
			var element = project.projects[p];
			$("#projects").append(HTMLprojectStart);
			
			var formattedProjecttitle = HTMLprojectTitle.replace("%data%", element.title);
			$(".project-entry:last").append(formattedProjecttitle);
			
			//var formattedProjectDate = HTMLprojectDates.replace("%data%", element.dates);
			//$(".project-entry:last").append(formattedProjectDate);
			
			var formattedProjectDescription = HTMLprojectDescription.replace("%data%", element.description);
			$(".project-entry:last").append(formattedProjectDescription);
			
			//var formattedProjectImage = HTMLprojectImage.replace("%data%", element.image);
			//$(".project-entry:last").append(formattedProjectImage);
			
		}
	}
};

project.display();



var education = {
	"schools": [{
		"name" : "Truro – Penwith {add link}",
		"location" : "Penzance",
		"degree" : "HND",
		"majors": "Applied Psychology",
		"date" : "12"	      },
		  {
		"name" : "Plymouth University {add link}",
		"location" : "Truro",
		"degree" : "BDC",
		"majors": "BSC Psychology",
		"date" : "12"
	      },
	],
	"onlineCourses" : [
		{
		"Title":  "CS50 ",
		"Schools" : "Harvard EDX",
		"URL": "Github repository",
		"date": "Start: 24/05/2016 End: 25/05/2016",
		"grade": "A+",
		"description": "Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development. Languages include C, PHP, and JavaScript plus SQL, CSS, and HTML.",
		"courseLearning": "",
		"languageUsed": "C, PHP, and JavaScript plus SQL, CSS, and HTML.",

	    },
		{
		"Title":  "Program design -	Level introduction",
		"Schools" : "EDX",
		"URL": "Github repository",
		"date": "Start: 10/10/2016",
		"grade": "N/A",
		"description": "Learn a programming method that will allow you to develop programs that are clear, well tested, and easy for others to improve.",
		"courseLearning": "How to represent information as data.-	How to focus each part of your program on a single task. -	How to use examples to clarify what your program should do. -	How to determine the proper tests for a program. -	How to simplify the structure of your program using common patterns",
		"languageUsed": "Dr Racket",

	    },

		{
		"Title":  "Effective Thinking Through Mathematics",
		"Schools" : "Austin Texas EDX",
		"URL": "Github repository",
		"date": "TBC",
		"grade": "N/A",
		"description": "Engage in thinking about mathematical ideas, •	Apply effective strategies of thinking to approach questions in your lives with insight and innovation, •	Think more effectively and imaginatively throughout your lives. illustrating methods of thinking that are applicable to your own life ",
		"courseLearning": "The five elements of effective thinking. the concept of number from basic to its infinite variety, and see how those insights flow from strategies of effective thinking",
		"languageUsed": "C, PHP, and JavaScript plus SQL, CSS, and HTML.",

	    },
		{//tidy this up display it nicely
		"Title":  "Programming Languages",
		"Schools" : "udacity",
		"URL": "Github repository",
		"date": "TBC",
		"grade": "N/A",
		"description": "This class will give you an introduction to the fundamentals of programming languages. Key concepts include how to specify and process valid strings, sentences and program structures. ",
		"courseLearning": "String Patterns: Find and specify classes of strings using regular expressions. Learn how to escape problematic characters. Represent a Finite State Machine. Lexical Analysis: Breaking strings down into important words.Write your own lexer that can tokenize HTML strings.Use regular expressions to parse, lex, and tokenize HTML and JavaScript. Grammars: How to specify and deconstruct valid sentences. Parsing grammars and discovering errors using regular expressions. Use generators to parse strings.<h5 id='parse'>Parsing:</h5>  <p>Turning sentences into trees. Discover malformed input. Set precedence to prioritize parsing of strings. Interpreting: Simulating programs. Write an HTML interpreter. Calling functions and interpreting function definitions.Building a Web Browser: Interpreting HTML and JavaScript. Build your own web browser. Optimize the performance of your web browser.</p>",
		"languageUsed": "",

	    },
		{
		"Title":  "Program design - Level introduction - EDX",
		"Schools" : "Udacity",
		"URL": "Github repository",
		"date": "TBC",
		"grade": "N/A",
		"description": "Learn a programming method that will allow you to develop programs that are clear, well tested, and easy for others to improve.",
		"courseLearning": "<li>How to represent information as data.</li><li>How to focus each part of your program on a single task. </li><li>How to use examples to clarify what your program should do. </li><li>How to determine the proper tests for a program. </li><li>How to simplify the structure of your program using common patterns</li>",
		"languageUsed": "",
	    }
		/*{
		"Title":  "",
		"Schools" : "",
		"URL": "Github repository",
		"date": "TBC",
		"grade": "N/A",
		"description": "",
		"courseLearning": "",
		"languageUsed": "",
	    },*/
	]
};

education.DisplayCollege = function(){
	for (var k in education.schools) {
		if (education.schools.hasOwnProperty(k)) {
			var School = education.schools[k];		
					$('#education').append(HTMLschoolStart);
					
					var formattedschoolName = HTMLschoolName.replace("%data%", School.name);
					
					$('.education-entry:last').append(formattedschoolName);
					
					//var formattedschoolDates = HTMLschoolDates.replace("%data%", School.date);

					//$('.education-entry:last').append(formattedschoolDates);
					
					var formattedschoolMajor = HTMLschoolMajor.replace("%data%", School.majors);

					$('.education-entry:last').append(formattedschoolMajor);					
					
					var formattedschoolDegree = HTMLschoolDegree.replace("%data%", School.degree);
				
					$('.education-entry:last').append(formattedschoolDegree);
				
					var formattedschoolLocation  = HTMLschoolLocation.replace("%data%", School.location);
			
					$('.education-entry:last').append(formattedschoolLocation);
					

		}	
	}
};

education.DisplayCollege();

education.DisplayOnlineCourses = function(){
			var formattedHTMLonlineClasses = HTMLonlineClasses;
			$('.education-entry:last').append(formattedHTMLonlineClasses);
			
	for (var key in education.onlineCourses) {
		if (education.onlineCourses.hasOwnProperty(key)) {
			var onlineCourse = education.onlineCourses[key];
			
			var formattedschoolStart = HTMLschoolStart;
			$('#education').append(formattedschoolStart);
			var formattedHTMLonlineTitle = HTMLonlineTitle.replace("%data%", onlineCourse.Title);
			var formattedHTMLonlineSchool = HTMLonlineSchool.replace("%data%", onlineCourse.Schools);
		    

			var topbar = formattedHTMLonlineTitle + formattedHTMLonlineSchool;
			$('.education-entry:last').append(topbar);
						
			var formattedHTMLonlineDates = HTMLonlineDates.replace("%data%", onlineCourse.date);
			$('.education-entry:last').append(formattedHTMLonlineDates);
			
		    var formmattedHTMLCourseDescriptionHeader = HTMLonlineCourseDescriptionHeader;
			$('.education-entry:last').append(formmattedHTMLCourseDescriptionHeader); 
		
			var formattedHTMLonlineDescription = HTMLonlineDescription.replace("%data%", onlineCourse.description);
			$('.education-entry:last').append(formattedHTMLonlineDescription);

			//var formattedHTMLonlineCourseLearningHeader = HTMLonlineCourseLearningHeader;
			//$('.education-entry:last').append(formattedHTMLonlineCourseLearningHeader);

			var formatterHTMLonlineCourseLearning = HTMLonlineCourseLearning.replace("%data%", onlineCourse.courseLearning);
			$('.education-entry:last').append(formatterHTMLonlineCourseLearning);

			var formattedHTMLonlineCourseLanguagesUsedHeader= HTMLonlineCourseLanguagesUsedHeader.replace("%data%", onlineCourse.courseLearning);
			$('.education-entry:last').append(formattedHTMLonlineCourseLanguagesUsedHeader);

			var formattedHTMLonlineCourseLanguagesUsed = HTMLonlineCourseLanguagesUsed.replace('%data%',onlineCourse.languageUsed);
			$('.education-entry:last').append(formattedHTMLonlineCourseLanguagesUsed);

			var formattedHTMLonlineGrade = HTMLonlineGrade.replace("%data%", onlineCourse.grade);
			$('.education-entry:last').append(formattedHTMLonlineGrade);

			var formattedHTMLonlineURL = HTMLonlineURL.replace("%data%", onlineCourse.URL);
			$('.education-entry:last').append(formattedHTMLonlineURL);
		
		}
			
		}
};

education.DisplayOnlineCourses();


//join header and footer together 
var footerDisplay = function(){
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
	var formattedGithub= HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	var formattedFacebook = HTMLfacebook.replace("%data%", bio.contacts.facebook);
	var formattedAboutme = HTMLaboutme.replace("%data%", bio.contacts.aboutme);

	$("#footerContacts").append(formattedEmail);
	$("#footerContacts").append(formattedTwitter);
	$("#footerContacts").append(formattedGithub);
	$("#footerContacts").append(formattedLocation);
	$("#footerContacts").append(formattedFacebook);
	$("#footerContacts").append(formattedAboutme);
};

footerDisplay();

$("#mapDiv").append(googleMap);
