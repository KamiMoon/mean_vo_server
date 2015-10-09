$(function() {

	var map;
	var geocoder;
	
	function initialize() {
		
		var address = document.getElementById("mapAddress");
		address = address ? address.value: null;
		
		var googleMapAddresses = $(".googleMapAddresses");
		
		var mapEl = document.getElementById("map-canvas");
		
		// Define Marker properties
		var image = new google.maps.MarkerImage('/volunteeromaha/img/marker.png',
		// This marker is 40 pixels wide by 40 pixels tall.
			
				new google.maps.Size(40, 40),
				
		        // The origin for this image is 0,0.
		
		        new google.maps.Point(0,0),

		        // The anchor for this image is the base of the flagpole at 18,42.

		        new google.maps.Point(18, 42)
				
		);
		if (mapEl) {
				
	    	
			var infowindow = new google.maps.InfoWindow();
			
			var onMarkerClick = function(event, marker) {
				  var locationModel = marker.locationModel;
				
				  // Create content  
				  var html = "<strong><a href='" + locationModel.link + "'>" + locationModel.title + "</a></strong><br />";
				  html += "<img src='" + locationModel.photo + "'/><br />";
				  html += "<strong>Address:  </strong>" + locationModel.address + "<br />";
				  html += "<strong>Description:  </strong><div style='width: 250px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>" + locationModel.description + "</div><br />";
				  
				  
				  // Replace our Info Window's content and position 
				  infowindow.setContent(html);
				  infowindow.open(map, marker) 
			} 
			
			geocoder = new google.maps.Geocoder();
			
			//only one address
			if(address){
				geocoder.geocode({
					'address' : address
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
		
						var center = results[0].geometry.location;
		
						map = new google.maps.Map(mapEl, {
							center : center,
							zoom : 16
						});
						
						// map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map : map,
							icon: image,
							position : center
							
						});
					} else {
						alert("Geocode was not successful for the following reason: "
								+ status);
					}
				});
			}
			//multiple addresses
			else if(googleMapAddresses.length){
				
				hasCreatedMap = false;
				
				var locationObjects = [];
				
				var successCallback = function(data, locationModel){
					var p = data.results[0].geometry.location
		            var latlng = new google.maps.LatLng(p.lat, p.lng);
		            
		            if(!hasCreatedMap){

		            	map = new google.maps.Map(mapEl, {
							center : p,
							zoom : 10
						});
		            	
		            	hasCreatedMap = true;
					}

		            var marker = new google.maps.Marker({
		                position: latlng,
		                map: map,
		                title: locationModel.title,
		                icon: image
		            });
		            
		            marker.locationModel = locationModel;
		            
		            google.maps.event.addListener(marker, 'click', function() { 
		                map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng())); 
		                onMarkerClick(event, marker); 
		            }); 
				}
				
				var geocode = function(locationModel){

					$.ajax({
						  dataType: "json",
						  url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false',
						  success: function(data) {
							  //defer.resolve(data);
							  successCallback(data, locationModel);
						  }
					});
				}
				
				for (var x = 0; x < googleMapAddresses.length; x++) {
					var obj = $(googleMapAddresses[x]);
					
					var address = obj.val();
					var title = obj.data('name');
					var description = obj.data('description');
					var photo = obj.data('photo');
					var link = obj.data('link');
					
					var locationModel = {
						address: address,
						title: title,
						description: description,
						photo: photo,
						link: link
					};
					
					geocode(locationModel);

				}
			    
			}
			
		}
	
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);

});