import os
import sys

from fastapi.testclient import TestClient

my_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, my_path + '/../../../')
app = __import__("main").app

client = TestClient(app)


def before_each_test():
    app.mongodb["attendees"].drop()
    app.mongodb["comments"].drop()
    app.mongodb["events"].drop()
    app.mongodb["hostSessions"].drop()
    app.mongodb["hosts"].drop()
    app.mongodb["polls"].drop()


def test_create_account_nobody():
    before_each_test()
    response = client.post("/auth/create")
    assert response.status_code == 422


def test_create_account_baddata():
    before_each_test()
    response = client.post("/auth/create",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json"
                           },
                           json={
                               "username": "hello",
                               "password": "weak"
                           })

    assert response.status_code == 422


def test_create_account_success():
    before_each_test()
    response = client.post("/auth/create",
                           headers={
                               "accept": "application/json",
                               "Content-Type": "application/json"
                           },
                           json={
                               "username": "hello@hello.com",
                               "password": "notweak123"
                           })

    assert response.status_code == 201
