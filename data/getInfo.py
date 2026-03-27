#!/usr/bin/env python3

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Optional, Any

def get_version_number(set_name: str) -> int:
    """Convert set name to version number."""
    if set_name == 'default':
        return 1
    elif set_name == 'v2':
        return 2
    elif set_name == 'v3':
        return 3
    elif set_name == 'v4':
        return 4
    else:
        return 0

def get_round_number(round_name: str) -> int:
    """Convert round name to round number."""
    if round_name == 'round1':
        return 1
    elif round_name == 'round2':
        return 2
    elif round_name == 'round3':
        return 3
    elif round_name == 'round4':
        return 4
    else:
        return 0

def extract_audio_constants(content: str) -> Dict[str, str]:
    """Extract audio file constant definitions from the content."""
    constants = {}
    lines = content.split('\n')
    
    for line in lines:
        # Pattern for: const VAR = audioUrl('id', '/path/file.mp3');
        match = re.search(r'const\s+(\w+)\s*=\s*audioUrl\([^,]*,\s*[\'"]([^\'"]+\.mp3)[\'"]\)', line)
        if match:
            constants[match.group(1)] = match.group(2)
            continue
        
        # Pattern for: const VAR = audioUrl('/path/file.mp3');
        match = re.search(r'const\s+(\w+)\s*=\s*audioUrl\([\'"]([^\'"]+\.mp3)[\'"]\)', line)
        if match:
            constants[match.group(1)] = match.group(2)
            continue
        
        # Pattern for: const VAR = '/path/file.mp3';
        match = re.search(r'const\s+(\w+)\s*=\s*[\'"]([^\'"]+\.mp3)[\'"]', line)
        if match:
            constants[match.group(1)] = match.group(2)
    
    return constants

