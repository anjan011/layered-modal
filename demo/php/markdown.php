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
        $markdown .= "| Option Name | Type | Default Value | Description |\n";
        $markdown .= "|------------|------|--------------|-------------|\n";

        // Generate Table Rows
        foreach ($data as $option => $details) {
            $type = $details['type'] ?? 'unknown';
            $default = json_encode($details['default'] ?? 'N/A', JSON_UNESCAPED_SLASHES);
            $description = $details['description'] ?? 'No description provided.';

            $markdown .= "| **`$option`** | `$type` | `$default` | $description |\n";
        }

        return $markdown;
    }

// Example Usage
    $jsonString = file_get_contents('manager-options.json'); // Assuming the JSON file is stored locally
    echo generateMarkdownTable($jsonString);
