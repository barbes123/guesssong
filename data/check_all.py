#!/usr/bin/env python3
"""
Batch Audio File Checker Script

This script runs the audio file checker for multiple rounds and versions:
- Rounds: 1, 2, 3, 4
- Versions: _default, _v1, _v2, _v3, _v4

It calls check_audio_files.py for each combination and provides a summary.
"""

import subprocess
import sys
import os
from pathlib import Path
from datetime import datetime

# Colors for terminal output
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    MAGENTA = '\033[0;35m'
    CYAN = '\033[0;36m'
    NC = '\033[0m'  # No Color
    BOLD = '\033[1m'

def print_header(text):
    """Print a formatted header"""
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'=' * 60}{Colors.NC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text:^60}{Colors.NC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'=' * 60}{Colors.NC}\n")

def print_summary_table(results):
    """Print a summary table of all results"""
    print_header("COMPLETE SUMMARY")
    
    # Calculate column widths
    round_width = 10
    version_width = 12
    status_width = 15
    found_width = 10
    missing_width = 10
    total_width = 10
    
    # Print header
    print(f"{Colors.BOLD}{Colors.YELLOW}", end="")
    print(f"{'Round':<{round_width}} {'Version':<{version_width}} {'Status':<{status_width}} "
          f"{'Found':>{found_width}} {'Missing':>{missing_width}} {'Total':>{total_width}}")
    print(f"{'-' * (round_width + version_width + status_width + found_width + missing_width + total_width + 5)}{Colors.NC}")
    
    # Print each result
    total_found = 0
    total_missing = 0
    total_files = 0
    passed = 0
    failed = 0
    
    for result in results:
        status_color = Colors.GREEN if result['exit_code'] == 0 else Colors.RED
        status = "✓ PASSED" if result['exit_code'] == 0 else "✗ FAILED"
        
        print(f"{result['round']:<{round_width}} {result['version']:<{version_width}} "
              f"{status_color}{status:<{status_width}}{Colors.NC} "
              f"{result['found']:>{found_width}} {result['missing']:>{missing_width}} "
              f"{result['total']:>{total_width}}")
        
        total_found += result['found']
        total_missing += result['missing']
        total_files += result['total']
        if result['exit_code'] == 0:
            passed += 1
        else:
            failed += 1
    
    # Print footer
    print(f"{Colors.BOLD}{Colors.YELLOW}{'-' * (round_width + version_width + status_width + found_width + missing_width + total_width + 5)}{Colors.NC}")
    print(f"{Colors.BOLD}{'TOTAL':<{round_width + version_width + status_width}} "
          f"{total_found:>{found_width}} {total_missing:>{missing_width}} "
          f"{total_files:>{total_width}}{Colors.NC}")
    print()
    
    # Print pass/fail summary
    if failed == 0:
        print(f"{Colors.GREEN}✓ All {passed} checks passed successfully!{Colors.NC}")
    else:
        print(f"{Colors.GREEN}✓ Passed: {passed}{Colors.NC}")
        print(f"{Colors.RED}✗ Failed: {failed}{Colors.NC}")
    
    return passed, failed

