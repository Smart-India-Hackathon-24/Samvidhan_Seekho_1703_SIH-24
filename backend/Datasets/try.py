import re
import json
import sys
import os

# Add the 'backend' directory to sys.path (one level up from try.py)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from Database.DatabaseFunctions import getAllArticleByNumberFromDatabase

def parse_markdown(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    lines = content.split("\n")
    data = []
    current_part = None
    current_chapter = None
    current_section = None

    for line in lines:
        if line.startswith('### <p align="center"> PART'):
            if current_part:
                data.append(current_part)
            part_match = re.match(r'### <p align="center"> PART ([IVXLC]+)', line)
            if part_match:
                part_number = part_match.group(1)
                part_title = lines[lines.index(line) + 1].strip()
                part_title = part_title.replace('#### <p align="center">', "").strip()
                part_title = part_title.replace("</p>", "").strip()
                current_part = {
                    "partition_number": f"Part {part_number}",
                    "partition_title": part_title,
                    "sub_partitions": [],
                }
                current_chapter = None
                current_section = None
        elif line.startswith('#### <p align="center"> CHAPTER'):
            chapter_match = re.match(r'#### <p align="center"> CHAPTER ([IVX]+)', line)
            if chapter_match:
                chapter_number = chapter_match.group(1)
                chapter_title = line.split(".")[-1].strip()
                chapter_title = chapter_title.replace(
                    '#### <p align="center">', ""
                ).strip()
                chapter_title = chapter_title.replace("</p>", "").strip()
                current_chapter = {
                    "partition_title": f"Chapter {chapter_number}. {chapter_title}",
                    "sub_partitions": [],
                }
                current_part["sub_partitions"].append(current_chapter)
                current_section = None
        elif line.startswith('##### <p align="center">'):
            line = line.replace('#### <p align="center">', "").strip()
            section_title = line.replace("</p>", "").strip()
            section_title = section_title.replace("#", "").replace("*", "").strip()
            current_section = {"partition_title": section_title, "sub_partitions": []}
            if current_chapter:
                current_chapter["sub_partitions"].append(current_section)
            elif current_part:
                current_part["sub_partitions"].append(current_section)
        elif re.match(r"^\d+\.", line):
            article_match = re.match(r"^(\d+)\.\s*(.*)", line)
            if article_match:
                article_number = article_match.group(1)
                article_title = article_match.group(2)
                partition_id = getAllArticleByNumberFromDatabase(
                    article_number
                )  
                print(partition_id)
                article = {
                    "partition_number": f"Article - {article_number}",
                    "partition_title": f"{article_title}",
                    "partition_id": str(partition_id) if partition_id else None,  # Convert ObjectId to string
                }
                if current_section:
                    current_section["sub_partitions"].append(article)
                elif current_chapter:
                    current_chapter["sub_partitions"].append(article)
                elif current_part:
                    current_part["sub_partitions"].append(article)

    if current_part:
        data.append(current_part)

    return data

# Parse the Markdown file
markdown_file_path = os.path.join(os.path.dirname(__file__), "FinalConstitution.md")
parsed_data = parse_markdown(markdown_file_path)

# Save the parsed data as JSON
json_file_path = os.path.join(os.path.dirname(__file__), "constitution.json")
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(parsed_data, json_file, indent=2, ensure_ascii=False)

print(f"JSON file has been created successfully at: {json_file_path}")
