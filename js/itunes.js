/*
/Matthew Shehan
//mshehan@my.smccd.edu
//CIS 
//114 OL
//itunes.js
//final
// 05-27-2016
 */
var iTunes = {
  urlEncode: function (obj) {
				var s = '';
				for (var key in obj) {
      s += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
				}
				if (s.length > 0) {
      s = s.substr(0, s.length - 1);
				}

				return (s);
  },

  performSearch: function () {
		var params = {
      term: $('#search-keyword').val(),
      country: 'US',
      media: 'music',
      entity: 'musicTrack',
      //attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm',
      limit: 20,
      //callback: 'handleTunesSearchResults'
		 };
		var params = this.urlEncode(params);
		var url = '//itunes.apple.com/search?' + params + '&callback=?';
    
    $.getJSON(url, function(arg){
      var results = arg.results;
      var html = '';
      for (var i = 0; i < results.length; i++) {
        var item = results[i];
        var obj = {
          source: 0,
          artwork_url: item.artworkUrl100,
          track_id: item.trackId,
          track_name: item.trackCensoredName,
          track_url: item.trackViewUrl,
          artist_name: item.artistName,
          artist_url: item.artistViewUrl,
          collection_name: item.collectionCensoredName,
          collection_url: item.collectionViewUrl,
          genre: item.primaryGenreName
        };
        results[i] = obj;
        html += '<div class="songs-search-result">';
        html += '<img class="image" src="' + obj.artwork_url + '"/>';
        html += '<span class="label">Track:</span>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
        html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
        html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;'.replace("{0}", obj.track_url);
        html += '<br/><span class="label">Track Price:</span>{0} {1}<br />'.replace("{0}", item.trackPrice).replace("{1}", item.currency);
        html += '<span class="label">Artist:</span><a href="{0}" target="_blank">{1}</a><br />'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
        html += '<span class="label">Collection:</span><a href="{0}" target="_blank">{1}</a><br />'.replace("{0}", obj.collection_url).replace("{1}", obj.collection_name);
        html += '<span class="label">Collection Price:</span>{0} {1}<br />'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
        html += '<span class="label">Primary Genre:</span>{0}<br />'.replace("{0}", obj.genre);

        html += '</div>';
      }
      $('#itunes-results').html(html)
    });
  }
};
