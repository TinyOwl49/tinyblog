---
title: "平面波をMatplotlibで描画する"
slug: "plane-wave"
date: "2025/07/01"
author: tinyowl
description: "Matplotlibを使って平面波を描画する方法のメモです。"
thumbnail: "/thumbnails/plane_wave.jpg"
tag: "programming, math, memo"
---
? 平面波の数式
位置$\textbf{r}$における進行方向$\textbf{k}$の平面波の振幅$z$は、以下の式で表されます。  
$$ z = \cos \left( \textbf{k} \cdot \textbf{r} - \omega t \right) $$
?
### Pythonコード
```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation

x = np.arange(start=-20, stop=26, step=0.5)
y = np.arange(start=-20, stop=21, step=0.5)

X, Y = np.meshgrid(x, y)
fig, ax = plt.subplots(
    figsize=(7, 7), facecolor="white", subplot_kw={"projection": "3d"}
)


t = 0.0
k = np.array([0.3, 0.5])
omg = 1.0

dt = X * k[0] + Y * k[1]
def plot(data):
    global t
    plt.cla()

    ax.set_zlim(-5, 5)
    Z = np.cos(dt - omg*t)
    t += 0.1
    ax.plot_wireframe(X, Y, Z)

ani = FuncAnimation(fig, plot, interval=10)
plt.show()
```

![平面波のアニメーション](${base}/imgs/plane_wave.gif)