def run_check(round_num, version, base_dir="../public/music"):
    """
    Run the audio file checker for a specific round and version
    
    Args:
        round_num: Round number (1, 2, 3, 4)
        version: Version string (_default, _v1, _v2, _v3, _v4)
        base_dir: Base directory for music files
    
    Returns:
        dict: Result information
    """
    # Construct filenames and paths
    config_file = f"round{round_num}{version}.ts"
    music_dir = f"{base_dir}/round{round_num}/"
    
    # Check if config file exists
    if not os.path.isfile(config_file):
        return {
            'round': f"Round {round_num}",
            'version': version,
            'config_file': config_file,
            'music_dir': music_dir,
            'exit_code': -1,
            'found': 0,
            'missing': 0,
            'total': 0,
            'error': f"Config file not found: {config_file}"
        }
    
    # Check if music directory exists
    if not os.path.isdir(music_dir):
        return {
            'round': f"Round {round_num}",
            'version': version,
            'config_file': config_file,
            'music_dir': music_dir,
            'exit_code': -1,
            'found': 0,
            'missing': 0,
            'total': 0,
            'error': f"Music directory not found: {music_dir}"
        }
    
    print(f"{Colors.BLUE}Checking: {config_file} → {music_dir}{Colors.NC}")
    
    # Run the checker script
    try:
        # Run the subprocess and capture output
        result = subprocess.run(
            [sys.executable, "check_audio_files.py", config_file, music_dir],
            capture_output=True,
            text=True,
            encoding='utf-8'
        )
        
        # Parse the output to extract found/missing counts
        found = 0
        missing = 0
        total = 0
        
        for line in result.stdout.split('\n'):
            if "Found:" in line and "files" in line and "Missing:" not in line:
                # Parse the summary line
                parts = line.split()
                for i, part in enumerate(parts):
                    if part == "Found:" and i + 1 < len(parts):
                        try:
                            found = int(parts[i + 1])
                        except ValueError:
                            pass
                    elif part == "Missing:" and i + 1 < len(parts):
                        try:
                            missing = int(parts[i + 1])
                        except ValueError:
                            pass
                    elif part == "Total:" and i + 1 < len(parts):
                        try:
                            total = int(parts[i + 1])
                        except ValueError:
                            pass
        
        # Print the output (indented for readability)
        for line in result.stdout.split('\n'):
            if line.strip():
                print(f"  {line}")
        
        if result.stderr:
            print(f"{Colors.RED}Errors:{Colors.NC}")
            for line in result.stderr.split('\n'):
                if line.strip():
                    print(f"  {Colors.RED}{line}{Colors.NC}")
        
        return {
            'round': f"Round {round_num}",
            'version': version,
            'config_file': config_file,
            'music_dir': music_dir,
            'exit_code': result.returncode,
            'found': found,
            'missing': missing,
            'total': total,
            'error': None
        }
        
    except Exception as e:
        print(f"{Colors.RED}Error running checker: {e}{Colors.NC}")
        return {
            'round': f"Round {round_num}",
            'version': version,
            'config_file': config_file,
            'music_dir': music_dir,
            'exit_code': -1,
            'found': 0,
            'missing': 0,
            'total': 0,
            'error': str(e)
        }

def main():
    # Configuration
    rounds = [1, 2, 3, 4]
    versions = ["_default", "_v2", "_v3", "_v4"]
    base_dir = "../public/music"  # Adjust this if your path is different
    
    print_header("BATCH AUDIO FILE CHECKER")
    print(f"Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Base directory: {base_dir}")
    print(f"Rounds: {', '.join(str(r) for r in rounds)}")
    print(f"Versions: {', '.join(versions)}")
    
    # Store all results
    results = []
    
    # Run checks for each combination
    for round_num in rounds:
        print_header(f"ROUND {round_num}")
        
        for version in versions:
            result = run_check(round_num, version, base_dir)
            results.append(result)
            print()  # Empty line between checks
    
    # Print final summary
    passed, failed = print_summary_table(results)
    
    # Print details of failed checks
    failed_results = [r for r in results if r['exit_code'] != 0]
    if failed_results:
        print_header("FAILED CHECKS DETAILS")
        for result in failed_results:
            if result['error']:
                print(f"{Colors.RED}✗ {result['round']}{result['version']}: {result['error']}{Colors.NC}")
            else:
                print(f"{Colors.RED}✗ {result['round']}{result['version']}: "
                      f"Found {result['found']}/{result['total']} files "
                      f"({result['missing']} missing){Colors.NC}")
    
    # Return appropriate exit code
    sys.exit(1 if failed > 0 else 0)

if __name__ == "__main__":
    main()