<?php

    /**
     * @author anjan
     * @date   28/1/25 @ 2:20 AM
     */

    header('Content-Type: text/plain');

    function generateMarkdownTable(string $jsonString): string {
        $data = json_decode($jsonString, true);

        if (!is_array($data)) {
            return "❌ Invalid JSON data provided.\n";
        }

        // Markdown Table Header
        $markdown = "## ⚙️ ModalManager Configuration Options\n\n";
        $markdown .= "The `ModalManager` class allows customization through various options. Below are the available parameters you can set when initializing the manager.\n\n";
        $markdown .= "### **Available Options:**\n\n";
        $markdown .= "| Option Name | Type | Description |\n";
        $markdown .= "|------------|------|-------------|\n";

        // Generate Table Rows
        foreach ($data as $option => $details) {

            $name = $details['name'];

            $type = $details['type'] ?? 'unknown';
            $default = $details['default'] ? "Default: `".json_encode($details['default'], JSON_UNESCAPED_SLASHES)."`" : '';
            $description = ($details['description']) ?? 'No description provided.';

            $type = str_ireplace('|',"\|",$type);

            $markdown .= "| **`$name`** | `$type` | $description $default |\n";
        }

        return $markdown;
    }

    $json_path = $_SERVER['DOCUMENT_ROOT'].'/docs/manager-options.json';

    if(!file_exists($json_path)) {
        exit("File not found: $json_path");
    }

// Example Usage
    $jsonString = file_get_contents($json_path); // Assuming the JSON file is stored locally
    echo generateMarkdownTable($jsonString);
