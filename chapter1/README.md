## 第一章

### 问题描述

尽可能小的使用内存(1MB左右)，对7位不重复电话号码进行排序。



### 其他测试

#### bitArray VS Array.sort()

**结论：**`bitArray`相对较快且数量越多差距越明显

100,000个6位数
```
bit-array x 84.83 ops/sec ±3.71% (63 runs sampled)
Array.sort x 42.53 ops/sec ±1.70% (53 runs sampled)
```

1,000,000个7位数
```
bit-array x 9.13 ops/sec ±2.84% (26 runs sampled)
Array.sort x 3.54 ops/sec ±0.96% (13 runs sampled)
```

10,000,000个8位数
```
bit-array x 0.88 ops/sec ±4.92% (7 runs sampled)
Array.sort x 0.14 ops/sec ±0.34% (5 runs sampled)
```