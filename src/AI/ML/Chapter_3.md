---
author: false
title: 线性模型
mathjax: true
order: 3
date: 2025-10-20
category:
    - 人工智能
    - 机器学习
---

:::warning 未完成
:::

## 基本形式

给定由 d 个属性描述的示例 $\mathbf{x} = (x_1, x_2, ..., x_d)$，其中 $x_i$ 是 $\mathbf{x}$ 在第 i 个属性上的取值，线形模型试图学得一个通过属性的线形组合来进行预测的函数：

$$
f(\mathbf{x}) = w_1x_1 + w_2x_2 + ... + w_dx_d + b
$$

可写为向量形式：

$$
f(\mathbf{x}) = \mathbf{w}^T\mathbf{x} + b
$$

其中学习的对象为 $\mathbf{w}$ 和 $b$

## 线性回归

对于给定的数据集 $D = {(\mathbf{x}_1, y_1), (\mathbf{x}_2, y_2), ..., (\mathbf{x}_m, y_m)}$，其中 $\mathbf{x} = \{x_{i1}, x_{i2}, ..., x_{id}\}$, $y_i \in \mathbb{R}$ （表示数据集中有 m 组数据，每组数据中包含 d 个属性）线性回归试图学得一个线性模型以尽可能准确地预测实值输出标记（即 $y$）

### 一元线性回归

即输入属性只有一个，上述定义的数据集可表示为：$D = \{(x_i, y_i)\}_{i = 1}^m$，其中 $x_i \in \mathbb{R}$，线性回归试图学得：
$$
f(x_i) = wx_i + b
$$

#### 离散属性转化

若离散属性值之间存在“序“的关系，可通过连续化将其转化为连续值，如“高度”取值中的“高”“中”和“低”，可转化为 $\{1.0, 0.5, 0.0\}$

若属性值之间不存在“序”关系，则将 $k$ 个属性值转化为 $k$ 维向量，如”瓜类“中的“西瓜”“南瓜”“黄瓜”可转化为 $(0, 0, 1), (0, 1, 0), (1, 0, 0)$

#### 均方误差和最小二乘法

我们使用均方误差来衡量预测值 $f(x)$ 和实际值 $y$ 的差异，并通过最小二乘法实现均方误差最小化来求解线性模型参数 $w$ 和 $b$

$$
\begin{align}
    (w^*, b^*) &= \underset{(w, b)}{argmin} \sum_{i = 1}^m (f(x_i) - y_i)^2 \\
     &= \underset{(w, b)}{argmin} \sum_{i = 1}^m (y_i - wx_i - b)^2
\end{align}
$$

:::info
均方误差对应欧几里得距离，因此线性回归中的最小二乘法就是试图找到一条直线，使所有样本到直线上的欧氏距离之和最小
:::

:::info 最小二乘参数估计
$$
E_{(w, b)} = \sum_{i = 1}^m (y_i - wx_i - b)^2
$$
求解 $E_{(w, b)}$ 最小化的过程，称为线性回归模型的最小二乘“参数估计”
:::

将 $E_{(w, b)}$ 分别对$w$ 和 $b$ 求偏导，并令其等于 0，可求得最小二乘参数的闭式解：

$$
\begin{align}
    \frac{\partial{E_{(w, b)}}}{\partial{w}} &= 2(w \sum_{i =1}^mx_i^2 - \sum_{i = 1}^m(y_i - b)x_i) \\
    \frac{\partial{E_{(w, b)}}}{\partial{b}} &= 2(mb - \sum_{i = 1}^m(y_i - wx_i))
\end{align}
$$

最终可得：

$$
\begin{align}
    w &= \frac{\sum_{i = 1}^m y_i(x_i - \bar{x})}{\sum_{i = 1}^m x_i^2 - \frac{1}{m}(\sum_{i = 1}^m x_i)^2} \\
    b &= \frac{1}{m}\sum_{i = 1}^m(y_i - wx_i)
\end{align}
$$