## 项目介绍

本项目是基于 React Native 实现，核心功能为「Booking 数据管理」与「列表展示」，严格遵循要求完成数据缓存、时效处理、刷新机制、错误处理等核心需求。

## 功能清单

### 1. 数据管理核心功能

- 服务层：基于 Mock 数据模拟接口请求，支持动态数据变化（便于验证更新逻辑）
- 缓存层：封装 AsyncStorage 实现本地数据持久化，支持缓存增删查
- 时效处理：基于 `expiryTime` 字段校验数据有效性，过期自动请求新数据
- 刷新机制：支持手动刷新，清除旧缓存并请求最新数据
- 数据合并：新数据与旧缓存合并
- 错误处理：覆盖网络错误、缓存错误、无数据等场景

### 2. 页面功能

- 行程列表页（BookingListScreen）：展示行程数据，支持：
  - 每次页面出现自动加载数据
  - 手动刷新数据（触发新请求 + 数据合并）
  - 查看本地缓存数据
  - 数据加载状态
  - 控制台打印请求状态、请求结果、数据等信息反馈

## 项目介绍

```plaintext
bare/
├── src/
│   ├── managers/        # 数据管理
│   ├── navigation/      # 导航配置
│   ├── screens/         # 页面组件
│   ├── services/        # Mock数据请求
│   ├── storage/         # 本地缓存
│   ├── types/           # TS 类型定义（Booking 相关接口）
│   └── utils/           # 工具函数（错误处理、时间校验、数据合并）
├── App.tsx              # 项目入口组件
├── index.js             # RN 原生入口文件
├── tsconfig.json        # TS 配置文件
└── package.json         # 依赖配置
```

## 快速启动

### 1. 环境准备

确保已安装 RN 开发所需基础环境（Node.js、Android Studio/iOS Xcode、模拟器 / 真机），参考 [RN 官方文档](https://reactnative.dev/docs/environment-setup)。

### 2. 项目安装与运行

```bash
# 克隆仓库
git clone https://github.com/lyichao/bare-react-native.git
cd bare-react-native

# 安装依赖
npm install

# iOS 端额外执行（安装原生依赖）
cd ios && pod install && cd ..

# 运行项目（Android）
npx react-native run-android

# 运行项目（iOS）
npx react-native run-ios
```
