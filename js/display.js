var cTable = $("#scores").DataTable({
	"columns": [
		{
			"title": "ID",
			"visible": false
		},{
			"title": "When",
			"type" : "date-time-uk"
		},{
			"title": "1",
			"width": "5%",
			"class": "arrow",
			"sortable": false
		},{
			"title": "2",
			"width": "5%",
			"class": "arrow",
			"sortable": false
		},{
			"title": "3",
			"width": "5%",
			"class": "arrow",
			"sortable": false
		},{
			"title": "4",
			"width": "5%",
			"class": "arrow",
			"sortable": false
		},{
			"title": "5",
			"width": "5%",
			"class": "arrow",
			"sortable": false
		},{
			"title": "6",
			"width": "5%",
			"class": "arrow",
			"sortable": false
		},{
			"title": "Round Total",
			"class": "round"
		},{
			"title": "Gold",
			"class": "gold"
		},{
			"title": "Running Total",
			"class": "running"
		}
	],
	"order": [[ 1, "asc" ]],
	"createdRow": function(row, data){
		console.log(data)
	},
	/*"sDom": '<"ui two column grid"<"column"l><"column"f>><"ui one column grid"<"column"t>><"ui two column grid"<"column"i><"column"p>>',*/
	"bJQueryUI": false
});
var scores = [];
var myFirebaseRef = new Firebase("https://<your-firebase>.firebaseio.com/");
$(function(){
	myFirebaseRef.onAuth(function(authData) {
		if (authData) {
			myFirebaseRef.child("scores").child(authData.uid).on("value", function(snapshot) {
				var runningTotal = 0;
				$.each(snapshot.val(), function(key, value){
					var tempArray = [];
					var roundTotal = 0;
					var golds = 0;
					tempArray.push(key);
					tempArray.push(value.when);
					$.each(value.score, function(k, v){
						var arrowScore = parseInt(v, 10);
						roundTotal += arrowScore;
						if(arrowScore >= 9){
							golds++;
						}
						tempArray.push(v);
					});
					runningTotal += roundTotal;
					tempArray.push(roundTotal);
					tempArray.push(golds);
					tempArray.push(runningTotal);
					scores.push(tempArray);
				});
				cTable.clear().rows.add(scores).draw();
				console.log(scores);
			});
		}else{
			var location = window.location;
			var pathname_array = location.pathname.split("/");
			pathname_array.pop();
			pathname_array.push("index.html");
			var new_pathname = pathname_array.join("/");
			location.pathname = new_pathname;
		}
	});
	$("#logout").on("click", function(){
		myFirebaseRef.unauth();
		$(".hidden-when-authorised").show();
		$(".hidden-unless-authorised").hide();
		$(".hidden-unless-auth-failed").hide();
	});
});
$.extend($.fn.dataTableExt.oSort, {
	"date-time-uk-pre": function (a){
		return parseInt(moment(a, "DD/MM/YYYY HH:mm").format("X"), 10);
	},
	"date-time-uk-asc": function (a, b) {
		return a - b;
	},
	"date-time-uk-desc": function (a, b) {
		return b - a;
	}
});
/*
 * NOTE
 */
// var scoreRef = new Firebase('https://<your-firebase>/scores/<uid>/<id>/');
// scoreRef.remove();