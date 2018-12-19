workflow "Build & Test" {
  on = "push"
  resolves = ["Test"]
}

action "Install with Yarn" {
  uses = "actions/npm@c555744"
  runs = "yarn"
  args = "install"
}

action "Lint" {
  uses = "actions/npm@c555744"
  needs = ["Install with Yarn"]
  runs = "yarn"
  args = "lint"
}

action "Build" {
  uses = "actions/npm@c555744"
  needs = ["Lint"]
  runs = "yarn"
  args = "build --production"
}

action "Test" {
  uses = "docker://alekzonder/puppeteer:latest"
  needs = ["Build"]
  runs = "yarn"
  args = "test"
}
