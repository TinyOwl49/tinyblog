---
title: "ローレンツアトラクタの動きをPythonで観察する。"
slug: "lorenz-attractor"
date: "2025/07/18"
author: tinyowl
description: "ローレンツアトラクタがどのように動いていくか見たいです。"
thumbnail: "/imgs/lorenz-attractor/1.png"
tag: "programming"
---

## ローレンツアトラクタとは
? ローレンツ方程式
3変数の非線形微分方程式
$$ \frac{dx}{dt} = p(y-x) $$ 
$$\frac{dy}{dt} = -xz + rx - y $$
$$\frac{dz}{dt} = xy - bz $$ 
を**ローレンツ方程式**と呼ぶ。
?

この方程式を満たすような点の時間発展を追うと、
ローレンツアトラクタと呼ばれるカオスな振る舞いを見ることができます。  
...TODO...

### Pythonコード
```py
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Line3DCollection
from matplotlib import colors
import matplotlib.animation as animation


def lorenz(x, y, z, s=10, r=28, b=8 / 3):
    dot_x = s * (y - x)
    dot_y = r * x - y - x * z
    dot_z = x * y - b * z
    return dot_x, dot_y, dot_z


dt = 0.01
# アニメーションの場合、5000ステップ以上だとかなり時間がかかります。
n_steps = 10000

xs = np.empty(n_steps + 1, dtype="float64")
ys = np.empty(n_steps + 1, dtype="float64")
zs = np.empty(n_steps + 1, dtype="float64")

xs[0], ys[0], zs[0] = (0.0, 1.0, 1.05)

for i in range(n_steps):
    dot_x, dot_y, dot_z = lorenz(xs[i], ys[i], zs[i])
    xs[i + 1] = xs[i] + (dot_x * dt)
    ys[i + 1] = ys[i] + (dot_y * dt)
    zs[i + 1] = zs[i] + (dot_z * dt)

cm = plt.get_cmap('RdYlBu')

points = np.array([xs, ys, zs]).T.reshape(-1, 1, 3)
segments = np.concatenate([points[:-1], points[1:]], axis=1)

# 2. 各線分の色を計算
cmap = plt.cm.viridis
normalize = colors.Normalize(vmin=0, vmax=n_steps)
segment_colors = [cmap(normalize(i)) for i in range(n_steps)]

fig = plt.figure(figsize=(7, 7))
ax = fig.add_subplot(projection='3d')
ax.set_title("Lorenz Attractor")
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
ax.set_xlim(xs.min(), xs.max())
ax.set_ylim(ys.min(), ys.max())
ax.set_zlim(zs.min(), zs.max())

line_collection = Line3DCollection([], colors=segment_colors, lw=0.5)
ax.add_collection(line_collection)

def update(i):
    line_collection.set_segments(segments[:i+1])
    return line_collection,


# --- アニメーションをmp4にして保存 ---
# ani = animation.FuncAnimation(fig, update, frames=n_steps, interval=8, blit=True)
# 時間がかかるので注意
# ani.save('anim_gradient.mp4', writer="ffmpeg", dpi=150)

# 出てきた画像をffmpegを使用して60FPSに変換するコマンドです。
# ffmpeg -i ./anim_gradient.mp4 -filter:v fps=60 output.mp4


# --- ローレンツアトラクタを表示 ---
for i in range(n_steps):
    update(i)

plt.show()
```

### 画像

![ローレンツアトラクタgif](${base}/imgs/lorenz-attractor/output.gif)  
![ローレンツアトラクタ1](${base}/imgs/lorenz-attractor/1.png)
![ローレンツアトラクタ1](${base}/imgs/lorenz-attractor/2.png)

### 参考
[Python】ローレンツ方程式を実装して可視化する](https://disassemble-channel.com/python-lorentz-equation/)  
[カオスとデータ同化の数理](https://termoshtt.gitlab.io/chaos-da-book/about.html)  
ストロガッツ, 非線形ダイナミクスとカオス
