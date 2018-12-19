workflow "Build & Test" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "actions/npm@c555744"
  runs = "yarn"
  args = "install"
}

action "Lint" {
  uses = "actions/npm@c555744"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Build" {
  uses = "actions/npm@c555744"
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
