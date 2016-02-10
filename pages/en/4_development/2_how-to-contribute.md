# How to contribute

Thanks for your interest in contributing, We're humbled and to be honest, a bit excited ^_^.  
There are many ways you can help advance Superpowers!

## Preamble

Superpowers adheres to the [Contributor Covenant](https://github.com/superpowers/superpowers/tree/master/CODE_OF_CONDUCT.md).
By participating, you are expected to honor this code.

As a new contributor, we want you to feel welcome and comfortable.
You're not going to break anything, so feel free to experiment.
We appreciate it when people follow the conventions detailed below,
but if you're unsure about where to post, pick a place that makes sense to you
and someone will point you to the right one if needed.

### Superpowers's source code [is hosted on GitHub](https://github.com/superpowers)

GitHub is a website for collaborating on projects. Superpowers is split over several repositories:

 * [superpowers/superpowers](https://github.com/superpowers/superpowers) — The main client/server
 * [superpowers/superpowers-app](https://github.com/superpowers/superpowers-app) — The desktop app
 * [superpowers/superpowers-game](https://github.com/superpowers/superpowers-game) — The Superpowers Game system
 * [superpowers/superpowers-html5.com](https://github.com/superpowers/superpowers-html5.com) — Superpowers's website

Other systems and plugins might be hosted elsewhere by developers unaffiliated with the Superpowers project.

## Reporting and triaging bugs

Bugs should be reported on GitHub. When in doubt, feel free to [open an issue in the core repository](https://github.com/superpowers/superpowers/issues/new).

You can help triage bugs and make them more useful by:

 * Asking bug reporters which platform (Windows, OS X or Linux, 32-bit or 64-bit) and which browser/app version they're using.
 * Trying to reproduce the bug with the latest development version of Superpowers on any platform possible and reporting your findings.
 * If you can't reproduce the bug, it's worth sharing that too and maybe ask for more details!

## New features and suggestions

Check out [the Roadmap](/en/development/roadmap) for an idea of where development is headed.

Ideas and suggestions for new features should be posted [on the forums](http://itch.io/engine/superpowers/community).
Once a feature proposal gets support and traction in the community,
you can create an issue on GitHub to discuss its design in details before moving on to implementation.

## Documentation

The documentation website is written in Markdown.
New pages should be treated as new features, following the same proposal and discussion process outlined above. 

`FIXME: It should probably be rewritten as a Superpowers project and published on GitHub Pages?!`

## Contributing code

See [the build instructions](/en/development/building-superpowers) to get the development version of Superpowers
running on your own computer.

## Sending a pull request

 * Use imperative in your commits message, for instance `Add flux capacitor` not `Added a flux capacitor`
 * If you're fixing a bug with an existing issue number of GitHub, mention it in the commit message: `Increase gigawatt output, closes #6`  
 * Try to stick to the existing coding style. You can use the `tslint` plugin in Visual Studio Code to help.
 * Make your pull request as small as possible. Don't bundle many unrelated changes together.
