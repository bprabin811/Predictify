import { Scaling, FileCode2, BarChart2, Diamond } from 'lucide-react';

export const FeatureTransformationTools = [
  {
    name: 'Encoding',
    icon: <FileCode2 size={20} />,
    orderIndex: 1,
    methods: [
      {
        method: 'OneHotEncoder',
        description: 'Encodes categorical features as a one-hot numeric array.',
        orderIndex: 1,
        canSkip: 'no',
      },
      {
        method: 'LabelEncoder',
        description: 'Encodes target labels with value between 0 and n_classes-1.',
        orderIndex: 2,
        canSkip: 'yes',
      },
      {
        method: 'OrdinalEncoder',
        description: 'Encodes categorical features as an integer array.',
        orderIndex: 3,
        canSkip: 'yes',
      },
      {
        method: 'BinaryEncoder',
        description: 'Encodes categorical features as a binary array.',
        orderIndex: 4,
        canSkip: 'yes',
      },
    ],
  },
  {
    name: 'Scaling',
    icon: <Scaling size={20} />,
    orderIndex: 2,
    methods: [
      {
        method: 'StandardScaler',
        description: 'Standardizes features by removing the mean and scaling to unit variance.',
        orderIndex: 1,
        canSkip: 'no',
      },
      {
        method: 'MinMaxScaler',
        description: 'Scales features to a given range, usually between 0 and 1.',
        orderIndex: 2,
        canSkip: 'yes',
      },
      {
        method: 'MaxAbsScaler',
        description: 'Scales each feature by its maximum absolute value.',
        orderIndex: 3,
        canSkip: 'yes',
      },
      {
        method: 'RobustScaler',
        description: 'Scales features using statistics that are robust to outliers.',
        orderIndex: 4,
        canSkip: 'yes',
      },
    ],
  },
  {
    name: 'Binning',
    icon: <BarChart2 size={20} />,
    orderIndex: 3,
    methods: [
      {
        method: 'KBinsDiscretizer',
        description: 'Bin continuous data into intervals.',
        orderIndex: 1,
        canSkip: 'yes',
      },
      {
        method: 'EqualWidthBinning',
        description: 'Binning with equal width intervals.',
        orderIndex: 2,
        canSkip: 'yes',
      },
      {
        method: 'EqualFrequencyBinning',
        description: 'Binning with equal frequency of samples.',
        orderIndex: 3,
        canSkip: 'yes',
      },
    ],
  },
  {
    name: 'PolynomialFeatures',
    icon: <Diamond size={20} />,
    orderIndex: 4,
    methods: [
      {
        method: 'Degree2',
        description:
          'Generate a new feature matrix consisting of all polynomial combinations of the features with degree 2.',
        orderIndex: 1,
        canSkip: 'yes',
      },
      {
        method: 'Degree3',
        description:
          'Generate a new feature matrix consisting of all polynomial combinations of the features with degree 3.',
        orderIndex: 2,
        canSkip: 'yes',
      },
    ],
  },
  {
    name: 'InteractionFeatures',
    icon: <Diamond size={20} />,
    orderIndex: 5,
    methods: [
      {
        method: 'InteractionOnly',
        description: 'Generate interaction features without polynomial terms.',
        orderIndex: 1,
        canSkip: 'yes',
      },
      {
        method: 'IncludeBias',
        description: 'Include a bias column in the generated features.',
        orderIndex: 2,
        canSkip: 'yes',
      },
    ],
  },
];
