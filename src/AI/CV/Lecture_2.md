---
author: false
title: 线性代数与图像信息
mathjax: true
order: 1
date: 2025-09-22
category:
    - 人工智能
    - 计算机视觉
---

:::warning 未完成
:::

## 线性代数 Linear Algebra

### 线性变换的几何意义

- Scale (缩放)

![scale transform](pic/Lecture_2/scale.png)

对于图中的变换，有：

$$
\begin{align}
    x' = sx \\
    y' = sy
\end{align}
$$

写为矩阵形式：

$$
\begin{bmatrix}
    x' \\
    y'
\end{bmatrix}
 = 
\begin{bmatrix}
    s & 0 \\
    0 & s
\end{bmatrix}
\begin{bmatrix}
    x \\
    y
\end{bmatrix}
$$

- Reflection (镜像)

![](./pic/Lecture_2/reflection.png)

对于水平镜像：

$$
x' = -x
$$

$$
y' = y
$$

转换为矩阵形式：

$$
\begin{bmatrix}
    x' \\
    y'
\end{bmatrix} = 
\begin{bmatrix}
    -1 & 0 \\
    0 & 1
\end{bmatrix}
\begin{bmatrix}
    x \\
    y
\end{bmatrix}
$$

- Shear (剪切)

![](./pic/Lecture_2/shear.png)

矩阵表示：

$$
\begin{bmatrix}
    x' \\
    y'
\end{bmatrix} = 
\begin{bmatrix}
    1 & a \\
    0 & 1
\end{bmatrix}
\begin{bmatrix}
    x \\
    y
\end{bmatrix}
$$

- Rotation (旋转)

![rotation transform](pic/Lecture_2/rotation.png)

这一变换的矩阵表示为：

$$
R_{\theta} = 
\begin{bmatrix}
    \cos \theta & -\sin \theta \\
    \sin \theta & \cos \theta
\end{bmatrix}
$$

上述矩阵中的每一列可以看作原空间的基变换后的结果

即变换后的基为：$(\cos \theta, \sin \theta), (-\sin \theta, \cos \theta)$

### 仿射变换 Affine Transformation

仿射变换 = 线性变换 + 平移

矩阵表示：

$$
\begin{pmatrix}
    x' \\
    y'
\end{pmatrix} = 
\begin{pmatrix}
    a & b \\
    c & d
\end{pmatrix} · 
\begin{pmatrix}
    x \\
    y
\end{pmatrix} + 
\begin{pmatrix}
    t_{x} \\
    t_{y}
\end{pmatrix}
$$

笛卡尔坐标系下的仿射变换可以转化为齐次坐标系下的线性变换

矩阵表达如下：

$$
\begin{pmatrix}
    x' \\
    y' \\
    1
\end{pmatrix} = 
\begin{pmatrix}
    a & b & t_{x} \\
    c & d & t_{y} \\
    0 & 0 & 1
\end{pmatrix} · 
\begin{pmatrix}
    x \\
    y \\
    1
\end{pmatrix}
$$

