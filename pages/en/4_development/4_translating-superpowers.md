# Translating Superpowers

## Adding support for a new language

Superpowers supports multiple languages. You can add support for your own language!

To do so, you'll need to [build Superpowers from source](/en/development/building-superpowers).  
Translation files (also called "localization files") are stored in the `locales` folders throughout the repositories.

 * The core localization files are located in `public/locales`.
 * Each system has its own localization files in `systems/SYSTEM_NAME/public/locales`.
 * Each plugin has its own localization files in `systems/SYSTEM_NAME/plugins/AUTHOR_NAME/PLUGIN_NAME/public/locales`.

You should start by creating a folder in `public/locales` with a name consisting of [the two-letter code for your language](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), for instance `fr` or `ja`.
The very first localization file you'll need is `common.json`. Copy it from the `en` folder to your own language's folder and translate all the values on the right (but leave the keys on the left as is).

## Testing your changes

Most of the localized strings will be baked into various `index.YOUR_LANGUAGE_CODE.html` files when building Superpowers.
To test your changes, execute `npm run build` and reload Superpowers afterwards.
