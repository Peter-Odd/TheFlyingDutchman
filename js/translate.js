window.language="en";

i18n.init({lng: window.language } , function(t) {
  // translate manager
  $(".manager").i18n();
  $(".button").i18n();
  $(".menuBtn").i18n();
    $(".orderbutton").i18n();
<<<<<<< HEAD
    $(".content").i18n();
    // document.getElementById('iframeID').contentWindow.document.getElementById('idinsideiframe')
=======
>>>>>>> parent of b009be1... VIP beer buy now works

  // programatical access
  var appName = t("index.title");
});
// {lng: "sv-SE" },

function changeLanguage(){	
	if(window.language=="en"){
		window.language="sv-SE";
		i18n.init({lng: "sv-SE" } , function(t) {
  // translate manager
  $(".manager").i18n();
  $(".button").i18n();
            $(".menuBtn").i18n();
            $(".orderbutton").i18n();
            $(".content").i18n();

  // programatical access
  var appName = t("index.title");
});
	} else{
		window.language="en";
		i18n.init({lng: "en" } , function(t) {
  // translate manager
  $(".manager").i18n();
  $(".button").i18n();
            $(".menuBtn").i18n();
            $(".orderbutton").i18n();
            $(".content").i18n();
  // programatical access
  var appName = t("index.title");
});
	}
}