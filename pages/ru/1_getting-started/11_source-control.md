# Using source control

Source control lets you create checkpoints in your project, compare old revisions with newer ones and back things up to a remote host like [GitHub](https://github.com/) or [Bitbucket](https://bitbucket.org/).

Superpowers projects can easily be kept under [source control](https://en.wikipedia.org/wiki/Revision_control). While there is no built-in support at the moment, existing tools like Git and Mercurial work great.

## Delay when making changes

In order to minimize its performance footprint, the Superpowers server doesn't write every change you make to a project to the disk immediately. Saving to disk might be delayed for up to 60 seconds.

When creating a new revision for your project, either wait 60s or stop your server altogether to make sure everything has been flushed out to the disk. (We'll probably have a button to flush changes in the app at some point).

## Что не надо помещать под систему контроля версий

Есть пара папок, которые вы, вероятно, не хотите фиксировать в своем хранилище.:

  * Папка `rooms/` содержит историю вашего недавнего журнала чата
  * Папка `trashedAssets/` содержит удаленные активы

Вы можете использовать `.gitignore` или файл `.hgignore`.
