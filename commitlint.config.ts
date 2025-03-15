import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: [
    "@commitlint/config-angular"
  ],
  rules: {
    "type-empty": [
      RuleConfigSeverity.Error,
      "never",
    ],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "style",
        "refactor",
        "test",
        "chore",
        "revert",
        "ci",
        "docs",
        "build",
        "release",
      ],
    ],
    "scope-empty": [
      RuleConfigSeverity.Warning,
      "never",
    ],
    "scope-enum": [
      RuleConfigSeverity.Warning,
      "always",
      [
        "frontend",
        "backend",
        "docs",
        "infra",
        "ci",
        "deps",
        "config",
        "test"
      ],
    ],
    "subject-case": [
      RuleConfigSeverity.Error,
      "always",
      ["sentence-case"],
    ],
  },
};

export default Configuration;
