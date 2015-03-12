window.language="en";

i18n.init({lng: window.language } , function(t) {
  // translate manager
  $(".manager").i18n();
  $(".button").i18n();
  $(".menuBtn").i18n();
    $(".orderbutton").i18n();
    $(".content").i18n();
    var doc;
    var headEl;
    doc = document.getElementById('content').contentDocument.documentElement.document;
    headEl=doc.getElementsByTagName('logoutBtn')[0];
    headEl.i18n();
    $("#logoutBtn").i18n();
    // document.getElementById('iframeID').contentWindow.document.getElementById('idinsideiframe')

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
            $("#logoutBtn").i18n();
            var doc;
            var headEl;
            doc = document.getElementById('content').contentDocument.documentElement.document;
            headEl=doc.getElementsByTagName('logoutBtn')[0];
            headEl.i18n();
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
            $("#logoutBtn").i18n();
            var doc;
            var headEl;
            doc = document.getElementById('content').contentDocument.documentElement.document;
            headEl=doc.getElementsByTagName('logoutBtn')[0];
            headEl.i18n();
  // programatical access
  var appName = t("index.title");
});
	}
}