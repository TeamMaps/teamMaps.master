
if(localStorage.markers === undefined){
    markers = []; //ako je localStorage undefined pravi novo polje.
}
else markers = JSON.parse(localStorage.getItem("markers"));

function loadMarkers(){ // onload funkcija za postavljanje markera iz lokal storagea.
  for (var i = 0;i<markers.length;i++){
    loadedMarkersPlacer(markers[i].latLng.lat,markers[i].latLng.lng,markers[i].naslov,markers[i].opis);//prolazi kroz array
  //stavlja ih sa drugom funkcijom za stavljanje ucitanih markera
}                                   //funkcija morada se u
}

function initMap(){
  //funkcija koja poziva mapu
    var rijeka = {lat: 45.328343, lng: 14.446383};
    var zagreb = {lat: 45.815399,lng: 15.966568};
    map = new google.maps.Map(document.getElementById('map'),{
      zoom: 13,
      center: rijeka,
      mapTypeId: 'roadmap'
    });
    map.addListener("click",function(event){
         latLng = event.latLng;
         markerModal();//listener za bootstrap modal kada se klinke na marker
    });
}


function loadedMarkersPlacer(lat,lng,naslov,opis)
{
  //funkcija printa markere na mapu
  var latLng = {lat:lat,lng:lng};
  var ikona = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var loadedMarkers = new google.maps.Marker({
        position: latLng,
        icon: ikona,
        map: map,
  //    draggable:true,
        animation: google.maps.Animation.DROP,
        content: naslov
      });
      loadedMarkers.addListener("click",function(){

          $('#myModal').modal('show');//listener za bootstrap modal kada se klinke na marker
          $('#title-message-text').val(naslov); // varijabla koja sadrzi naslov i var opis
          $('#message-text').val(opis);
      });
}


function markerModal(){ // funkcija koja se poziva na onlick addListener mape i otvara bootstrap modal markera
  $('#myModal').modal('show');
}
$("#buttonSave").on('click', function()
{ /*Button "Save changes" na bootstrap modalu ima funkciju(){
  da spremi naslov i opis iz modala i dropa marker na mapu}*/
  var naslov = $('#title-message-text').val(); // varijabla koja sadrzi naslov i var opis
  var opis = $('#message-text').val();          // dobijaju se pomocu jquery-a.
  markerPlacer(naslov,opis); // opis i naslov se prosledjuju markeru pozivajuci placeMarker()
});


function publicPrivate(clicked_id){   //funkcija za html onclick div-ove, kada se klinke na div alert pokaze value.
    if(clicked_id == "private"){
      alert("Your just set your marker to private mode");
    }
    else if(clicked_id == "public"){
      alert("Your mareker is public");
    }
    else if (clicked_id == "3") {
      alert ("You dont have any messages");
    }
}


function markerPlacer(title,desc){ // funkcija za dropanje markera
//var ikona = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
          position: latLng,
       // icon: ikona,
          map: map,
      //  draggable:true,
          animation: google.maps.Animation.DROP,
          content: title
          });
    /*  var markerForSave = {
        'latLng': latLng,
        'naslov': title,
        'opis': desc,
        'doStaf': function(){
          alert(this.naslov + this.opis);
        }
      }*/
      //markers.push(latLng,title,desc); //pushamo sve u polje ...
      marker.addListener("click",function(){
        $('#myModal').modal('show');//listener za bootstrap modal kada se klinke na marker
      });
    var infowindow = new google.maps.InfoWindow();//stvoren je infowindow markera
  //slika: var content =  '<img src="rijeka.jpg" alt="Porcelain Factory of Vista Alegre" height="200" width="450">';
      marker.addListener("mouseover",function(){
       infowindow.setContent($("#iw-content").prop("innerHTML"));//addListener na marker if mouseover open infowindow
       infowindow.open(map,marker);                    // sa like i share facebook buttonom
      //  markerForSave.doStuff();
      });
    //  marker.addListener("mouseout",function(){
      //   infowindow.close();//mouse out infowindow close...
    //  });

      var markerForSave = {
        'naslov': marker.content,
        'latLng': latLng,
        'opis': desc,
        'doStuff': function() {
        //  alert(this.opis);
        }
      };
      markers.push(markerForSave);
}


function getMyMarkers(){ // funkcija proverava naslov u buducnosti ce username ili tako nesto i stavlja samo te markere ...
    for (var i = 0; i<markers.length;i++){
      if(markers[i].naslov == "vanja"){
        loadedMarkersPlacer(//prosledjuju se vrednosti
          markers[i].latLng.lat,// u funkciju .
          markers[i].latLng.lng,
          markers[i].naslov,
          markers[i].opis);
      }
    }
}
function clearScreen(){

}

function deleteMarkers(){ //funkcija za button brisanje brise celi array markers
    localStorage.removeItem("markers");
}

function spremiPodatke(){
    localStorage.setItem("markers", JSON.stringify(markers));//sprema array u lokalStorage
}
