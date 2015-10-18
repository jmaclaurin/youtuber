from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
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

@app.route("/youtube_links", methods=['GET'])
def index():
	return "index"

@app.route("/youtube_links", methods=['POST'])
def create():
	return "create"

@app.route("/youtube_links/<int:youtube_link_id>", methods=['GET'])
def show(youtube_link_id):
	return 'show'

@app.route("/youtube_links/<int:youtube_link_id>", methods=['PUT'])
def update(youtube_link_id):
	return'update'

@app.route("/youtube_links/<int:youtube_link_id>", methods=['DELETE'])
def delete(youtube_link_id):
	return 'delete'

db.create_all()

if __name__ == "__main__":
	app.debug = True
	app.run()
