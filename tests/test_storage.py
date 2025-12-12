from pathlib import Path

from wavvault.models import Track
from wavvault.storage import Storage


def test_add_and_list_tracks(tmp_path: Path) -> None:
    storage = Storage(data_path=tmp_path / "tracks.json")
    added = storage.add_track(Track(title="Kick", artist="Studio", path="/tmp/kick.wav"))

    tracks = storage.list_tracks()

    assert len(tracks) == 1
    assert tracks[0].id == added.id
    assert tracks[0].title == "Kick"


def test_remove_track(tmp_path: Path) -> None:
    storage = Storage(data_path=tmp_path / "tracks.json")
    first = storage.add_track(Track(title="Kick", artist="Studio", path="/tmp/kick.wav"))
    storage.add_track(Track(title="Snare", artist="Studio", path="/tmp/snare.wav"))

    removed = storage.remove_track(first.id)
    remaining = storage.list_tracks()

    assert removed is True
    assert len(remaining) == 1
    assert remaining[0].title == "Snare"


def test_search_tracks(tmp_path: Path) -> None:
    storage = Storage(data_path=tmp_path / "tracks.json")
    storage.add_track(Track(title="Kick", artist="Studio", path="/tmp/kick.wav", tags=["drum", "low"]))
    storage.add_track(Track(title="Snare", artist="Studio", path="/tmp/snare.wav", tags=["drum", "high"]))

    matches = storage.search_tracks("snare")

    assert len(matches) == 1
    assert matches[0].title == "Snare"


def test_search_tags(tmp_path: Path) -> None:
    storage = Storage(data_path=tmp_path / "tracks.json")
    storage.add_track(Track(title="Kick", artist="Studio", path="/tmp/kick.wav", tags=["drum", "low"]))

    matches = storage.search_tracks("drum")

    assert len(matches) == 1
    assert matches[0].title == "Kick"
