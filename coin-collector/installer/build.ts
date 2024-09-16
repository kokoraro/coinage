import * as installer from 'electron-winstaller';
import * as path from 'path';

const settings = {
    appDirectory: '../dist/packaged/CoinCollector-win32-x64',
    outputDirectory: '../dist/deployed/windows',
    authors: 'Eugenio Vinicio Berretta',
    loadingGif: './resources/loading-gif/installer.gif',
    noMsi: true,
    setupExe: 'CoinCollectorInstaller.exe',
    iconUrl: 'file://' + path.resolve('./resources/icons/win/icon.ico'),
    setupIcon: './resources/setup/setup.ico',
    description: 'App for an italian coin collector',
    exe: 'CoinCollector.exe',
    name: 'CoinCollector.exe',
    title: 'CoinCollector'
};

const resultPromise = installer.createWindowsInstaller(settings) as Promise<void>;
resultPromise
    .then(() => console.log("App installer for windows generated succesfully!!!"))
    .catch(error => console.error("Error in generating windows installer, ", error));