import json
import os
import sys
from time import sleep

from fastapi.testclient import TestClient

my_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, my_path + "/../../../")
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
    sleep(0.3)


# return valid attendee token
def authenticate():
    # create host account
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
    assert "access_token" in response
    token = response["access_token"]

    # create event
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

    response = json.loads(response.content)
    event = response["code"]

    # create attendee account
    response = client.post("/attendee/login/" + event,
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json"
                           })

    response = json.loads(response.content)
    return response["access_token"]


def test_change_alias_success():
    before_each_test()
    token = authenticate()

    response = client.post("/attendee/alias/alias",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + token
                           })

    assert response.status_code == 200


def test_change_alias_illegallname():
    before_each_test()
    token = authenticate()

    response = client.post("/attendee/alias/Host",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + token
                           })

    assert response.status_code == 403


def test_change_alias_noauthentication():
    before_each_test()

    response = client.post("/attendee/alias/Host",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json"
                           })

    assert response.status_code == 401


def test_change_alias_noname():
    before_each_test()
    token = authenticate()

    response = client.post("/attendee/alias",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json",
                               "Authorization": "Bearer " + token
                           })

    assert response.status_code == 404
