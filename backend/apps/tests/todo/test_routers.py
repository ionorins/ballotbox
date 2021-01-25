from fastapi.testclient import TestClient
import sys
import os
import json

my_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, my_path + '/../../../')
app = __import__("main").app

client = TestClient(app)


def before_each_test():
    app.mongodb["tasks"].drop()


def test_list_tasks():
    before_each_test()
    response = client.get("/task")
    assert response.status_code == 200
    assert type(response.json()) == list


def test_create_task_success():
    before_each_test()
    name = "My important task"
    completed = True
    response = client.post("/task/",
                           headers={"accept": "application/json",
                                    "Content-Type": "application/json"},
                           json={
                               "name": name,
                               "completed": completed
                           })

    assert response.status_code == 201

    responseDict = json.loads(response.content)
    assert responseDict["name"] == name
    assert responseDict["completed"] == completed


def test_create_task_fail():
    before_each_test()
    name = "My important task"
    completed = True
    response = client.post("/task/",
                           headers={"accept": "application/json",
                                    "Content-Type": "application/json"},
                           json={})

    assert response.status_code == 422
