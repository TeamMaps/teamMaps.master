var map;
//var markers = [];

if(localStorage.markers === undefined){ markers = []; }
else markers = JSON.parse(localStorage.getItem("markers"));
  /*
  pretrazuje local storage za oznaku markers i taj value parsa u ovaj var,
   akmo je nema stvara prazni globalni array markers */

function initMap() //funkcija za mapu
{

    var rijeka = {lat: 45.328343, lng: 14.446383};
    map = new google.maps.Map(document.getElementById('map'), {

    zoom: 13,
    center: rijeka,
    mapTypeId: 'roadmap'

  });
    map.addListener("click",function(e){
    placeMarker(e.latLng, map)
    }
        //listener za stavljanje markera na mapu
  );

}

function placeMarker(latLng, map) // funkcija koja dodaje marker

{

//  var ikona = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
   var marker = new google.maps.Marker({

    position: latLng,
  //  icon: ikona,
    map: map,
    draggable:true,
    animation: google.maps.Animation.DROP

  });

  markers.push(latLng); //pusha lat i lng markera u polje


  var infowindow;

  //var content =  '<img src="rijeka.jpg" alt="Porcelain Factory of Vista Alegre" height="200" width="450">';

    infowindow = new google.maps.InfoWindow({

      //content:"
    }
    );

    marker.addListener("click",function(){

      $('#myModal').modal('show');
      //listener za bootstrap modal kada se klinke na marker
        });
    marker.addListener("mouseover",function(){
      infowindow.open(map,marker);
      //kad je mis na markeru otvara se infowindow
        });

    marker.addListener("mouseout",function()
    {
      infowindow.close();
      //mouse out infowindow se zatvara
    });

}


  function deleteMarkers() // funkcija brise cijeli array
  {
    //console.log(markers);
    localStorage.removeItem("markers");

  }

  function spremiPodatke()
  {

        localStorage.setItem("markers", JSON.stringify(markers));
        //stavlja array u storage sa json filom sa lokacijama
  }

  function loadMarkers()
  {
      for (var i = 0;i<markers.length;i++){
        markerPlacer(markers[i],map);
        //loop kroz polje sa markerima i stavljanje na mapu
      }

  }


  $("#buttonSave").on('click', function(e){ //Button Save change na modalu
          e.preventDefault();
        var title = $('#title-message-text').val(); // varijabla koja sadrzi naslov
        var opis = $('#message-text').val(); // var opis sa stringom

          $('#result').text( title ); // u span sa id resultom stavi title
          $('#opis').text( opis ); // u span sa opisom stavi string

      });

  function markerPlacer(latLng,map)
  {
        //funkcija printa markere na mapu
      var loadedMarkers = new google.maps.Marker(
        {
        position: latLng,
      //  icon: ikona,
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP

        }
      );



  }
