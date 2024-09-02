from cerberus import Validator

def validate_section_schema(part, articles):
    schema = {
        'Part': {
            'type': 'dict',
            'schema': {
                'part_number': {'type': 'string'},
                'part_title': {'type': 'string'}
            }
        },
        'Articles': {
            'type': 'list',
            'schema': {
                'type': 'dict',
                'schema': {
                    'article_number': {'type': 'string'},
                    'article_title': {'type': 'string'}
                }
            }
        }
    }

    section_document = {
        "Part": {
            "part_number": part['part_number'],
            "part_title": part['part_title']
        },
        "Articles": [
            {"article_number": article['article_number'], "article_title": article['article_title']}
            for article in articles
        ]
    }

    v = Validator(schema)
    if v.validate(section_document):
        return True
    else:
        return v.errors
