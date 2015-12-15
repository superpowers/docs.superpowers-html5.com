# Roadmap

The core development team uses [a Trello board](https://trello.com/b/eQUeNKrq/superpowers) to keep track of planned features.

## Superpowers v1.0

This release will focus on making it easy to release and upgrade the major parts of Superpowers independently.

 * [Split the launcher from the server and redesign it](https://trello.com/c/IVEnTXCe/701-redesign-launcher)
 * Release the server and each system (aka. project type) separately with their own version numbers
 * Support updating the server and each system from the launcher

## Superpowers v0.18

This will be our first open source release!

 * Superpowers
  * Map folder hierarchy in a project to actual folders on disk
  * Don't publish the system's `templates` folder
  * turn `SupCore.system.api` into a more generic plugin API on `SupCore.system` 
 * Superpowers Game
  * Improved behavior scene component editor
  * Allow manipulating shader materials from scripting
  * Gamepad API improvements (`Sup.Input.wasGamepadAxisJustPressed`, with auto-repeat)
  * Nested child lookup with slashes in `Sup.Actor.getChild`
  * `TextRenderer.setColor` support for bitmap fonts
  * Allow downloading from the font asset editor

## Previous releases

Release notes for all releases can be found on GitHub:

  * [Server releases](https://github.com/superpowers/superpowers/releases)
  * [Launcher releases](https://github.com/superpowers/superpowers-launcher/releases)
  * [Superpowers Game releases](https://github.com/superpowers/superpowers-game/releases)

Release notes for other systems can be found on their own repository.
