import httplib2
from urllib import urlencode
import copy
import json

class ECHONEST_APIS:
  SONG_SEARCH = 'song/search'
  SONG_PROFILE = 'song/profile'


class Echonest(object):
  def init(self):
    # Default EchoNEST URL, can be overridden
    en_url = Constants.ECHONEST_URL
    if en_url:
      self.ECHONEST_URL = en_url
    else:
      self.ECHONEST_URL = "http://developer.echonest.com/api/v4/"

  def song_lookup(self, artist, track):
    keywords = {
      'format': 'json',
      'results': 1,
      'artist': artist,
      'title': track,
      }
    song_response = self._look_up(ECHONEST_APIS.SONG_SEARCH, **keywords)

    song_info = song_response.get('response', {}).get('songs', {})
    return song_info

  def audio_profile(self, id):
    keywords = {
          'id': id,
          'bucket': 'audio_summary'
          }
    audio_profile = self._look_up(ECHONEST_APIS.SONG_PROFILE, **keywords)
    song_info = audio_profile.get('response', {}).get('songs', {})

    return song_info
  def _look_up(self, api, **kwargs):
    args = copy.copy(kwargs)
    args.update({'api_key': Constants.ECHONEST_KEY})
    look_up_url = "http://developer.echonest.com/api/v4/"
    look_up_url += api + '?'
    encoded_args = urlencode(args)
    look_up_url += encoded_args
    http = httplib2.Http()
    response, content = http.request(look_up_url)
    json_content = json.loads(content)
    return json_content