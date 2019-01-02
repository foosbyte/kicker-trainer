workflow "Build, Test & Deploy" {
  on = "push"
  resolves = [
    "Lint",
    "Deploy",
  ]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  runs = "yarn"
  args = "install"
}

action "Lint" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Build" {
  uses = "actions/npm@e7aaefe"
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
  uses = "actions/bin/filter@b2bea07"
  needs = ["Test"]
  args = "branch master"
}

action "Deploy" {
  uses = "actions/npm@e7aaefe"
  needs = ["On Master"]
  runs = "yarn"
  args = "deploy"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
}