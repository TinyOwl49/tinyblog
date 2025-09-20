#!/bin/bash

file="$1"
name="$2"

if [ -f "$file" ]; then
	# -resize 64x64 は、アスペクト比を維持しながら64x64ピクセル内に収まるようにリサイズ
	# -strip は、メタデータ（EXIF情報など）を削除してファイルサイズを小さくする
	# -quality 85 は、画質を設定（0-100）
	magick "$file" -resize 128x128 -strip -quality 85 "static/thumbnails/${name}.jpg"
	echo "Created thumbnail for $file"
	echo "thumbnail: \"/thumbnails/${name}.jpg\""
fi

echo "Done!"
