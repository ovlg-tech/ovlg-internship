// These array stores all of the possible values and the weight associated with the value. 



var prompt_val_group0 = [
	{
		value: "Payment history",
		class: 'btn-default btn-strongly-agree',
		weight: 0
	},
	{
		value: "Credit utilization ratio",
		class: 'btn-default btn-agree',
		weight: 1
	},
	{
		value: "Marital status",
		class: 'btn-default',
		weight: 2
	},
	{
		value: "Credit mix",
		class: 'btn-default btn-disagree',
		weight: 3
	}
]


var prompt_val_group1 = [
	{
		value: "100%",
		class: 'btn-default btn-strongly-agree',
		weight: 0
	},
	{
		value: "200%",
		class: 'btn-default btn-agree',
		weight: 1
	},
	{
		value: "500%",
		class: 'btn-default',
		weight: 2
	},
	{
		value: "400%",
		class: 'btn-default btn-disagree',
		weight: 3
	}
]



var prompt_val_group2 = [
	{
		value: "Lowest monthly payment",
		class: 'btn-default btn-strongly-agree',
		weight: 0
	},
	{
		value: "Longest repayment term",
		class: 'btn-default btn-agree',
		weight: 1
	},
	{
		value: "Shortest repayment term",
		class: 'btn-default',
		weight: 2
	},
	{
		value: "None of the above",
		class: 'btn-default btn-disagree',
		weight: 3
	}
]


var prompt_val_group3 = [
	{
		value: "Pay the full balance",
		class: 'btn-default btn-strongly-agree',
		weight: 0
	},
	{
		value: "Pay only the minimum amount",
		class: 'btn-default btn-agree',
		weight: 1
	},
	{
		value: "Pay as per your affordability",
		class: 'btn-default',
		weight: 2
	},
	{
		value: "None of the above",
		class: 'btn-default btn-disagree',
		weight: 3
	}
]


var prompt_val_group4 = [
	{
		value: "Save enough money to cover 3-6 months' worth of living expenses",
		class: 'btn-default btn-strongly-agree',
		weight: 0
	},
	{
		value: "Save enough money to cover 2-3 years' worth of living expenses",
		class: 'btn-default btn-agree',
		weight: 1
	},
	{
		value: "Save enough money to cover your expenses for 10 to 15 days",
		class: 'btn-default',
		weight: 2
	},
	{
		value: "None of the above",
		class: 'btn-default btn-disagree',
		weight: 3
	}
]



var prompt_val_group5 = [
	{
		value: "Visa, AMEX, MasterCard",
		class: 'btn-default btn-strongly-agree',
		weight: 0
	},
	{
		value: "Experian, Equifax, Transunion",
		class: 'btn-default btn-agree',
		weight: 1
	},
	{
		value: "Lending Club, Prosper, Upstart",
		class: 'btn-default',
		weight: 2
	},
	{
		value: "Bank of America, Chase, Discover",
		class: 'btn-default btn-disagree',
		weight: 3
	}
]



// This is an array of objects that stores the BDI questions that is prompted to the user and the weight for each prompt. 

var prompts = [
	{
		prompt: 'Which of the following does not impact your credit score?',
		weight: 1,
		class: 'group0',
		values: prompt_val_group0
	},
	{
		prompt: 'If you\'re paying $550 on a $500 payday loan in a week, what is the loan\'s actual interest rate?',
		weight: 1,
		class: 'group1',
		values: prompt_val_group1
	},
	{
		prompt: 'If you want to reduce the total cost of a loan, you should choose a loan with the',
		weight: 1,
		class: 'group2',
		values: prompt_val_group2
	},
	{
		prompt: 'Should you pay the full balance on your credit card or only the minimum amount?',
		weight: 1,
		class: 'group3',
		values: prompt_val_group3
	},
	{
		prompt: 'How much should you save in an emergency fund?',
		weight: 1,
		class: 'group4',
		values: prompt_val_group4
	},
	{
		prompt: 'What are the names of the three big credit bureaus in the U.S.?',
		weight: 1,
		class: 'group5',
		values: prompt_val_group5
	}

]

