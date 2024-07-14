import {
  Dices,
  LineChart,
  LineChartIcon,
  ScatterChart,
  Tent,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export const supervised = [
  {
    key: 'linear_regression',
    name: 'Linear Regression',
    desc: 'Used for predicting continuous values, such as sales forecasting.',
    category: 'Supervised Learning',
    icon: <LineChartIcon />,
  },
  {
    key: 'logistic_regression',
    name: 'Logistic Regression',
    desc: 'Used for binary classification problems, such as churn prediction.',
    category: 'Supervised Learning',
    icon: <LineChart />,
  },
  {
    key: 'decision_trees',
    name: 'Decision Trees',
    desc: 'Used for both classification and regression tasks, such as customer segmentation.',
    category: 'Supervised Learning',
    icon: <TrendingDown />,
  },
  {
    key: 'random_forest',
    name: 'Random Forest',
    desc: 'An ensemble method used for classification and regression, such as risk assessment.',
    category: 'Supervised Learning',
    icon: <Dices />,
  },
  {
    key: 'svm',
    name: 'Support Vector Machines (SVM)',
    desc: 'Used for classification tasks, such as fraud detection.',
    category: 'Supervised Learning',
    icon: <Tent />,
  },
  {
    key: 'knn',
    name: 'K-Nearest Neighbors (KNN)',
    desc: 'Used for both classification and regression, such as recommendation systems.',
    category: 'Supervised Learning',
    icon: <ScatterChart />,
  },
  {
    key: 'gbm',
    name: 'Gradient Boosting Machines (GBM)',
    desc: 'Includes algorithms like XGBoost, LightGBM, and CatBoost, used for classification and regression, such as credit scoring.',
    category: 'Supervised Learning',
    icon: <TrendingUp />,
  },
];

export const unsupervised = [
  {
    key: 'kmeans',
    name: 'K-Means Clustering',
    desc: 'Used for market segmentation and customer segmentation.',
    category: 'Unsupervised Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'hierarchical_clustering',
    name: 'Hierarchical Clustering',
    desc: 'Used for creating customer segments or finding patterns in data.',
    category: 'Unsupervised Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'pca',
    name: 'Principal Component Analysis (PCA)',
    desc: 'Used for dimensionality reduction and feature extraction, such as reducing data complexity.',
    category: 'Unsupervised Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'association_rule_learning',
    name: 'Association Rule Learning',
    desc: 'Includes Apriori and Eclat, used for market basket analysis and recommendation engines.',
    category: 'Unsupervised Learning',
    icon: <TrendingUp />,
  },
];

export const semiSupervised = [
  {
    key: 'label_propagation',
    name: 'Label Propagation',
    desc: 'Used in situations where there is a mix of labeled and unlabeled data, such as text classification with limited labeled examples.',
    category: 'Semi-Supervised Learning',
    icon: <TrendingUp />,
  },
];

export const reinforcement = [
  {
    key: 'q_learning',
    name: 'Q-Learning',
    desc: 'Used for sequential decision-making problems, such as dynamic pricing and inventory management.',
    category: 'Reinforcement Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'dqn',
    name: 'Deep Q-Networks (DQN)',
    desc: 'An extension of Q-learning using deep neural networks.',
    category: 'Reinforcement Learning',
    icon: <TrendingUp />,
  },
];

export const neuralNetworks = [
  {
    key: 'ann',
    name: 'Artificial Neural Networks (ANN)',
    desc: 'Used for a variety of tasks, including classification, regression, and pattern recognition.',
    category: 'Neural Networks and Deep Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'cnn',
    name: 'Convolutional Neural Networks (CNN)',
    desc: 'Primarily used for image-related tasks but can also be used for time series and other data types.',
    category: 'Neural Networks and Deep Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'rnn',
    name: 'Recurrent Neural Networks (RNN)',
    desc: 'Used for sequential data analysis, such as time series forecasting and sentiment analysis.',
    category: 'Neural Networks and Deep Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'lstm',
    name: 'Long Short-Term Memory Networks (LSTM)',
    desc: 'A type of RNN used for longer sequence data, such as financial time series prediction.',
    category: 'Neural Networks and Deep Learning',
    icon: <TrendingUp />,
  },
  {
    key: 'gan',
    name: 'Generative Adversarial Networks (GANs)',
    desc: 'Used for generating synthetic data, such as data augmentation and creating synthetic customer profiles.',
    category: 'Neural Networks and Deep Learning',
    icon: <TrendingUp />,
  },
];
