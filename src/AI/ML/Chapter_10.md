---
author: false
title: 降维和度量学习
mathjax: true
order: 10
date: 2026-01-08
category:
    - 人工智能
    - 机器学习
---

:::warning TODO
流形学习、度量学习
:::

## k近邻学习 kNN

给定测试样本后，基于某种距离度量在训练集中找出 k 个最近的训练样本，通过这 k 个样本来预测测试样本

在分类问题中，通常使用**投票法**，即出现最多的类别标记为预测结果；回归问题则使用**平均法**，即 k 个样本输出的加权平均值作为预测结果

属于**懒惰学习**机制：训练阶段仅仅保存样本，训练时间开销为零，在测试时才进行处理；训练阶段进行样本学习处理的称为**急切学习**

### 最近邻分类器 1NN

该分类器出错的情况为：测试样本的类别与其最近邻样本的类别不同，从而可得以下概率表示：

$$
P(err) = 1 - \sum_{c \in y} P(c | x) P(c | z)
$$

其中 $x$ 为测试样本，$z$ 为最近邻样本，$y$ 为所有类别集合，上式表达的含义为：1 减去测试样本和最近邻样本类别相同的概率，即为预测错误概率

将其错误率与贝叶斯最优分类器的错误率进行比较：

令贝叶斯最优分类器的结果为 (根据后验概率选择最有可能的类别)：

$$
c^* = \mathop{\arg \max}_{c \in y} P(c | x)
$$

由于 $x$ 与 $z$ 互为最近邻，从而有：

$$
P(c | x) \approx P(c | z)
$$

可得：

$$
P(err) \approx 1 - \sum_{c \in y}P^2(c | x)
$$

由于 $\sum_{c \in y}P^2(c | x)$ 中所有项非负且 $P^2(c^* | x)$ 是其中的一项，从而有：

$$
\begin{align}
    P(err) &\leq 1 - P^2(c^* | x) \\
    &= (1 + P(c^* | x))(1 - P(c^* | x)) \\
    &\leq 2 \times (1 - P(c^* | x))
\end{align}
$$

即最近邻分类器的泛化错误率不超过贝叶斯最优分类器的**两倍**，但这一结论的前提是训练集数据点较为密集，若训练集维度过高，数据点较为分散时，最近邻分类器的正确率就会受到影响，由此引出了后续的降维操作

## 低维嵌入

**维度灾难**：样本稀疏而特征维数极高

**降维**：虽然收集到的样本可能具有很高的维度，但部分维度的信息可能与学习任务无关，即相关的信息可能仅是一个低维“嵌入” (embedding)，因此，可以通过降维的手段提取其中重要的特征，常见的方法有：MDS、线性降维（将样本矩阵乘一个低维的线性矩阵进行变换）

## 主成分分析 PCA

一种线性降维方法，选择合适的特征维度，保证低维子空间对样本具有最大的可分性

样本点 $x_i$ 在新空间中超平面上的投影是 $z_i = W^T x_i$

设原数据的维度为：$d$，要映射到的维度为 $d'$，则 $W$ 的形状为 $(d, d')$

其中 $W$ 的每一列可视为新的坐标轴在原坐标系下的坐标表示，由此得到的 $z_i$ 即为一个样本点在新坐标系下的表示

PCA 要求降维后每维特征尽可能分散 (样本在每一轴上都尽可能分散) 即要求映射后得到的矩阵 $Z$ 各行的方差最大 ($Z$ 的每列表示一个样本点，每行表示一个特征)，由此，我们需要根据这一要求进行优化，找到最佳的映射矩阵 $W$

映射后的矩阵中各行的方差之和为：

$$
\sum_{i = 1}^{d^{'}}(Z_{i\cdot} - \bar{z}_i)(Z_{i\cdot} - \bar{z}_i)^T = \frac{1}{m}\sum_{i = 1}^{d^{'}}Z_{i\cdot}Z_{i\cdot}^T = \frac{1}{m}\mathop{tr}(ZZ^T)
$$

:::info 中心化
由于应用 PCA 的数据需要进行中心化，所以上式中的 $\bar{z}_i$ 均为 0
:::

同时，矩阵每行的平方和等于矩阵平方的迹，由此完成最后一步变换

从而可得优化目标为：

$$
\begin{align}
    \max_W \; & \mathop{tr}(W^T X X^T W) \\
    \text{s.t.} \; & W^T W = I
\end{align}
$$

