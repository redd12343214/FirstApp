from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_note():
    response = client.post("/notes?content=Test Note")
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["content"] == "Test Note"

def test_get_notes():
    response = client.get("/notes")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(note["content"] == "Test Note" for note in data)