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
	var unanswered = 0;

//__________________________________________________________

$("#start").on("click", function(){
	startButton.hide();
	//__________________________________________________________
	//TIMER 
	//__________________________________________________________
	function clearBoard(){
		quizContainer.hide();
		$("#results").append("Number Correct: " + wins + "<br>");
		$("#results").append("Number incorrect: " + losses + "<br>");
		$("#results").append("Number not answered: " + unanswered);
	}

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
		var array = [question1,question2, question3];
		

		function Questions(questions){
			for(let i = 0; i <  questions.length; i++){
				// Adds the questions to the HTML page
				let question = questions[i];
				let answer = question.answers;
				var questionContainer = $('<p>').text(question.question);
				questionContainer.addClass("");
				$("#quiz").append(questionContainer);
				
				// Adds the answers to the HTML page and makes them a radio input
				if(Array.isArray(answer)){
					for(let j = 0; j < answer.length; j++){
						let a = answer[j];
						var input = $('<input>' +a+ '</input>');
						input.attr("type", "radio");
						input.addClass("answers")
						input.attr("value" , a);
						input.attr("name", question.class);
						$('#quiz').append(input);
					}		
				}
			}
		}

		// A function to loop through the questions array and grab an object and run it through the Questions function
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

			function answerChecker(question){
				losses++;
				for(let i = 0; i < answer.length; i++){
					
					for(let j = 0; j < question.length; j++){
						let q = question[j];
						
						if(answer[i].checked){
							if(answer[i].value === q.correctAnswer){
								wins++;
								losses--;
							}
						}
					}
				}
			}

			function displayAnswers(){
				for(i = 0; i < array.length; i++){
					answerChecker(array[i]);
				}
			}

			displayAnswers();
			clearBoard();
		
	});

	// console.log("Correct Answers:" + wins);
	// console.log("Wrong Answers:" + losses)

	// WORKING CODE PART 2
	//	$('#submit').on("click", function(){
			// Grabs the information from the forms
	// 		var answer = document.forms[0];
			
	// 		for(let i = 0; i < answer.length; i++){
	// 			for(let j = 0; j < question1.length; j++){
	// 				let question = question1[j];
	// 			}

	// 				if(answer[i].checked){
	// 					if(answer[i].value === question1[0].correctAnswer){
	// 						alert("Correct");
	// 					}
	// 				}
	// 			}
	// });


	// WORKING CODE PART 1
// 	$('#submit').on("click", function(){
// 		var answer = document.forms[0];
// 		console.log(answer);

// 		for(let i = 0; i < answer.length; i++){

// 				if(answer[i].checked){
// 					if(answer[i].value === question1[0].correctAnswer){
// 						alert("Correct");
// 					}
// 				}
// 			}
// });

	


			
		

		


	



//__________________________________________________________


		// $(".answers").on("click", function(){
		// 	var dataAttribute = $(this).attr('data-name');
		// 	if(dataAttribute === myQuestions[0].correctAnswer){
		// 		document.write("correct Answer");
		// 		wins++;
		// 	}
		// 	else{
		// 		losses ++;
		// 		document.write("Incorrect, the correct answer is" + myQuestions[0].correctAnswer);
		// 	}
		// 	Questions()
	


		});