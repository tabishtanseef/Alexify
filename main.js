
function toggleSong(){
	var song = document.querySelector('audio');
		if (song.paused == true) {
			console.log('Playing');
			$('.play-icon').removeClass('fa-play').addClass('fa-pause');
			song.play();
		} else {
			console.log('Pausing');
			$('.play-icon').removeClass('fa-pause').addClass('fa-play');
			song.pause();
		}
	}

function fetchSongs() {

      $.ajax({
        'url': 'https://jsonbin.io/b/59f713154ef213575c9f652f',
        'dataType': 'json',
        'method': 'GET',
        'success': function (responseData) {
          songs = responseData ;
		  setupApp();
        }
      }) ;

    }

	
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
			fetchSongs();
			
        } else {
            $('#name-input').addClass('error');
        }
    });
    $('.play-icon').on('click', function() {
        toggleSong();
    });
    $('body').on('keypress', function(event) {
				console.log(event.keyCode)
                if (event.keyCode ==112) {
                   toggleSong(); 
                }
            });
			
function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
			
function updateCurrentTime() {
		  var song = document.querySelector('audio');
		  //console.log(song.currentTime);
		  //console.log(song.duration);
		  var currentTime = Math.floor(song.currentTime);
		  var duration = Math.floor(song.duration);
		  new_current_time = fancyTimeFormat(currentTime);
		  new_duration = fancyTimeFormat(duration);
		  
		  $('.time-elapsed').text(new_current_time);
		  $('.song-duration').text(new_duration); 
		}
		
		
function addSongNameClickEvent(songObj,position) {
    var songName = songObj.fileName;
	var id = '#song' + position;
    $(id).click(function() {
    var audio = document.querySelector('audio');
    var currentSong = audio.src;
    if(currentSong.search(songName) != -1)
    {
      toggleSong();
    }
    else {
      audio.src = songName;
      toggleSong();
	  changeCurrentSongDetails(songObj);
    }
});
}		
function changeCurrentSongDetails(songObj) {
	  $('.current-song-image').attr('src',songObj.image) ;
	  $('.current-song-name').text(songObj.name) ;
	  $('.current-song-album').text(songObj.album) ;
	}
	
		
	    
function setupApp() {
	  changeCurrentSongDetails(songs[0]);

	  setInterval(function() {
		updateCurrentTime() ;
	  }) ;
  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1) ;
  }
}
    var recognition = new webkitSpeechRecognition();
		
$('#start_img').on('click', function () {
    recognition.start();
  }) ;
  
  
  
  var finalText = '' ;
    recognition.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript;
        }
      }

    };

	recognition.onend = function () {
      // call wit
      callWit(finalText) ;
    }
  
function callWit(text) {
        $.ajax({
         url: 'https://api.wit.ai/message',
         data: {
           'q': text ,
           'access_token' : '5N64EBQBK5FFX6VIBJKVCE6Z4FKGGP4Y'
         },
         dataType: 'jsonp',
         method: 'GET',
         success: function(response) {
             console.log("success!", response);
			 if(response.entities.intent[0].value == 'play') {
				if(response.entities.hasOwnProperty('search_query')) {
					  var songName = response.entities.search_query[0].value ;
					  var matchIndex = 0 ;
					  for(var i =0; i < songs.length ; i++) {
						// Lower case both song names
						var isMatch = songs[i].name.toLowerCase().match(songName.toLowerCase()) ;
						if(isMatch !== null) {
						  matchIndex = i ;
						}
					  }
					  changeCurrentSongDetails(songs[matchIndex]) ;
					  toggle() ;
					}
				}
			 else if (response.entities.intent[0].value == 'pause') {
				toggle() ;
			  }
         }
       });
   }
		
