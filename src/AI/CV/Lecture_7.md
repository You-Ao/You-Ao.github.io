---
author: false
title: 运动恢复结构
mathjax: true
order: 6
date: 2025-11-03
category:
    - 人工智能
    - 计算机视觉
---

:::warning 未完成
:::

## Structure from motion (运动恢复结构)

### 概念

Recover **camera poses** and **3D structure** of a scene from its images

### 重点问题

1. 相机如何将三维世界中的点映射到其成像平面上 (camera model)

2. 如何计算相机相对于世界坐标系的位置和方向 (camera calibration and pose estimation)

3. 如何从图像重建未知的三维结构 (structure from motion)

## Image Formation (成像)

相机的成像过程包含三个步骤：

1. Coordinate transformation: 将三维空间中的点坐标从世界坐标系转化到相机坐标系

2. Perspective projection: 透视投影，将3D空间中的点映射到像平面上 (三维坐标转化为二维坐标)

3. Image Plane to Image Sensor Mapping: 将投影后的点映射到图像传感器上 (二维坐标转化为像素坐标)

其中步骤 1 对应的变换矩阵成为外参矩阵 (Extrinsic Matrix)，它与相机本身性质无关，仅与相机在世界坐标系中的位置有关；步骤 2, 3 对应的变换矩阵成为内参矩阵 (Intrinsic Matrix)，它与相机本身的性质有关，与相机在世界坐标系中的位置无关

### Coordinate transformation (坐标转换)

![](pic/Lecture_7/Coordinate_Transformation.png)

$$
x_w = \begin{bmatrix}
    x_w \\
    y_w \\
    z_w
\end{bmatrix}
\rightarrow
x_c = \begin{bmatrix}
    x_c \\
    y_c \\
    z_c
\end{bmatrix}
$$