import os
from flask import Flask, request, jsonify
from pprint import pprint

app = Flask(__name__)
state = {}

@app.route('/')
def index():
  return open('html/index.html').read()

@app.route('/api/getEchonestData')
def get_echonest_data():
  return jsonify({'result':'I work'})

"""
@app.route('/api/get')
def get():
  keys = request.args.get('keys')
  extras = request.args.get('extras')
  response = api.get(keys=keys, extras=extras)
  return jsonify(response)
"""
if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.debug = True
  app.run(host='0.0.0.0', port=port)
