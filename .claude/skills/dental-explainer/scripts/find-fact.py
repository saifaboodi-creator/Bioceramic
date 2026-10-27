#!/usr/bin/env python3
"""Find a phrase in a source PDF and report the PDF page it sits on.

Usage:  python3 find-fact.py <file.pdf | extracted.txt> "<regex>" [more regex ...]

Every number or claim shown on screen must come from a line this script finds.
Pages come from pdftotext's form feeds, or from "-- N of M --" markers in an
already extracted .txt file.
"""
import re, subprocess, sys

def pages(path):
    if path.lower().endswith(".pdf"):
        text = subprocess.run(["pdftotext", "-layout", path, "-"],
                              capture_output=True, text=True, check=True).stdout
        return text.split("\f")
    out, cur = [], []
    for line in open(path, encoding="utf-8"):
        m = re.match(r"--\s*(\d+)\s+of\s+\d+\s*--", line)
        if m:
            out.append("".join(cur)); cur = []
        else:
            cur.append(line)
    out.append("".join(cur))
    return out

def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src = pages(sys.argv[1])
    for pat in sys.argv[2:]:
        rx = re.compile(pat, re.I)
        hits = [(i + 1, l.strip()) for i, p in enumerate(src)
                for l in p.splitlines() if rx.search(l)]
        print(f"## {pat}  ({len(hits)} hit{'s' if len(hits) != 1 else ''})")
        for page, line in hits[:8]:
            print(f"  p.{page}: {line}")
        if not hits:
            print("  NOT FOUND - do not use this claim")

if __name__ == "__main__":
    main()
