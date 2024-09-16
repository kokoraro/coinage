# Coin Collector
A desktop app made with Electron for an Italian coin collector.

## Project destination
This is the source code of a desktop app made with electron. It was tested only for Windows, but it should work also for Linux and Mac.

## Project purpose
This app was needed by an Italian coin collector to have a beautyful and organized digital list of all his coins. There is a section with a form where coins can be added, a section where they can be visualized by ambit, be edited or be deleted. There is then a section where it is possible to make and execute backups, stored as zip files.

## Project usefulness
This app was thought and developed for a specific problem and for a specific person. Although this, it could be useful as a very simple
development example of a desktop app with electron and angular. Furthermore, with some adjustments and programming notions, it could be 
used by other coin collectors to make an app which fits their own collection.

## How it was made
This app was make with `Electron`. `Typescript` was used as main script language, both for main and render processes. There is a loading splash window made with only html and css. The main app is made with `Angular`, with the support of `Angular Material` and `Angular Flexbox` for the layout and `DexieDB` (lib for `IndexedDb`) for the database. Other node modules were used to make the part wich works on the system.

## How to run it
If you want to run the project on windows:
* install `nodejs`
* download and unzip this repository
* open the `coin-collector` folder with the command line
* type `npm i`
* type `npm run electron-windows`
* in the root folder, go to `dist/deployed/windows` and run `CoinCollectorInstaller.exe` 
* it should install the app and create a link on the desktop
