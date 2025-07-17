import { app, BrowserWindow, screen, Menu } from "electron";
import * as path from "path";
import * as url from "url";

let win: BrowserWindow | null;
const args = process.argv.slice(1);
const serve = args.some((val) => val === "--serve");

function createWindow(): void {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  if (serve) {
    win.loadURL("http://localhost:4200");
    win.webContents.openDevTools();
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "web-app/en/browser/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