def parse_round_file(filepath: Path, round_name: str, set_name: str) -> List[Dict[str, Any]]:
    """Parse a single round TypeScript file and extract song data."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # First extract all audio constants
    audio_constants = extract_audio_constants(content)
    
    songs = []
    
    # Find the data array
    data_start = content.find('data: [')
    if data_start == -1:
        print(f"  Warning: No 'data: [' found in {filepath.name}")
        return songs
    
    # Find the matching closing bracket for the data array
    bracket_count = 0
    data_end = -1
    in_string = False
    escape = False
    
    for i in range(data_start, len(content)):
        if escape:
            escape = False
            continue
        if content[i] == '\\':
            escape = True
            continue
        if content[i] == '"' or content[i] == "'":
            in_string = not in_string
            continue
        if in_string:
            continue
            
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                data_end = i
                break
    
    if data_end == -1:
        print(f"  Warning: Could not find closing bracket for data array in {filepath.name}")
        return songs
    
    data_content = content[data_start:data_end+1]
    
    # Find all category objects - look for patterns with 'songs: ['
    # We'll use a simpler approach: find everything between category braces
    category_objects = []
    brace_count = 0
    category_start = -1
    in_string = False
    escape = False
    
    for i, char in enumerate(data_content):
        if escape:
            escape = False
            continue
        if char == '\\':
            escape = True
            continue
        if char == '"' or char == "'":
            in_string = not in_string
            continue
        if in_string:
            continue
            
        if char == '{':
            if brace_count == 0 and category_start == -1:
                # Check if this might be a category (has 'id:' and 'songs:' later)
                # We'll accept it and check later
                category_start = i
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0 and category_start != -1:
                category_block = data_content[category_start:i+1]
                # Verify this is a category (has songs array)
                if 'songs:' in category_block and '[' in category_block:
                    category_objects.append(category_block)
                category_start = -1
    
    # Parse each category
    for cat_block in category_objects:
        # Extract category ID
        cat_id_match = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', cat_block)
        if not cat_id_match:
            continue
        cat_id = cat_id_match.group(1)
        
        # Find the songs array content
        songs_array_match = re.search(r'songs:\s*\[(.*?)\](?=\s*,?\s*\})', cat_block, re.DOTALL)
        if not songs_array_match:
            continue
        
        songs_content = songs_array_match.group(1)
        
        # Find all song objects within the songs array
        brace_count = 0
        song_start = -1
        in_string = False
        escape = False
        
        for i, char in enumerate(songs_content):
            if escape:
                escape = False
                continue
            if char == '\\':
                escape = True
                continue
            if char == '"' or char == "'":
                in_string = not in_string
                continue
            if in_string:
                continue
                
            if char == '{':
                if brace_count == 0:
                    song_start = i
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0 and song_start != -1:
                    song_block = songs_content[song_start:i+1]
                    
                    # Parse song fields
                    id_match = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', song_block)
                    title_match = re.search(r'title:\s*[\'"]([^\'"]+)[\'"]', song_block)
                    artist_match = re.search(r'artist:\s*[\'"]([^\'"]+)[\'"]', song_block)
                    minus_match = re.search(r'audioUrl:\s*(\w+)', song_block)
                    full_match = re.search(r'audioUrlFull:\s*(\w+)', song_block)
                    
                    # Extract notes
                    notes_match = re.search(r'notes:\s*[\'"](.*?)[\'"]\s*(?:,|\n|\})', song_block, re.DOTALL)
                    
                    if title_match:
                        version_num = get_version_number(set_name)
                        round_num = get_round_number(round_name)
                        song_position = len(songs) + 1
                        
                        # Format song number based on round type
                        if round_num in [1, 2]:
                            song_number = f"{version_num}{round_num}{song_position:02d}"
                        else:
                            song_number = f"{version_num}{round_num}{song_position}"
                        
                        song = {
                            'song_number': song_number,
                            'version_number': version_num,
                            'round_number': round_num,
                            'song_position': song_position,
                            'song_id': id_match.group(1) if id_match else '',
                            'title': title_match.group(1),
                            'artist': artist_match.group(1) if artist_match else '',
                            'set_name': set_name,
                            'round_name': round_name,
                            'category_id': cat_id,
                        }
                        
                        # Get audio paths
                        if minus_match:
                            const_name = minus_match.group(1)
                            song['minus_file'] = audio_constants.get(const_name, f'MISSING: {const_name}')
                        else:
                            song['minus_file'] = ''
                        
                        if full_match:
                            const_name = full_match.group(1)
                            song['full_file'] = audio_constants.get(const_name, f'MISSING: {const_name}')
                        else:
                            song['full_file'] = ''
                        
                        # Process notes
                        if notes_match:
                            notes = notes_match.group(1)
                            notes = re.sub(r'\s+', ' ', notes).strip()
                            notes = notes.replace('\\n', '\n').replace('\\"', '"')
                            song['notes'] = notes
                        else:
                            song['notes'] = ''
                        
                        # Extract hint
                        song['hint'] = None
                        hint_match = re.search(r'hint:\s*{\s*en:\s*[\'"]([^\'"]+)[\'"]\s*,\s*ru:\s*[\'"]([^\'"]+)[\'"]\s*}', song_block, re.DOTALL)
                        if hint_match:
                            song['hint'] = {
                                'en': hint_match.group(1),
                                'ru': hint_match.group(2)
                            }
                        else:
                            hint_match = re.search(r'hint:\s*{\s*en:\s*[\'"]([^\'"]+)[\'"]\s*}', song_block)
                            if hint_match:
                                song['hint'] = {'en': hint_match.group(1), 'ru': ''}
                        
                        songs.append(song)
                    
                    song_start = -1
    
    return songs

def parse_all_rounds(directory: Path) -> List[Dict[str, Any]]:
    """Parse all round files in the given directory."""
    all_songs = []
    
    # Find all TypeScript files that look like round data files
    for ts_file in sorted(directory.glob('round*.ts')):
        # Skip index files
        if '_index' in ts_file.name or ts_file.name.startswith('index_'):
            continue
        
        # Skip placeholder/simplified files (like round1_default_sc.ts)
        if '_sc' in ts_file.name:
            print(f"Skipping placeholder file: {ts_file.name}")
            continue
        
        # Determine round name and set
        if ts_file.name.startswith('round0'):
            round_name = 'round0'
        elif ts_file.name.startswith('round1'):
            round_name = 'round1'
        elif ts_file.name.startswith('round2'):
            round_name = 'round2'
        elif ts_file.name.startswith('round3'):
            round_name = 'round3'
        elif ts_file.name.startswith('round4'):
            round_name = 'round4'
        else:
            continue
        
        # Determine set name
        if 'default' in ts_file.name:
            set_name = 'default'
        elif '_v2' in ts_file.name:
            set_name = 'v2'
        elif '_v3' in ts_file.name:
            set_name = 'v3'
        elif '_v4' in ts_file.name:
            set_name = 'v4'
        else:
            set_name = 'unknown'
        
        # Skip round0 for now
        if round_name == 'round0':
            continue
            
        print(f"Parsing {round_name}/{set_name}: {ts_file.name}")
        songs = parse_round_file(ts_file, round_name, set_name)
        all_songs.extend(songs)
        print(f"  Found {len(songs)} songs")
    
    return all_songs

def generate_output(songs: List[Dict[str, Any]], output_file: Path):
    """Generate JSON output and a readable text summary."""
    
    if not songs:
        print("No songs found to output")
        return
    
    # Group by round and set
    grouped = {}
    for song in songs:
        key = f"{song['round_name']}/{song['set_name']}"
        if key not in grouped:
            grouped[key] = []
        grouped[key].append(song)
    
    # Generate text summary
    with open(output_file.with_suffix('.txt'), 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("SONG DATABASE EXTRACTION\n")
        f.write("=" * 80 + "\n\n")
        
        for key in sorted(grouped.keys()):
            f.write(f"\n{'=' * 80}\n")
            f.write(f"ROUND: {key}\n")
            f.write(f"{'=' * 80}\n")
            
            # Group by category within this round
            categories = {}
            for song in grouped[key]:
                cat = song['category_id']
                if cat not in categories:
                    categories[cat] = []
                categories[cat].append(song)
            
            for cat_id, cat_songs in categories.items():
                f.write(f"\n  Category: {cat_id}\n")
                f.write(f"  {'-' * 60}\n")
                
                for idx, song in enumerate(cat_songs, 1):
                    f.write(f"\n    {idx}. Song Number: {song['song_number']}\n")
                    f.write(f"       Version: {song['version_number']}\n")
                    f.write(f"       Round: {song['round_number']}\n")
                    f.write(f"       Title: {song['title']}\n")
                    f.write(f"       Artist: {song['artist']}\n")
                    f.write(f"       ID: {song['song_id']}\n")
                    f.write(f"       Minus: {song['minus_file']}\n")
                    f.write(f"       Full: {song['full_file']}\n")
                    if song['notes']:
                        notes_preview = song['notes'][:300]
                        if len(song['notes']) > 300:
                            notes_preview += "..."
                        f.write(f"       Notes: {notes_preview}\n")
                    if song['hint']:
                        if song['hint'].get('en'):
                            f.write(f"       Hint (EN): {song['hint']['en']}\n")
                        if song['hint'].get('ru'):
                            f.write(f"       Hint (RU): {song['hint']['ru']}\n")
    
    # Generate JSON output
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'total_songs': len(songs),
            'songs': songs,
            'summary': {
                key: len(value) for key, value in grouped.items()
            }
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\nOutput saved to:")
    print(f"  JSON: {output_file}")
    print(f"  Text: {output_file.with_suffix('.txt')}")

def main():
    # Get the directory where the script is running
    ts_dir = Path.cwd()
    
    print(f"Looking for TypeScript files in: {ts_dir}")
    print("-" * 50)
    
    songs = parse_all_rounds(ts_dir)
    
    print("-" * 50)
    print(f"\nTotal songs found: {len(songs)}")
    
    if songs:
        # Count per round
        round_counts = {}
        version_counts = {}
        for song in songs:
            round_counts[song['round_name']] = round_counts.get(song['round_name'], 0) + 1
            version_num = song['version_number']
            version_counts[version_num] = version_counts.get(version_num, 0) + 1
        
        print("\nSongs per round:")
        for round_name, count in sorted(round_counts.items()):
            print(f"  {round_name}: {count}")
        
        print("\nSongs per version:")
        for version_num, count in sorted(version_counts.items()):
            print(f"  Version {version_num}: {count}")
        
        print("\nExpected counts:")
        print("  Round 1: 16 songs per version")
        print("  Round 2: 16 songs per version")
        print("  Round 3: 5 songs per version")
        print("  Round 4: 7 songs per version")
        print(f"  Total per version: 44 songs")
        print(f"  Total overall: 176 songs")
        
        # Show first few songs with their numbers
        print("\nSample songs with numbers:")
        for i, song in enumerate(songs[:15], 1):
            print(f"  {song['song_number']}: {song['title']} ({song['artist']}) [v{song['version_number']}]")
    
    # Generate output
    output_file = ts_dir / 'song_database.json'
    generate_output(songs, output_file)

if __name__ == "__main__":
    main()