对于上述受限的优化问题，使用拉格朗日乘子法来计算

由于拉格朗日只能求解最小化目标，因此将优化目标变换为：

$$
\begin{align}
    \min_W \; & -\mathop{tr}(W^T X X^T W) \\
    \text{s.t.} \; & W^T W = I
\end{align}
$$

可得拉格朗日函数：

$$
L(W, \Lambda) = -\mathop{tr}(W^T X X^T W) + (W^T W - I)\Lambda
$$

其中的 $\Lambda$ 为对角矩阵 (原因较为复杂，此处忽略)

接下来，对 $W$ 求偏导

$$
\begin{align}
    \frac{\partial L(W, \Lambda)}{\partial W} &= - \frac{\partial \mathop{tr}(W^T X X^T W)}{\partial W} + \frac{\partial (W^T W - I)}{\partial W}\Lambda \\
    &= -X X^T W - (X X^T)^T W + 2W\Lambda \\
    &= -2X X^T W + 2W \Lambda
\end{align}
$$

:::info 矩阵求导
$$
\begin{align}
    \frac{\partial \mathop{tr}(A)}{\partial W} &= \frac{\partial A}{\partial W} \\
    \frac{\partial W^T A}{\partial W} &= A \\
    \frac{\partial A W}{\partial W} &= A^T
\end{align}
$$
:::

其中 $\Lambda$ 为 $(d', d')$ 的对角矩阵，因此可以将其拆开，得到：

$$
X X^T w_i = \lambda_i w_i ,\; 1 \leq i \leq d'
$$

其中的 $w_i$ 为 $W$ 矩阵的第 i 列

由此转化为求矩阵 $X X^T \in R^{d \times d}$ 的特征值和特征向量的形式

$X X^T \in R^{d \times d}$ 有 $d$ 个特征向量，但是我们只需要其中的 $d'$ 个，如何选择特征向量：

让我们回顾一下优化目标：

$$
\begin{align}
    \max_W \; & \mathop{tr}(W^T X X^T W) \\
    \text{s.t.} \; & W^T W = I
\end{align}
$$

结合拉格朗日乘子法得到的式子：

$$
X X^T w_i = \lambda_i w_i
$$

对其同时左乘 $W^T$，有：

$$
W^T X X^T W = W^T W \Lambda = \Lambda
$$

从而转变优化目标为：

$$
\max_W \; \mathop{tr}(W^T X X^T W) = \max_W \; \mathop{tr}(\Lambda) = \max \; \sum_{i = 1}^{d'}\lambda_i
$$

即选择最大的 $d'$ 个特征值，以及它们对应的特征向量 $w_i$ 组成映射矩阵 $W$

PCA 的整体求解步骤如下：

1. 计算均值向量 $\mu$

    $$
    \mu = \frac{1}{n}\sum_{i = 1}^{n} Xi
    $$

2. 对所有数据点进行去中心化 (减去均值向量)

3. 计算协方差矩阵

    可通过协方差矩阵公式：

    $$
    \Sigma = \frac{1}{n}\sum(X_i - \mu)(X_i - \mu)^T
    $$

    也可对去中心化后的数据构造样本矩阵：

    各数据点以列向量形式表示，并通过 horizonal stack 形式堆叠，即：

    $$
    \begin{bmatrix}
        x_1 & x_2 & ... & x_n
    \end{bmatrix}
    $$

    将该矩阵与其转置相乘后，每个量乘 $\frac{1}{n}$，得到的矩阵即为协方差矩阵

4. 计算特征值和特征向量

    解如下方程计算特征值：

    $$
    | \Sigma - \lambda I| = 0
    $$

    解得的 $\lambda$ 即为特征值，按从大到小排序

    将 $\lambda$ 代入求解其对应的特征向量：

    $$
    (\Sigma - \lambda I) \mathbf{v} = 0
    $$

    解得的 $\mathbf{v}$ 即为该特征值对应的特征向量 (可能需要归一化成单位向量)

5. 求解新坐标系映射

    对于原始数据点，在去中心化后，乘以相应的坐标轴 (即上文中的特征向量) 对应的单位向量，即为该数据点在该坐标轴上的坐标

    注意：坐标轴的先后顺序由其对应的特征值按照从大到小的顺序排列

:::info 方差解释率
该成分的特征值占所有特征值之和的比例

如求解第一主成分的方差解释率：

$$
\text{Ratio}_1 = \frac{\lambda_1}{\sum \lambda}
$$
:::