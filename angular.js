//creamos la app en Angular
var app = angular.module("Tareas", ["firebase"]);

//main (y único) Controller
app.controller("mainCtrl", function($scope, $firebaseObject) {
	
	//esta función se ejecuta cuando la página carga
	comprovarEstado = function(){
		//escondemos los forms de login y regitrar
		$(".forms").hide();
		
		if(users==undefined){
			$("#datosPersonales").hide();
			$("#mainInput").hide();
		} else {
			$("#ocultar").hide();
			$("#datosPersonales").hide();
			$("#datosPersonales").slideDown(2000)();
		};
	};
	
	mostrar= function(clase) {
		$(clase).slideToggle();
	};
	
	var ref = new Firebase("https://listatareasacamica.firebaseio.com");
	var dbUsuari = ref.getAuth();
		if(dbUsuari){
			//Creem una ruta que sigui usuers/ID, allà es guardaràn les dades de l'usuari
			var users = new Firebase("https://listatareasacamica.firebaseio.com/users/" + dbUsuari.uid + "");
			$scope.users = $firebaseObject(users);
		};
	
	//--------------------------------------------------REGISTRAR------------------------------------------------------------
	registrar = function(){
	
	//pedimos los datos necesarios
	var nombre = $("#nombre").val();
	var email = $("#email").val();
	var password = $("#pass").val();;
	var repassword = $("#repass").val();
	
	if(nombre=="" || email=="" || password=="" || repassword==""){
		alert("No puedes dejar campos vacíos");
	} else if(password != repassword){
		errors("Las dos contraseñas no coinciden");
	} else {
			var ref = new Firebase("https://listatareasacamica.firebaseio.com");
			ref.createUser({
				
				  email    : email,
				  password : password
				
			}, function(error, userData) {
				  if (error){
					  alert(error);
				  } else {

						 var nouUsuari = new Firebase("https://listatareasacamica.firebaseio.com/users/" + userData.uid + ""),
					  	 id = userData.uid;
					  
								nouUsuari.set({
										nom: nombre,
										id: id,
										email: email,
										pass: password,
									});
					  
			   //incrementamos el nombre de usuarios en 1
				ref_general.child("numusuarios").transaction(function(numactual) {
					return numactual + 1;
				});
					  
					  $("#registrar").slideUp(750);
					  $("#login").delay(750).slideDown(750);

				  }
			});
	}
	
};
	
	
	//--------------------------------------------------LOGIN------------------------------------------------------------
	login = function(){
			var email = $("#emaillogin").val();
			var password = $("#passlogin").val();
		
			var ref = new Firebase("https://listatareasacamica.firebaseio.com");
			ref.authWithPassword({
			  email    : email,
			  password : password
			}, function(error, authData) {
			  if (error) {
				console.log("Login Failed!", error);
				 alert("Ha habido un error :( (" + error + ")");
			  } else {
				console.log("Authenticated successfully with payload:", authData);
					var refer = new Firebase("https://listatareasacamica.firebaseio.com");
					var dbUsuari = refer.getAuth();
						if(dbUsuari){
							//Creem una ruta que sigui usuers/ID, allà es guardaràn les dades de l'usuari
							var users = new Firebase("https://listatareasacamica.firebaseio.com/users/" + dbUsuari.uid + "");
							$scope.users = $firebaseObject(users);
							location.reload(); //refrescar la página
						};
			  }
			});
		};
	
	
		//------------------------------------------------RESET-CONTRASEÑA----------------------------------------------------------
		resetearContrasena = function(){
			var email = prompt("Introdueix el teu correu");

			var ref = new Firebase("https://listatareasacamica.firebaseio.com");
		ref.resetPassword({
		  email : email
		}, function(error) {
		  if (error === null) {
			alert("Se ha enviado el correo de recuperación :)");
		  } else {
			alert("Error al enviar el correo:", error);
			console.log("Error enviat el correu de recuperació:", error);
		  }
		});
		}
	
	
	
	
	
	
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
		var data = new Date().toString().slice(0, -15);
		var autor = $("#nombreusuario").html();
		
		//agregamos la tarea a Firebase
		ref.push({
			titol: titol,
			completada: "is-not-checked",
			data: data,
			autor: autor
		});
		
			//incrementamos el número de tareas totales en 1
			ref_general.child("numtareas").transaction(function(numactual) {
				return numactual + 1;
			});
		
		//limpiamos el input
		$("#titulo").val("");
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
    	};
		Event.preventDefault();
	});
	
});