/* ref: https://en.wikipedia.org/wiki/Beck_Depression_Inventory#BDI
0–9: indicates minimal depression
10–18: indicates mild depression
19–29: indicates moderate depression
30–63: indicates severe depression.
*/
var score_summary = [
	{
		lowerBound: 0,
		upperBound: 9,
		symptomSeverity: "Minimal depression",
		Comments: "Scores in the 0-9 range are indicative of <b>minimal depression</b> levels.",
		class: "blueItem"
	},
	{
		lowerBound: 10,
		upperBound: 18,
		symptomSeverity: "Mild depression",
		Comments: "Scores in the 10-18 range are indicative of <b>mild depression</b> levels.",
		class: "greenItem"
	},
	{
		lowerBound: 19,
		upperBound: 29,
		symptomSeverity: "Moderate depression",
		Comments: "Scores in the 19-29 range are indicative of <b>moderate depression</b> levels.",
		class: "orangeItem"
	},
	{
		lowerBound: 30,
		upperBound: 67, //63
		symptomSeverity: "Severe depression",
		Comments: "Scores in the 30+ range are indicative of <b>severe depression</b> levels.",
		class: "redItem"
	}
]

// each list structure is going to be as follows.
/*
<li class="list-group-item prompt">
	<p class="font-size-20">Q3) sadness</p>
	<div class="row">
		<div class="col-md-12">
			<div class="radio">
					<label class="group0 radio-value-btn"><input type="radio" name="group0">I do not feel sad</label>
			</div>
			...
		</div>
	</div>
</li>
*/
// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode('Q' + (i + 1) + ') ' + prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.setAttribute('class', 'font-size-20');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('screening').appendChild(prompt_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the screening
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group_wrapper = document.createElement('div');
		group_wrapper.className = 'row';
		var group = document.createElement('div');
		group.className = 'col-md-12';
		//console.log(group_wrapper);
		var prompt_values = prompts[li_index].values;
		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'radio';

			var radio_label = document.createElement('label');
			radio_label.className = 'group' + li_index + ' radio-value-btn'; // ' value-btn btn ' + prompt_values[i].class + ' width100';

			var radioInput = document.createElement('input');
			radioInput.setAttribute('type', 'radio');
			radioInput.setAttribute('name', 'group' + li_index);

			radio_label.appendChild(radioInput);
			var radio_label_text = document.createTextNode(prompt_values[i].value);
			radio_label.appendChild(radio_label_text);

			btn_group.appendChild(radio_label);
			group.appendChild(btn_group);
			group_wrapper.appendChild(group);
			document.getElementsByClassName('prompt')[li_index].appendChild(group_wrapper);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. 
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;
var emailSubject = 'BDI Score.';
var emailBody = '';

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}
	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}
	return weight;
}

function findValueSet(groupName) {
	var groupArr = groupName.trim().split("group");
	var prompt_index = groupArr[1];
	var prompt_values = prompts[prompt_index].values;
	return prompt_values;
}

$('.radio-value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	var classArr = classList.split(" ");
	var this_group = classArr[0];
	var prompt_values = findValueSet(this_group);

	var groupArr = this_group.trim().split("group");
	var prompt_index = groupArr[1];

	if ($(this).hasClass('active')) {
		// doing nothing, since it is a case of clcking on already checked radio button 
	} else {
		total -= findValueWeight(prompt_values, $('.' + this_group + '.active').text());
		$('.' + this_group).removeClass('active');
		$(this).addClass('active');
		var selected_weight = findValueWeight(prompt_values, $(this).text());
		total += selected_weight;
		prompts[prompt_index].selected_weight = selected_weight;
	}
	
	console.warn(total);
})

