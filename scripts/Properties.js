debugger
var rootUrl = "", siteIdentifier = "", email = "", environment = "", EmbedSecret = "";
var baseUrl = "";
var dashboardServerApiUrl = "";
var dataServiceUrl = "";
var designerServiceUrl = "";
var designerRootUrl = "";
var intermediateDbStatus = false;
var accessToken = "";

// Fetch the JSON file
fetch('embedConfig.json')
	.then(response => {
		return response.json();
	})
	.then(data => {
		// Access the values from the JSON object
		rootUrl = data.ServerUrl;
		siteIdentifier = data.SiteIdentifier;
		email = data.UserEmail;
		environment = data.Environment;
		EmbedSecret = data.EmbedSecret;
		if (environment == "onpremise") {
			baseUrl = rootUrl + "/" + siteIdentifier;
			dashboardServerApiUrl = rootUrl + "/api/" + siteIdentifier;
			dataServiceUrl = rootUrl + "/designer/v1.0/datahandler";
			designerServiceUrl = rootUrl + "/designer/v1.0/design";
			designerRootUrl = rootUrl + "/designer";
		}
		else {
			baseUrl = rootUrl;
			dashboardServerApiUrl = rootUrl + "/api";
			designerRootUrl = rootUrl;
			dataServiceUrl = designerRootUrl + "/v1.0/datahandler";
			designerServiceUrl = designerRootUrl + "/v1.0/design";

		}
		getToken();
		showDashboardListing();
	})
	.catch(error => {
		showErrorPopup();
	});

// Function to show an error popup
function showErrorPopup() {
	var errorPopup = document.querySelector('.errorPopup');
	var errorContent = document.querySelector('.errorContent');
	if (errorPopup && errorContent) {
		errorContent.textContent = "embedConfig.json is not available";
		errorPopup.style.display = 'block';
	}

	// Hiding remaining content
	var container = document.getElementById('container');
	var viewerSection = document.getElementById('viewer-section');
	container.style.display = 'none';
	viewerSection.style.display = 'none';
}

function getToken() {
	var apiRequest = {
		username: email,
		embed_secret: EmbedSecret,
		grant_type: "embed_secret"
	};
	$.ajax({
		type: "POST",
		async: false,
		url: dashboardServerApiUrl + "/token",
		data: apiRequest,
		success: function (data) {
			accessToken = data.access_token;
		}
	});
}

