import csv
import json

csv_file_path = 'references/national_curriculum_framework_excel.csv'
json_file_path = 'references/national_curriculum_framework_excel.json'

def csv_to_json(csv_path, json_path):
    data = []
    with open(csv_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)

if __name__ == '__main__':
    csv_to_json(csv_file_path, json_file_path)
    print(f'Successfully converted {csv_file_path} to {json_file_path}')
