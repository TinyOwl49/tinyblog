---
title: "バーニングシップ・フラクタルをPythonで描画する"
slug: "burningship-fractal"
date: "2025/07/18"
author: tinyowl
description: "バーニングシップ・フラクタルをMatplotlibで表示して鑑賞します。"
thumbnail: "/imgs/burning_fractal/1.png"
tag: "programming"
---


## バーニングシップ・フラクタルとは
? 定義
以下の複素数平面上での漸化式を繰り返して、値が収束するか発散するかを調べます。  
$$ z_{n+1} = \left( |Re(z_n)| + i|Im(z_n)| \right)^2 + c $$  
ただし、$z_0 = 0$
?  
マンデルブロ集合との違いは、2乗のなかに絶対値があることです。  

### Pythonコード
```py
import numpy as np
import pylab as pl
from timeit import default_timer as timer
from numba import njit, prange
import math


@njit("float32[:](float32)", inline="always")
def get_color(alpha):
    shift = 0.0
    color = np.empty((3,), np.float32)
    color[0] = np.cos((alpha * 2.0 - 1.0 + shift) * np.pi) + 1.0
    color[1] = np.cos((alpha * 2.0 - 0.75 + shift) * np.pi) + 1.0
    color[2] = np.cos((alpha * 2.0 - 0.5 + shift) * np.pi) + 1.0

    return (color * (0.5 * 255)).astype(np.float32)


@njit("(float64, float64, float64, float64)")
def mandelbrot(cx, cy, max_iters, bailout):
    zx, zy, radius2 = 0.0, 0.0, 0.0
    iteration = 0
    while iteration < max_iters and radius2 <= bailout:
        zx, zy = zx * zx - zy * zy + cx, -abs(2 * zx * zy) + cy
        radius2 = zx * zx + zy * zy
        iteration += 1
    return iteration, radius2


@njit(
    "void(uint8[:,:,:], float64, float64, float64, int64, float64, float64, int64)",
    parallel=True,
)
def draw_image(
    image, start_x, start_y, pixel_size, max_iters, bailout, density, sampling=1
):
    LOG2 = math.log(2)
    sample_factor = pixel_size / sampling
    height, width = image.shape[0], image.shape[1]
    for y in prange(height):
        imag = start_y + y * pixel_size
        for x in range(width):
            real = start_x + x * pixel_size

            red, green, blue = 0.0, 0.0, 0.0
            tmp_color = np.zeros((3,), np.float32)
            for s in range(sampling * sampling):
                real_offset = sample_factor * (s % sampling)
                imag_offset = sample_factor * (s // sampling)
                cy = imag + imag_offset
                cx = real + real_offset

                iteration, radius2 = mandelbrot(cx, cy, max_iters, bailout)

                outside = iteration < max_iters
                if outside:
                    # smoothing
                    log_zn = math.log(radius2) / 2
                    nu = math.log(log_zn / LOG2) / LOG2
                    alpha = iteration + 1 - nu

                    alpha *= 0.05 * density
                    alpha = math.log(alpha + 1)

                    tmp_color += get_color(alpha)
            color_coef = 1 / (sampling * sampling)
            image[height - 1 - y, x] = tmp_color * color_coef
    return


def draw(
    width,
    height,
    center_real,
    center_imag,
    magnification,
    max_iters,
    bailout,
    sampling=1,
):
    pixel_size = 4 / magnification / width
    start_x, start_y = (
        center_real - pixel_size * width / 2,
        center_imag - pixel_size * height / 2,
    )
    image = np.zeros((height, width, 3), dtype=np.uint8)

    start = timer()
    draw_image(
        image, start_x, start_y, pixel_size, max_iters, bailout, 0.35, sampling=sampling
    )
    duration = timer() - start
    return image, duration


# dummy call for JIT
# image, duration = draw(16,16,0.0,0.0,1.0,100,sampling=2)
# print(f"JIT compiling in {duration:.5f} sec.")

width, height = 2560, 1920
# center_real, center_imag = -1.75, 0.03
# magnification = 30
# center_real, center_imag = -0.3, 0.4
# magnification = 1.0

center_real, center_imag = -1.09296, 0.59039
magnification = 150

max_iters = 200
sampling = 2
bailout = 100.0

pixel_size = 4 / magnification / width

extent = (
    center_real - pixel_size * width / 2,
    center_real + pixel_size * width / 2,
    center_imag - pixel_size * height / 2,
    center_imag + pixel_size * height / 2,
)

# draw
image, duration = draw(
    width,
    height,
    center_real,
    center_imag,
    magnification,
    max_iters,
    bailout,
    sampling=sampling,
)
print(f"{width}x{height} pixels / {sampling}x{sampling} sampling / {duration:.3f} sec.")

pl.figure(dpi=200)
pl.imshow(image, extent=extent)
pl.axis("off")
pl.show()
from PIL import Image

Image.fromarray(image).save(f"imgs/burning_ship.png")
print("image was saved.")
```


### 画像
![バーニングシップ・フラクタル1](${base}/imgs/burning_fractal/1.png) 
![バーニングシップ・フラクタル2](${base}/imgs/burning_fractal/2.png)
![バーニングシップ・フラクタル3](${base}/imgs/burning_fractal/3.png)
![バーニングシップ・フラクタル4](${base}/imgs/burning_fractal/4.png)
![バーニングシップ・フラクタル5](${base}/imgs/burning_fractal/5.png)
![バーニングシップ・フラクタル6](${base}/imgs/burning_fractal/6.png)


### 参考
[Wikipedia バーニングシップ・フラクタル](https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%82%B7%E3%83%83%E3%83%97%E3%83%BB%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB)  
[Pythonでマンデルブロ集合を美しく描画する(基礎編)](https://qiita.com/T-STAR/items/91e1975b19d2d4e6d0dc)