:::info 齐次坐标
关于齐次坐标的内容请参考下文[齐次坐标](#齐次坐标-homogeneous-coordinates)
:::

### 逆变换 Inverse Transform

$$
T^{-1}
$$

从矩阵角度和几何角度来看，$T^{-1}$ 是 $T$ 的逆变换

![](./pic/Lecture_2/inverse_transform.png)

## 图像信息 Image Information

### 相机和镜头 Camera and Lens

#### 成像 Image Formation

直接将底片放在物体前无法形成清晰的像，一般来说，只有当图像中的点与物理空间中的点是一一对应的，我们认为这个图像是清晰的

由此，我们引入了 Pinhole Camera Model

##### 小孔相机 Pinhole Camera

![](pic/Lecture_2/pinhole_camera.png)

其中的隔板可以遮挡大部分光线，中间的小孔叫做光圈 (aperture)

![](pic/Lecture_2/shrink_aperture.png)

在一定的范围内缩小光圈，可以使图像更清晰，但光圈过小时，会对图像的清晰度产生负面影响，原因为：

- 进光量减小

- 光的衍射

为了解决小孔相机对进光量的影响，我们引入了透镜

#### 透镜

有着和小孔一样的投影效果，但透镜能够聚集光线

##### 高斯公式

$$
    \frac{1}{i} + \frac{1}{o} = \frac{1}{f}
$$

#### 图像放大率 Image Magnification

$$
Magnification = \frac{h_{i}}{h_{o}} = \frac{i}{o}
$$

根据高斯公式，当 $o \rightarrow \infty$ 时，$f \approx i$，因此焦距越大，图像的放大率越大

#### 视场角 Field of View

在光学仪器中，以光学仪器的镜头为顶点，以被测目标的物像可通过镜头的最大范围的两条边缘构成的夹角，称为视场角

![视场角](pic/Lecture_2/FOV.png)

影响因素：

- 焦距 (focal length)

    焦距越长，视场角越小

    焦距越短，视场角越大

- 传感器大小 (sensor size)

    传感器越大，视场角越大

#### 光圈 Aperture

镜头的通光区域，用镜头的直径来表示，记为`D`

##### F-Number

F 数可以通过如下公式计算：

$$
N = \frac{f}{D}
$$

#### 镜头失焦 Lens Defocus

![](pic/Lecture_2/defocus.png)

根据相似三角形，有：

$$
\frac{b}{D} = \frac{\left|i' - i\right|}{i'}
$$

因此光斑的大小可表示为：

$$
b = \frac{D}{i'}\left|i' - i\right|, b \propto D \propto \frac{1}{N}
$$

因此，减小光圈可以减小失焦形成的光斑大小

#### 调焦 Focusing

可以通过调整像平面(image plane)或镜头的位置来进行调焦

![调焦](pic/Lecture_2/focusing.png)

#### 景深 Depth of Field

由于传感器的分辨率有限，在实际使用中，未必需要将像精准地聚焦到传感器上，只要光斑的直径`b`小于像素点的大小，就可以得到较为清晰的像

![](pic/Lecture_2/DOF.png)

景深与焦距成**反比**，因此在拍摄人像时，可以选择更大的焦距，更容易地获得背景虚化的效果

可以通过如下方式来获得背景虚化的效果：

- Large aperture 更大的光圈

- Long focal length 更大的焦距

- Near foreground 更近的前景

- Far background 更远的背景

::: info 景深公式 (无需记忆)
$$
o_{2} - o_{1} = \frac{2of^{2}cN(o - f)}{f^{4} - c^{2}N^{2}(o - f)^{2}}
$$
:::

### 几何成像 Geometric image formation

相机模型可以看作 3D 空间到 2D 空间到映射

#### 齐次坐标 Homogeneous coordinates

:::info Pin-hole camera model: Perspective Projection
![](pic/Lecture_2/Pin_hole_PP.png)

由此可以得到 
$$
p = \begin{bmatrix}
u \\
v
\end{bmatrix}
 = 
\begin{bmatrix}
\frac{fx}{z} \\
\frac{fy}{z}
\end{bmatrix}
$$

可以看出，在笛卡尔坐标系中，这种投影变换不是线性的

由此引入齐次坐标，将这种投影运算转变为线性运算
:::

笛卡尔坐标转化为齐次坐标

$$
(x, y) \rightarrow \begin{bmatrix}
    x \\
    y \\
    1
\end{bmatrix}
$$

$$
(x, y, z) \rightarrow \begin{bmatrix}
    x \\
    y \\
    z \\
    1
\end{bmatrix}
$$

齐次坐标转化为笛卡尔坐标

$$
\begin{bmatrix}
    x \\
    y \\
    w
\end{bmatrix} = (x/w, y/w)
$$

$$
\begin{bmatrix}
    x \\
    y \\
    z \\
    w
\end{bmatrix} = (x/w, y/w, z/w)
$$

::: warning
齐次坐标是缩放不变的

一个齐次坐标可能对应多个笛卡尔坐标，但它们只有长度上的缩放关系
:::

##### 齐次坐标中的透视投影

在齐次坐标系中，透视投影可通过线形运算表示，公式如下：

::: important 透视投影公式
$$
\begin{bmatrix}
    f & 0 & 0 & 0 \\
    0 & f & 0 & 0 \\
    0 & 0 & 1 & 0 \\
\end{bmatrix}
\begin{bmatrix}
    x \\
    y \\
    z \\
    1
\end{bmatrix}
= 
\begin{bmatrix}
    fx \\
    fy \\
    z
\end{bmatrix}
= 
\begin{bmatrix}
f\frac{x}{z} \\
f\frac{y}{z} \\
1
\end{bmatrix}
$$
:::

上述公式中：$\begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$ 表示物体在齐次坐标系下的坐标，$\begin{bmatrix} fx \\ fy \\ z \end{bmatrix}$ 表示像在齐次坐标系下的坐标，$\begin{bmatrix} f \frac{x}{z} \\ f \frac{y}{z} \\ 1 \end{bmatrix}$ 表示像在笛卡尔坐标系下的坐标

###### 透视投影可视化

可以将像平面等效翻转到镜头前

![](pic/Lecture_2/vpp.png)

#### 透视投影 Perspective Projection

##### 信息损失

经过透视投影后，长度、角度等信息会损失，但线的曲直(直线仍然是直的)等信息仍然得到保留

##### 灭点 Vanishing Point

![](pic/Lecture_2/vanishing_point.png)

空间直线与成像平面不平行时，该直线在成像平面上的投影为收敛于**灭点**的线段

若空间直线垂直于成像平面，则灭点位于像平面中心

若一组平行线平行于成像平面，则它所成的像依旧平行，即灭点位于无穷远处

性质：

- 两条平行线有相同的灭点 `v`

- 相机中心与灭点连成的直线平行于原直线

- 灭点可能在画面外或无限远处

##### 灭线 Vanishing Line

![](pic/Lecture_2/vanishing_line.png)

空间平面与成像平面不平行时，该平面在成像平面上的投影为收敛于灭线的区域，相互平行的空间平面在成像空间收敛于同一条灭线

灭线可以视为多个灭点的集合

##### 透视畸变 Perspective Distortion

由透视投影的性质引起，与镜头无关

带来的现象有：近大远小、平行线在图像中相交等

#### 径向畸变 Radial Distortion

分为：

- 枕形畸变 Pin cushion

- 桶形畸变 Barrel

径向畸变主要由镜头的缺陷引起，光线通过镜头边缘的成像更加明显

短焦镜头更容易发生桶形畸变，长焦镜头更容易发生枕形畸变

#### 正交投影 Orthographic Projection

正交投影可以视为透视投影的特殊情况，当投影中心(COP)到投影(PP)平面的距离无穷大时，透视投影退化为正交投影

正交投影公式：

$$
\begin{bmatrix}
    1 & 0 & 0 & 0 \\
    0 & 1 & 0 & 0 \\
    0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
    x \\
    y \\
    z \\
    1
\end{bmatrix}
=
\begin{bmatrix}
    x \\
    y \\
    1
\end{bmatrix}
\rightarrow
(x, y)
$$

### 光度成像 Photometric Image Formation
