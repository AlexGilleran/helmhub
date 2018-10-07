export type ChartYaml = {
  apiVersion: string;
  name: string;
  version: string;
  kubeVersion?: string;
  description?: string;
  keywords?: string[];
  home?: string;
  sources?: string;
  maintainers?: {
    name: string;
    email: string;
    url: string;
  }[];
  engine?: string;
  icon?: string;
  appVersion?: string;
  deprecated?: boolean;
  tillerVersion?: string;
};

export type ChartMetadata = {
  chartYaml: ChartYaml;
  readme?: string;
  gsFilePath?: string;
  urls: string[];
};
