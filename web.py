#!/usr/bin/env python

import os
import json
import httplib2
from flask import Flask, request, jsonify
from echonest import Echonest

ECHONEST_API_KEY = os.environ.get("ECHONEST_API")
app = Flask(__name__)
state = {}

@app.route('/')
def index():
  return open('html/index.html').read()

@app.route('/api/getEchonestData')
def get_echonest_data():
  artist = request.args.get('artist')
  track = request.args.get('track')
  en = Echonest(api_key=ECHONEST_API_KEY)
  song = en.song_lookup(artist, track)
  track_id = song[0].get('id')
  song_profile = en.audio_profile(track_id)
  song_json_url = song_profile[0].get('audio_summary', {}).get('analysis_url', '')
  http = httplib2.Http()
  response, content = http.request(song_json_url)
  api_response_dict = {
    'summary': song_profile[0].get('audio_summary', {})
    }
  json_profile_response = json.loads(content)

  api_response_dict.update({'profile': json_profile_response})

  return jsonify(api_response_dict)

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.debug = True
  app.run(host='0.0.0.0', port=port)
