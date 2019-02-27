workflow "Build, Test & Deploy" {
  on = "push"
  resolves = [
    "Lint",
    "Deploy",
  ]
}

action "Install" {
  uses = "docker://node:10"
  runs = "yarn"
}

action "Lint" {
  uses = "docker://node:10"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Build" {
  uses = "docker://node:10"
  needs = ["Install"]
  runs = "yarn"
  args = "build --production"
}

action "Test" {
  uses = "docker://alekzonder/puppeteer:latest"
  needs = ["Build"]
  runs = "yarn"
  args = "test"
}

action "On Master" {
  uses = "actions/bin/filter@master"
  needs = ["Test"]
  args = "branch master"
}

action "Deploy" {
  uses = "docker://node:10"
  needs = ["On Master"]
  runs = "yarn"
  args = "deploy"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
}