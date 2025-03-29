@echo off
:: Настройка путей
set SRC_DIR=src
set OUTPUT_DIR=@types

:: Создание папки для выходных файлов
if not exist "%OUTPUT_DIR%" (
    mkdir "%OUTPUT_DIR%"
)

:: Проходим по всем JS файлам в папке src
for /r "%SRC_DIR%" %%f in (*.js) do (
    :: Извлекаем имя файла без расширения
    set "FILE_PATH=%%f"
    set "FILE_NAME=%%~nf"

    :: Преобразуем путь к файлу, заменяя обратные слеши на прямые
    set "FILE_PATH_FIXED=%%f"
    set "FILE_PATH_FIXED=%FILE_PATH_FIXED:\=/%"

    :: Генерируем .d.ts файл
    echo Generating .d.ts for %%~nf...
    dts-gen -e "require('%FILE_PATH_FIXED%')" -f "%OUTPUT_DIR%/%%~nf.d.ts" || echo Failed to generate for %%~nf
)

echo All .d.ts files have been generated.
pause