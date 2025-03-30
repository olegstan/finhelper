@echo off
setlocal enabledelayedexpansion

set SRC_DIR=dist
set OUTPUT_DIR=@types

:: Создание папки для выходных файлов
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

:: Переходим в каталог dist
pushd "%SRC_DIR%"

for /r %%f in (*.js) do (
    :: %%f - абсолютный путь к файлу, например D:\xampp64\htdocs\finhelper\dist\sub\file.js
    set "FILE_ABS=%%f"

    :: Получаем относительный путь к файлу от dist, убрав общий префикс %CD%\\
    :: Пример: sub\file.js
    set "FILE_REL=!FILE_ABS:%CD%\\=!"

    :: Извлекаем относительный путь к директории (без имени файла) так же, убирая %CD%\\
    :: Пример: sub\
    set "DIR_ABS=%%~dpf"
    set "DIR_REL=!DIR_ABS:%CD%\\=!"

    :: Создаём подпапку внутри @types, если нужно
    if not exist "..\\%OUTPUT_DIR%!DIR_REL!" (
        mkdir "..\\%OUTPUT_DIR%!DIR_REL!"
    )

    :: Приводим путь к Unix-формату (прямые слеши) для dts-gen
    set "FILE_PATH_FIXED=!FILE_REL:\\=/!"

    echo Generating .d.ts for !FILE_PATH_FIXED!...

    :: Генерируем .d.ts (заменяя .js на .d.ts)
    pushd ..
    dts-gen -e "require('./%SRC_DIR%/!FILE_PATH_FIXED!')" ^
            -f "%OUTPUT_DIR%/!FILE_REL:.js=.d.ts" ^
            || echo Failed to generate for %%~nf
    popd
)

popd

echo All .d.ts files have been generated.
pause
