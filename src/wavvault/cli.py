from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

from .models import Track
from .storage import Storage


def _comma_split(value: str | None) -> list[str]:
    if not value:
        return []
    return [part.strip() for part in value.split(",") if part.strip()]


def _format_tracks(tracks: Iterable[Track]) -> str:
    lines: list[str] = []
    for track in tracks:
        tags = ", ".join(track.tags) if track.tags else "-"
        lines.append(
            f"{track.id} | {track.title} | {track.artist} | {track.path} | tags: {tags} | created: {track.created_at}"
        )
    return "\n".join(lines) if lines else "No tracks found."


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Manage references to WAV files")
    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="Add a new track")
    add_parser.add_argument("--title", required=True)
    add_parser.add_argument("--artist", required=True)
    add_parser.add_argument("--path", required=True, type=Path)
    add_parser.add_argument("--tags", help="Comma-separated tags", default="")

    subparsers.add_parser("list", help="List all tracks")

    search_parser = subparsers.add_parser("search", help="Search tracks by keyword")
    search_parser.add_argument("--keyword", required=True)

    remove_parser = subparsers.add_parser("remove", help="Remove a track by id")
    remove_parser.add_argument("--id", required=True)

    return parser


def main(args: list[str] | None = None) -> None:
    parser = _build_parser()
    parsed = parser.parse_args(args=args)
    storage = Storage()

    if parsed.command == "add":
        track = Track(
            title=parsed.title,
            artist=parsed.artist,
            path=str(parsed.path.expanduser()),
            tags=_comma_split(parsed.tags),
        )
        storage.add_track(track)
        print(f"Stored track {track.id}: {track.title} - {track.artist}")
    elif parsed.command == "list":
        print(_format_tracks(storage.list_tracks()))
    elif parsed.command == "search":
        print(_format_tracks(storage.search_tracks(parsed.keyword)))
    elif parsed.command == "remove":
        removed = storage.remove_track(parsed.id)
        if removed:
            print(f"Removed {parsed.id}")
        else:
            print(f"No track found with id {parsed.id}")
    else:
        parser.error("Unknown command")


if __name__ == "__main__":
    main()
