#!/usr/bin/env python
import os
import re

HEADER_REGEX = re.compile(r'^([0-9]+)d\s+([^\s]+)\s+([0-9]+)')
PARAM_REGEX = re.compile(r'^\s*!([^\s\^:]+):*\s*([^\s]*.*)$')
COMMENT_REGEX = re.compile(r'^\s*#')
FILENAME_REGEX = re.compile(r's([0-9]+)_([0-9]+)_([0-9]+)\.txt$')

def parse_sanscal(cal, **kw):
    entries = []
    current_key = None
    new_entry = None
    for line in cal.splitlines():
        comment = COMMENT_REGEX.match(line)
        if comment:
            continue
            
        header = HEADER_REGEX.match(line)
        param = PARAM_REGEX.match(line)
        if header:
            groups = header.groups()
            new_entry = {"days": groups[0], "month": groups[1], "date": groups[2]}
            new_entry.update(kw)
            current_key = None
            entries.append(new_entry)
        elif param:
            groups = param.groups()
            current_key = groups[0]
            if new_entry:
                new_entry[current_key] = groups[1]
        elif line and current_key and new_entry and current_key in new_entry:
            # this is a continuation line...
            new_entry[current_key] += " " + line
                
    return entries
    
def parse_all(directory):
    files = [f for f in os.listdir(directory) if FILENAME_REGEX.match(f)]
    entries = []
    for f in files:
        fr = FILENAME_REGEX.match(f).groups()
        year = int(fr[2])
        if year > 90: year += 1900
        else: year += 2000
        cal = open(os.path.join(directory, f), 'r').read().decode("latin-1")
        entries.extend(parse_sanscal(cal, year=year))
        
    return entries

if __name__ == '__main__':
    import sys, json
    directory = sys.argv[1] if len(sys.argv) > 1 else "./"
    output_file = sys.argv[2] if len(sys.argv) > 2 else "./cal_output.json"
    output = parse_all(directory)
    open(output_file, 'w').write(json.dumps(output))
        

