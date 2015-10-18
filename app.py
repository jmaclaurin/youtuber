from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import json
from flask import Flask, jsonify
from flask import request
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://youtuber:youtuber@localhost:5432/youtuber'
db = SQLAlchemy(app)

class YoutubeLink(db.Model):
	__tablename__ = 'youtube_links'

	id = db.Column(db.Integer, primary_key=True)
	url = db.Column(db.String())
	title = db.Column(db.String())
	description = db.Column(db.String())

	def __init__(self, url, title, description):
		self.url = url
		self.title = title
		self.description = description

	@property	
	def to_json(self):
		return {'id':self.id,
		'url':self.url,
		'title':self.title,
		'description':self.description}

@app.route("/youtube_links", methods=['GET'])
def index():
	links = YoutubeLink.query
	return json.dumps([l.to_json for l in links.all()])

@app.route("/youtube_links", methods=['POST'])
def create():
	youtube_link = YoutubeLink(request.json.get('url'), request.json.get('title'), request.json.get('description'))
	db.session.add(youtube_link)
	db.session.commit()
	return jsonify(youtube_link.to_json)

@app.route("/youtube_links/<int:youtube_link_id>", methods=['GET'])
def show(youtube_link_id):
	youtube_link = YoutubeLink.query.get(youtube_link_id)
	return jsonify(youtube_link.to_json)

@app.route("/youtube_links/<int:youtube_link_id>", methods=['PUT'])
def update(youtube_link_id):
	youtube_link = YoutubeLink.query.get(youtube_link_id)
	youtube_link.url = request.json.get('url')
	youtube_link.title = request.json.get('title')
	youtube_link.description = request.json.get('description')	
	db.session.commit()
	return jsonify(youtube_link.to_json)

@app.route("/youtube_links/<int:youtube_link_id>", methods=['DELETE'])
def delete(youtube_link_id):
	youtube_link = YoutubeLink.query.get(youtube_link_id)
	db.session.delete(youtube_link)
	db.session.commit()
	return ''

db.create_all()

if __name__ == "__main__":
	app.debug = True
	app.run()