$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');

	var symptomSeverity = '';
	var Comments = '';
	var selected_summary = '';

	for (var i = 0; i < score_summary.length; i++) {
		if (score_summary[i].lowerBound <= total && total <= score_summary[i].upperBound) {
			symptomSeverity = score_summary[i].symptomSeverity;
			Comments = score_summary[i].Comments;
			selected_summary = score_summary[i];
			break;
		}
	}

	//document.getElementById('results').innerHTML = 'Your score is : ' + total + '<br><b>' + symptomSeverity + '</b><br><br>' + Comments;

	//emailBody = `Hi,\nRecently I have tested my Depression level in https://www.savantcare.com/bdi/ .\nMy depression score is '${total}' and level is: '${$.trim(symptomSeverity)}'.
	//`;

	//console.log(selected_summary);
	//var resultGraphData = fnGenerateresultGraph(total, selected_summary);
	//var symptomsDetail = fnGetSymptomsDetail();

	var result_data = 'Your financial knowledge score is : <b>' + total + '</b><br>'; // + Comments;
	$('#results').html(result_data);
	//$('#resultGraph').html(resultGraphData);
	//$('#symptoms_info').html(symptomsDetail);

	emailBody = `Hi,\nRecently I have tested my BDI score in https://www.savantcare.com/bdi/ .\nMy BDI score is '${total}' and it indicates '${symptomSeverity}' level.
	`;

	// Hide the screening after they submit their results
	$('#screeningHeader').addClass('hide');
	$('#screening').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
	$('#share-by-email').removeClass('hide');
})

// Refresh the screen to show a new screening if they click the retake screening button
$('#retake-btn').click(function () {
	$('#screeningHeader').removeClass('hide');
	$('#screening').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');
	$('#share-by-email').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})

function fnGenerateresultGraph(total, selected_summary) {

	var graphItem = '<div class="graphItem '+ selected_summary.class+'"></div>';
	var graphEmptyItem = '<div class="graphEmptyItem"></div>';
	var graphData = '';
	var maxScoreWeignt =  67;
	//var totalScoreWeignt =  123;
	var totalWeighInGraph =  parseInt(total/maxScoreWeignt*100);
	var totalEmptyWeighInGraph = 100 - totalWeighInGraph;

	for (var i = 0; i < totalWeighInGraph; i++) {
		graphData += graphItem;
	}

	for (var i = 0; i < totalEmptyWeighInGraph; i++) {
		graphData += graphEmptyItem;
	}

	return graphData;
}

function fnGetSymptomsDetail() {

	var tableData = '';
	tableData += '<table class="table table-striped" style="width:75%;">'+
		'<thead>'+
		'<tr><th>Symptom</th><th> </th><th>Score</th> </tr>'+
		'</thead>'+
		'<tbody>';

	for (var i = 0; i < prompts.length; i++) {

		if (typeof prompts[i].selected_weight === "undefined") {
			tableData += '<tr><td colspan="3" >'+(i+1)+'. '+prompts[i].prompt+'</td></tr>';
		} else if(prompts[i].selected_weight == 0) {
			tableData += '<tr><td colspan="3" >'+(i+1)+'. '+prompts[i].prompt+'</td></tr>';
		}
		else {
			var graphBadge = '';
			//var badgeColor =  getBadgeColor(prompts[i].selected_weight);
			
			for (var j = 0; j < prompts[i].selected_weight; j++) {
				 graphBadge += '<span class="graphItem redItem"></span>';
			}
			tableData += '<tr>'+
			'<td >'+(i+1)+'. '+prompts[i].prompt+'</td>'+
			'<td>'+graphBadge+'</td>'+
			'<td>'+prompts[i].selected_weight+'</td></tr>';
		}
	}
	tableData += '</tbody></table>';
	return tableData;
}

function getBadgeColor(weight) {
	var badgeColor = '';
	if(weight == 1) {
		badgeColor = 'greenItem';
	}else if(weight == 2) {
		badgeColor = 'orangeItem';
	} else if(weight == 3) {
		badgeColor = 'redItem';
	} else {
		badgeColor = 'redItem';
	}
	return badgeColor;
}

// Share score via email
function getMailtoUrl(to, subject, body) {
	if (typeof to === 'undefined' || to == '') return false;
	var args = [];
	if (typeof subject !== 'undefined') {
		args.push('subject=' + encodeURIComponent(subject));
	}
	if (typeof body !== 'undefined') {
		args.push('body=' + encodeURIComponent(body))
	}

	var url = 'mailto:' + encodeURIComponent(to);
	if (args.length > 0) {
		url += '?' + args.join('&');
	}
	return url;
}

$('#share-score-btn').click(function () {
	var to = $.trim($('#email').val());
	var body;
	var mailtoString = getMailtoUrl(to, emailSubject, emailBody);
	//console.log(emailBody);
	if (mailtoString !== false)
		window.open(mailtoString);
})
