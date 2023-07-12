function showDashboardListing() {
	$.ajax({
		type: "GET",		      
		url: dashboardServerApiUrl +"/v2.0/items?ItemType=dashboard",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "bearer "+accessToken)
		},
		success: function (data) {
			var dashboard = data;
			if (dashboard != "") {  
                for(var i=0;i<dashboard.length;i++){
				    var dashboardId = dashboard[i].Id;	
                    var divDom=$("<div class='dashboard-item'>").attr({
                        Name : dashboard[i].Name,
                        ItemId : dashboardId,
						Category : dashboard[i].CategoryName
                    });
                    divDom.html(dashboard[i].Name);
                    $("#panel").append(divDom);            
                }
            }
        }
    });
}

$(document).on("click",".dashboard-item",function(){
    $(".dashboard-item").removeClass("active");
    $(this).addClass("active");
    id=$(this).attr("ItemId");
    dashboard_name=$(this).attr("Name");
	category=$(this).attr("Category");
    renderDashboard(id,dashboard_name,category);
});

function renderDashboard(itemId, name, category) {
    $("#dashboard").html("");
    $("#dashboard").css("height",window.innerHeight-48); //change this value to dynamically set the height of the dashboard rendering dom
	var iFrameElement = $("<iframe src='" + baseUrl + "/dashboards/" + itemId + "/" + category + "/" + name 
    + "?isembed=true' id='dashboard-frame' width='100%' height='100%' allowfullscreen frameborder='0'></iframe>");					
	$("#dashboard").append(iFrameElement);       
}

$(document).on("click","#create-dashboard",function(){
    openDesignerForCreate();
})

function openDesignerForCreate() {
    $("#dashboard").html("");
    $("#dashboard").css("height",window.innerHeight-48); //change this value to dynamically set the height of the dashboard rendering dom
	var iFrameElement = $("<iframe src='" + baseUrl 
    + "/dashboard-designer?isembed=true' id='dashboard-frame' width='100%' height='100%' allowfullscreen frameborder='0'></iframe>");					
	$("#dashboard").append(iFrameElement);
}

$(document).on("click","#edit-dashboard",function(){  
    openDesignerForEdit(id, dashboard_name, category)
});

function openDesignerForEdit(itemId, name, category) {
    $("#dashboard").html("");
    $("#dashboard").css("height",window.innerHeight-48); //change this value to dynamically set the height of the dashboard rendering dom
	var iFrameElement = $("<iframe src='" + baseUrl + "/dashboard-designer/" + itemId + "/" + category + "/" + name 
    + "?isembed=true' id='dashboard-frame' width='100%' height='100%' allowfullscreen frameborder='0'></iframe>");					
	$("#dashboard").append(iFrameElement);
}


