
angular.module('AngStarter')
.controller('SqlCtrl', ['$scope', function ($scope) {



	var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
	var msg;

	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
		// tx.executeSql('INSERT INTO LOGS (id, log) VALUES (3, "niko")');
		// tx.executeSql('INSERT INTO LOGS (id, log) VALUES (4, "cool")');
		msg = '<p>Log message created and row inserted.</p>';
		document.querySelector('#status').innerHTML =  msg;
	});
	


	function createLog(id, str){
		var x = 'INSERT INTO LOGS (id, log) VALUES ( '+id+',"'+str+'" )'
		db.transaction(function(tx) {
			tx.executeSql(x);
		})
		showLog()
	}
	$scope.deleteLog = function(id){
		db.transaction(function(tx) {
			tx.executeSql('DELETE FROM LOGS WHERE id=?', [id]);
		})
		showLog()
	}

	//UPDATE table_name
	//SET column1 = value1, column2 = value2...., columnN = valueN
	//WHERE [condition];




	function showLog(){
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
				var len = results.rows.length, i;
				msg = "FOUND ROWS: " + len + "";
				document.querySelector('#status').innerHTML =  msg;
				var logs = [];
				for (i = 0; i < len; i++){
					logs.push(
						[{'id':results.rows.item(i).id},
						{'log':results.rows.item(i).log}]
					); 
					
				}
				console.log($scope);
				$scope.$apply(function() { 
					$scope.logs = logs;
				});
			}, null);
		});
	}showLog()
	


	$('input').keyup(function (e) {
		if (e.keyCode == 13) {
			createLog(Date.now(),$('input').val()); 
			$('input').val('');

			var el  = $("#insertSql")
			console.log(el)
			newone = el.clone(true);
			console.log(newone)
	
			el.before(newone);
			$("." + el.attr("class") + ":last").remove();	

			//var elm = this;
			//console.log(elm);	
			//var newone = elm.cloneNode(true);
			//elm.parentNode.replaceChild(newone, elm);

		}
	});
	


}])


