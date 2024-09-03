const data = [
    {
        "partition_number": "Part 5",
        "partition_title": "The Union Government",
        "sub_partitions": [
            {
                "partition_title": "Chapter 1",
                "sub_partitions": [
                    {
                        "partition_title": "General",
                        "sub_partitions": [
                            {
                                "partition_title": "Article - 1"
                            },
                            {
                                "partition_title": "Article - 2"
                            },
                            {
                                "partition_title": "Article - 3"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

function printStructure(item, indent = '') {
    if (item.partition_number) {
        console.log(`${indent}${item.partition_number}: ${item.partition_title}`);
    } else if (item.partition_title) {
        console.log(`${indent}${item.partition_title}`);
    }

    if (item.sub_partitions) {
        item.sub_partitions.forEach(subItem => printStructure(subItem, indent + '  '));
    }
}

data.forEach(partition => printStructure(partition));