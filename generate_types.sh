#!/bin/bash

# Папка с исходными файлами
SRC_DIR="./src"

# Папка для выходных .d.ts файлов
OUTPUT_DIR="./@types"

# Создаем папку для выходных файлов
mkdir -p "$OUTPUT_DIR"

# Проходим по всем модулям в папке src
for file in $(find "$SRC_DIR" -name "*.js"); do
  # Имя файла без расширения
  module_name=$(basename "$file" .js)

  # Генерируем .d.ts файл
  dts-gen -m "$module_name" -o "$OUTPUT_DIR/$module_name.d.ts"
done