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
         latLng = e.latLng;


        popOut();
        //listener za bootstrap modal kada se klinke na marker

    }
  );

}



function publicPrivate(clicked_id)
{

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

  function popOut(){
    $('#myModal').modal('show');
//funkcija za bootstrap modal i  stavljanje markera na mapu
  }


  $("#buttonSave").on('click', function()
  { //Button Save change na modalu

        var naslov = $('#title-message-text').val(); // varijabla koja sadrzi naslov
        var opis = $('#message-text').val(); // var opis sa stringom
        placeMarker(naslov,opis);
    });




function placeMarker(title,desc) // funkcija koja dodaje marker

{
  infowindow = new google.maps.InfoWindow({


      }
      );
//  var ikona = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

        var  marker = new google.maps.Marker({

          position: latLng,
          //  icon: ikona,
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          content: title
          });

  markers.push(latLng,title,desc); //pusha lat i lng markera u polje

 marker.addListener("click",function(){

      $('#myModal').modal('show');
    //listener za bootstrap modal kada se klinke na marker
  });
  var infowindow;

  //var content =  '<img src="rijeka.jpg" alt="Porcelain Factory of Vista Alegre" height="200" width="450">';

    infowindow = new google.maps.InfoWindow({


        }
        );

        marker.addListener("mouseover",function(){
          infowindow.setContent(this.content);
          infowindow.open(map,marker);
        });


       marker.addListener("mouseout",function()
       {
         infowindow.close();
         //mouse out infowindow se zatvara
       });

}
//kad je mis na markeru otvara se infowindow
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
