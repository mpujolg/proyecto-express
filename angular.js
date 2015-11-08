//creamos la app en Angular
var app = angular.module("Tareas", ["firebase"]);

//main (y único) Controller
app.controller("mainCtrl", function($scope, $firebaseObject) {
	
	//creamos las referencias de Firebase en el apartado general y tareas
	//con estas variables añadiremos, modificaremos y borraremos datos de Firebase
	var ref_general = new Firebase("https://listatareasacamica.firebaseio.com/general");
	var ref = new Firebase("https://listatareasacamica.firebaseio.com/tareas");
	
	//ransformamos los datos para poderlos usarlos en el $scope y mostrarlos gracias a los {{}}
	$scope.general = $firebaseObject(ref_general);
	$scope.tareas = $firebaseObject(ref); //tareas será un array de objetos donde podremos aplicar un ng-repeat por cada tarea
	
	
	//--------------------------------------------------AGREGAR------------------------------------------------------------
	$scope.agregar = function(){
		//tomamos el valor del input
		var titol = $("#titulo").val();
		
		//agregamos la tarea a Firebase
		ref.push({
			titol: titol,
			completada: "is-not-checked"
		});
		
		//limpiamos el input
		$("#titulo").val("");
		
			//incrementamos el número de tareas totales en 1
			ref_general.child("numtareas").transaction(function(numactual) {
				return numactual + 1;
			});
	};
	
	
	
	//-------------------------------------------------ELIMINAR-----------------------------------------------------------
	$scope.eliminar = function(id){
		
		//eliminamos la tarea pulsada (identificada gracias al id)
		ref.child(id).remove();
		
			//bajamos el número de tareas totales en 1
			ref_general.child("numtareas").transaction(function(numactual) {
				return numactual - 1;
			});
	};
	
	
	
	//-------------------------------------------------COMPLETAR-----------------------------------------------------------
	$scope.completar = function(id){
		var tareaPorId = new Firebase("https://listatareasacamica.firebaseio.com/tareas/" + id);
		tareaPorId.child("completada").set("is-checked");
	};
	
	
	
	//ejecutar la función agregar cuando se pulsa enter en el input
	$("#titulo").keypress(function(e) {
    	if(e.which == 13) {
			$scope.agregar();
    	}
	});
	
});