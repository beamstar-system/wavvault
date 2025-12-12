from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import List
import uuid


@dataclass
class Track:
    """Represents a WAV track entry stored in the vault."""

    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    title: str = ""
    artist: str = ""
    path: str = ""
    tags: List[str] = field(default_factory=list)
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def matches_keyword(self, keyword: str) -> bool:
        lowered = keyword.lower()
        haystack = " ".join([self.title, self.artist, self.path, " ".join(self.tags)]).lower()
        return lowered in haystack
