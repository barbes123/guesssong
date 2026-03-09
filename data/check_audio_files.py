#!/usr/bin/env python3
"""
Audio File Checker Script

This script reads a TypeScript configuration file containing audioUrl declarations,
extracts all the MP3 file paths, and checks if they exist in a specified directory.

Usage:
    python check_audio_files.py <config_file> [search_directory]

Example:
    python check_audio_files.py round2v2.ts /path/to/music/directory
    python check_audio_files.py round2v2.ts .  # search current directory
"""

import re
import os
import sys
from pathlib import Path
from collections import namedtuple

# Colors for terminal output
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  # No Color

def extract_audio_files(config_content):
    """
    Extract all audio file paths from the TypeScript config content.
    Looks for patterns like: audioUrl('name', '/path/to/file.mp3')
    
    Returns a list of tuples (variable_name, file_path, filename)
    """
    # Pattern to match audioUrl calls with two arguments
    # Captures: variable context, the full path
    pattern = r'const\s+(\w+)\s*=\s*audioUrl\s*\(\s*\'[^\']*\'\s*,\s*\'([^\']+\.mp3)\'\s*\)'
    
    matches = re.findall(pattern, config_content)
    
    audio_files = []
    for var_name, file_path in matches:
        filename = os.path.basename(file_path)
        audio_files.append({
            'variable': var_name,
            'full_path': file_path,
            'filename': filename
        })
    
    return audio_files

def normalize_path(file_path):
    """
    Normalize a file path by removing '..' and resolving relative components
    """
    # Remove leading /music/round2/.. patterns
    # This handles cases like '/music/round2/../public/round2/file.mp3'
    if '/..' in file_path:
        # Split the path and resolve the '..' components
        parts = file_path.split('/')
        new_parts = []
        for part in parts:
            if part == '..' and new_parts:
                new_parts.pop()  # Remove the last directory
            elif part != '..':
                new_parts.append(part)
        # Rejoin, removing empty first element if path started with /
        if file_path.startswith('/'):
            return '/' + '/'.join(new_parts[1:])
        else:
            return '/'.join(new_parts)
    return file_path

def find_file_in_directory(filename, search_dir, recursive=True):
    """
    Search for a file in the given directory.
    Returns the full path if found, None otherwise.
    """
    search_path = Path(search_dir)
    
    if recursive:
        # Recursive search
        for file_path in search_path.rglob(filename):
            if file_path.is_file():
                return file_path
    else:
        # Only in the top directory
        file_path = search_path / filename
        if file_path.is_file():
            return file_path
    
    # Also try with the full normalized path
    return None

def main():
    # Check command line arguments
    if len(sys.argv) < 2:
        print(f"{Colors.YELLOW}Usage: {sys.argv[0]} <config_file> [search_directory]{Colors.NC}")
        print(f"  config_file: Path to the TypeScript config file")
        print(f"  search_directory: Directory to search for files (default: current directory)")
        sys.exit(1)
    
    config_file = sys.argv[1]
    search_dir = sys.argv[2] if len(sys.argv) > 2 else '.'
    
    # Check if config file exists
    if not os.path.isfile(config_file):
        print(f"{Colors.RED}Error: Config file '{config_file}' not found!{Colors.NC}")
        sys.exit(1)
    
    # Check if search directory exists
    if not os.path.isdir(search_dir):
        print(f"{Colors.RED}Error: Search directory '{search_dir}' not found!{Colors.NC}")
        sys.exit(1)
    
    print(f"{Colors.BLUE}Audio File Checker{Colors.NC}")
    print(f"{Colors.YELLOW}Config file: {config_file}{Colors.NC}")
    print(f"{Colors.YELLOW}Search directory: {search_dir}{Colors.NC}")
    print("=" * 50)
    
    # Read config file
    try:
        with open(config_file, 'r', encoding='utf-8') as f:
            config_content = f.read()
    except Exception as e:
        print(f"{Colors.RED}Error reading config file: {e}{Colors.NC}")
        sys.exit(1)
    
    # Extract audio files
    audio_files = extract_audio_files(config_content)
    
    if not audio_files:
        print(f"{Colors.RED}No audioUrl declarations found in the config file!{Colors.NC}")
        sys.exit(1)
    
    print(f"{Colors.GREEN}Found {len(audio_files)} audio file references{Colors.NC}")
    print("=" * 50)
    
    # Check each file
    found_files = []
    missing_files = []
    
    for audio in audio_files:
        filename = audio['filename']
        var_name = audio['variable']
        full_path = audio['full_path']
        normalized_path = normalize_path(full_path)
        
        # Search for the file
        found_path = find_file_in_directory(filename, search_dir)
        
        if found_path:
            print(f"{Colors.GREEN}✓ Found:{Colors.NC} {filename}")
            print(f"  └─ Variable: {var_name}")
            print(f"  └─ Location: {found_path}")
            found_files.append(audio)
        else:
            print(f"{Colors.RED}✗ Missing:{Colors.NC} {filename}")
            print(f"  └─ Variable: {var_name}")
            print(f"  └─ Expected path: {full_path}")
            if full_path != normalized_path:
                print(f"  └─ Normalized: {normalized_path}")
            missing_files.append(audio)
        
        print()  # Empty line for readability
    
    # Summary
    print("=" * 50)
    print(f"{Colors.GREEN}Found: {len(found_files)} files{Colors.NC}")
    print(f"{Colors.RED}Missing: {len(missing_files)} files{Colors.NC}")
    print(f"Total: {len(audio_files)} files")
    
    if missing_files:
        print("\n" + "=" * 50)
        print(f"{Colors.RED}Missing files:{Colors.NC}")
        for audio in missing_files:
            print(f"  • {audio['filename']} ({audio['variable']})")
        
        # Ask if user wants to see where to look
        print(f"\n{Colors.YELLOW}Tip: Try searching in these locations:{Colors.NC}")
        # Get unique directories from the paths
        dirs = set()
        for audio in missing_files:
            path = audio['full_path']
            dir_name = os.path.dirname(path)
            dirs.add(dir_name)
            # Also add normalized path if different
            normalized = normalize_path(path)
            norm_dir = os.path.dirname(normalized)
            if norm_dir != dir_name:
                dirs.add(norm_dir)
        
        for d in sorted(dirs):
            print(f"  • {d}")
        
        sys.exit(1)
    else:
        print(f"\n{Colors.GREEN}✓ All {len(audio_files)} files are present!{Colors.NC}")
        sys.exit(0)

if __name__ == "__main__":
    main()