from __future__ import annotations

import json
from dataclasses import asdict
from pathlib import Path
from typing import List

from .models import Track


class Storage:
    """Persist tracks as JSON in the user's data directory."""

    def __init__(self, data_path: Path | None = None) -> None:
        self.data_path = data_path or self._default_path()
        self.data_path.parent.mkdir(parents=True, exist_ok=True)
        if not self.data_path.exists():
            self._write([])

    def _default_path(self) -> Path:
        base_dir = Path.home() / ".local" / "share" / "wavvault"
        return base_dir / "tracks.json"

    def _write(self, tracks: List[Track]) -> None:
        serialized = [asdict(track) for track in tracks]
        self.data_path.write_text(json.dumps(serialized, indent=2))

    def _read(self) -> List[Track]:
        if not self.data_path.exists():
            return []
        content = self.data_path.read_text().strip()
        if not content:
            return []
        loaded = json.loads(content)
        return [Track(**item) for item in loaded]

    def list_tracks(self) -> List[Track]:
        return self._read()

    def add_track(self, track: Track) -> Track:
        tracks = self._read()
        tracks.append(track)
        self._write(tracks)
        return track

    def remove_track(self, track_id: str) -> bool:
        tracks = self._read()
        filtered = [track for track in tracks if track.id != track_id]
        removed = len(tracks) != len(filtered)
        if removed:
            self._write(filtered)
        return removed

    def search_tracks(self, keyword: str) -> List[Track]:
        return [track for track in self._read() if track.matches_keyword(keyword)]
