window.language="en";

i18n.init({lng: window.language } , function(t) {
  // translate manager
  $(".manager").i18n();

  // programatical access
  var appName = t("order.title");
});
// {lng: "sv-SE" },

function changeLanguage(){	
	if(window.language=="en"){
		window.language="sv-SE";
		i18n.init({lng: "sv-SE" } , function(t) {
  // translate manager
  $(".manager").i18n();

  // programatical access
  var appName = t("order.title");
});
	} else{
		window.language="en";
		i18n.init({lng: "en" } , function(t) {
  // translate manager
  $(".manager").i18n();

  // programatical access
  var appName = t("order.title");
});
	}
}

