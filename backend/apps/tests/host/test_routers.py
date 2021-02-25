import json
import os
import sys

from fastapi.testclient import TestClient

my_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, my_path + '/../../../')
app = __import__("main").app

client = TestClient(app)


def before_each_test():
    # empty db
    app.mongodb["attendees"].drop()
    app.mongodb["comments"].drop()
    app.mongodb["events"].drop()
    app.mongodb["hostSessions"].drop()
    app.mongodb["hosts"].drop()
    app.mongodb["polls"].drop()

# returns valid host token


def authenticate():
    response = client.post("/auth/create",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json"
                           },
                           json={
                               "username": "user@example.com",
                               "password": "string123"
                           })
    response = json.loads(response.content)
    return response['access_token']


def test_create_event_success():
    before_each_test()
    token = authenticate()

    response = client.post("/host/event",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + token
                           },
                           json={
                               "name": "name",
                               "timestamp": 0
                           })

    assert response.status_code == 200


def test_create_event_baddata():
    before_each_test()
    token = authenticate()

    response = client.post("/host/event",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + token
                           },
                           json={})

    assert response.status_code == 422


def test_create_event_noauthentication():
    before_each_test()
    token = authenticate()

    response = client.post("/host/event",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json",
                           },
                           json={
                               "name": "name",
                               "timestamp": 0
                           })

    assert response.status_code == 401
