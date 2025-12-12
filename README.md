# wavvault

A lightweight command-line vault for tracking references to WAV audio files. The tool lets you add entries with metadata, list stored tracks, search by keywords, and remove entries when they are no longer needed. Data is stored as a simple JSON file in the user's application data directory so it stays persistent across runs without needing a database.

## Installation

```bash
python -m pip install -e .
```

## Usage

After installation, the `wavvault` command becomes available:

```bash
wavvault add --title "Snare" --artist "Studio" --path ~/audio/snare.wav --tags drum,one-shot
wavvault list
wavvault search --keyword snare
wavvault remove --id <track-id>
```

Run `wavvault --help` for a full overview of the commands and options.

## Development

Install dependencies (only the standard library is used) and run tests with:

```bash
python -m pip install -e .
pytest
```
