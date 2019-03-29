//__________________________________________________________
//GLOBAL VARIABLES
//__________________________________________________________
	
	var number = 30;
	var intervalId;
	var selection = [];
	var startButton = $('#start')
	var quizContainer = $('#quiz');
	var resultsContainer = $('#results');
	var submitButton = $("#submit");

	var wins = 0;
	var losses = 0;
	var unanswered ;

//__________________________________________________________

$("#start").on("click", function(){
	//Once clicked hides the start button
	startButton.hide();

	//__________________________________________________________
	//TIMER 
	//__________________________________________________________
	
	// create a function that clears the board and shows the final results
	function clearBoard(){
		
		quizContainer.hide();

		// Shows the users results
		$("#results").append("Number Correct: " + wins + "<br>");
		$("#results").append("Number incorrect: " + losses + "<br>");
		$("#results").append("Number not answered: " + unanswered);
	}

	// A function that creates the timer
	function timer(){
		function run(){
			stop();
			intervalId = setInterval(decrement, 1000);
		}

		function decrement(){
			number--;
			$("#show-number").html("<h2>" + "Time Left: " + number + "</h2>");
				if (number === 0) {
					stop();
					clearBoard();
				}
			}

			function stop() {
				clearInterval(intervalId);
			}
			run();
		}

	// Runs the timer
	timer();
	//__________________________________________________________


	//__________________________________________________________
	//QUIZ 
	//__________________________________________________________

		//__________________________________________________________
		//Questions 
		//__________________________________________________________
		var question1 = [
			{
				question: "Who is the first Robin?",
				answers: ['Tim Drake', 'Dick Grayson','Jason Todd','Damien Wayne'],
				correctAnswer: 'Dick Grayson',
				class: "question1"
			}
		];
		var question2 =[
			{	
				question: "What super villain once broke Batman's back, leaving him crippled and wheelchair-bound?",
				answers: ['Joker','Killer Croc','Bane',"Ra's Al Ghul"],
				correctAnswer: 'Bane',
				class: "question2"
			}
		];

		var question3 =[
			{	
				question: "Who is the Red Hood?",
				answers: ["Jason Todd", "Alfred" , "Dick Grayson" ,"Ra's Al Ghul" ] ,
				correctAnswer: 'Jason Todd',
				class: "question3"
			}
		];
		//__________________________________________________________

		//An array to store all the question objects
		var array = [question1, question2, question3];
		
		// Adds the questions and answers to the HTML page
		function Questions(questions){
			
			// Goes throught the questions Object
			for(let i = 0; i <  questions.length; i++){
				let question = questions[i];
				
				// Saves the answer values in a variable
				let answer = question.answers;
				
				//Puts the questions in a paragraph
				var questionContainer = $('<p>').text(question.question);
				
				//Adds a class to the paragraph questionContainer 
				questionContainer.addClass("");
				
				//Puts the questionContainer <p> after the quiz div
				$("#quiz").append(questionContainer);
				
				// Adds the answers to the HTML page and makes them a radio input
				if(Array.isArray(answer)){
					for(let j = 0; j < answer.length; j++){
						let a = answer[j];

						// Creates an input tag
						var input = $('<input>' + a + '</input>');
					
						// Makes the input tag a radio 
						input.attr("type", "radio");
					
						// Adds a class called answers
						input.addClass("answers");
					
						// Makes the each value of the input tag an answer from the Question object 
						input.attr("value" , a);

						// Makes the name based on the question class from the Question Object
						input.attr("name", question.class);

						// puts the answers input after the quiz div
						$('#quiz').append(input);
					}		
				}
			}
		}

		// A function to loop through the questions array and grab an object and runs it through the Questions function
		function displayQuestions(){
			for(i = 0; i < array.length; i++){
				Questions(array[i]);
			}
		}

		displayQuestions();

		// Submit Button
		var submit  = $("<input>")
		submit.attr("type", "button");
		submit.attr("id", "submit");
		submit.attr("value", "Submit");

		$("#quiz").append(submit);


		$('#submit').on("click", function(){
			// Grabs the information from the forms
			var answer = document.forms[0];

			// A function that grades the quiz
			function answerChecker(question){
				
				// Would assume at this point that all the answers are wrong, so decrement the losses
				losses++;
				unanswered++;
				
				// A nested loop to compare each input and answers
				for(let i = 0; i < answer.length; i++){	
					for(let j = 0; j < question.length; j++){
						let q = question[j];
						
						// If an individual answer is checked
						if(answer[i].checked){
							
							unanswered--;// This does not work 
							
							// And if the user answer is the correct answer
							if(answer[i].value === q.correctAnswer){
								wins++;
								losses--;
								
								
							}
						}
					}
				}
			}
			
			// A function that displays the answers
			function displayAnswers(){

				// Goes through the array of questions and
				for(i = 0; i < array.length; i++){
					
					// puts each of questions object in the answerChecker function
					answerChecker(array[i]);
				}
			}

			displayAnswers();
			
			//Invokes the function that clears the board
			clearBoard();
		
	});		
});