	function getName() {
		var url = "http://localhost:4567/getMyName";
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", url);
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'true');
		xhr.onreadystatechange = function () {
		   if (xhr.readyState === 4) {
		      console.log(xhr.status);
		      console.log(xhr.responseText);
		   }};
		xhr.onload = function() {
  			document.getElementById("nameLabel").innerHTML =
  			this.getResponseHeader("Name");
  			console.log(this.getResponseHeader("Name"));
		}
		xhr.send();
	}

	function setName() {
		var url = "http://localhost:4567/setMyName";
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("POST", url, true);
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'true');
		xhr.setRequestHeader('Name', document.getElementById("searchTxt").value);
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4) {
			   console.log(xhr.status);
			   console.log(xhr.responseText);
			}
			xhr.onload = function() 
			{
  				document.getElementById("searchTxt").value = "";
			}
		}
		
		xhr.send();
	}

	function login() {

		if ((document.getElementById("authLogin").value == "demo") && (document.getElementById("authPass").value == "demo")) {
			alert("Выбран демо режим");
			window.location.href = 'file:///Users/dmitrijdavydov/Documents/OSE-Helper/OSEHelper/html/Backupindex.ht';
		}
		else getToken(document.getElementById("authLogin").value,document.getElementById("authPass").value);
	}
	
	function getToken(login, pass) {
		var url = "http://localhost:4567/setMyName";
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("POST", url, true);
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'true');
		//xhr.setRequestHeader('Name', document.getElementById("searchTxt").value);
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4) {
			   console.log(xhr.status);
			   console.log(xhr.responseText);
			}
			xhr.onload = function() 
			{
  				//document.getElementById("searchTxt").value = "";
			}
		}
		
		xhr.send();
	}