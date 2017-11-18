
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
	
	
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
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

	
		
	    
        var songs = [
			  {
				'name': 'Tamma Tamma',
				'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
				'album': 'Badrinath ki Dulhania',
				'duration': '2:56',
			   'fileName': 'song1.mp3',
			    'image': 'song1.jpg'
			  },
			  {
				'name': 'Humma Song',
				'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
				'album': 'Ok Jaanu',
				'duration': '3:15',
				'fileName': 'song2.mp3',
				'image': 'song2.jpg'
			  },
			  {
				'name': 'Nashe si chadh gyi',
				'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
				'album': 'Badrinath ki Dulhania',
				'duration': '2:56',
			   'fileName': 'song3.mp3',
			   'image': 'song3.jpg'
			  },
			  {
				'name': 'Break Up song',
				'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
				'album': 'Badrinath ki Dulhania',
				'duration': '2:56',
			   'fileName': 'song4.mp3',
			   'image': 'song4.jpg'
			  }
			   
]
		window.onload = function() {
			changeCurrentSongDetails(songs[0]);
		for(var i =0; i < songs.length ; i++) {
			var obj = songs[i];
			var name = '#song' + (i+1);
			var song = $(name);
			song.find('.song-name').text(obj.name);
			song.find('.song-artist').text(obj.artist);
			song.find('.song-album').text(obj.album);
			song.find('.song-length').text(obj.duration);
			addSongNameClickEvent(obj,i+1)
		}
		updateCurrentTime();
		  setInterval(function() {
			updateCurrentTime();
		  },1000);
		}
		
function changeCurrentSongDetails(songObj) {
	  $('.current-song-image').attr('src','img/' + songObj.image) ;
	  $('.current-song-name').text(songObj.name) ;
	  $('.current-song-album').text(songObj.album) ;
	}
		
