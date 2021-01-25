import sys, os
my_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, my_path + '/../../../')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_tasks():
    response = client.get("/task")
    assert response.status_code == 200
    assert response.json() == []

