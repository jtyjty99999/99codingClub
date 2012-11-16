$(function(){
	//checking for css 3d transformation support
	$.support.css3d = supportsCSS3D();
	var formContainer = $("#formContainer");
	//Listening for clicks on the ribbon links
	$(".flipLink").click(function(e){
		//flipping the forms
		formContainer.toggleClass("flipped");
		//if there is no css3 3d support, simply hide the login form (exposing the recover one)
		if(!$.support.css3d){
			$("#login").toggle();
		}
		e.preventDefault();
	});
				
	formContainer.find("form").submit(function(e){
		//Preventing form submissions.if you implement a backedn,you will want to remove this code
			e.preventDefault();
		});
	
	//a helper function that checks for the support of the 3d css3 transformations
	function supportsCSS3D(){
		var props = ["perspectiveProperty","WebkitPerspective","MozPerspective"],testDom = document.createElement("a");
		for(var i = 0; i < props.length; i++){
			if(props[i] in testDom.style){
				return true;
			}
		}
		return false;
	}
});