const electron = window.electron;
const path = window.path;
const fs = window.fs;

export function loadSettings() {
    const file = getSettingsFile();
    return file.data;
}

export async function saveSettings(settings) {
    let file = getSettingsFile();
    file.data["offlineMode"] = settings.offlineMode;

    await fs.writeFile(file.path, JSON.stringify(file.data), error => {
        if (error) {
          throw error;
        }
    });
}

function getSettingsFile() {
  //get correct path for OS
  const userDataPath = (electron.app || electron.remote.app).getPath(
    "userData"
  );
  const filePath = path.join(userDataPath, "userSettings.json");

  return {data: readFile(filePath), path: filePath};
}

function readFile(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      //initialize file
      fs.writeFileSync(filePath, JSON.stringify({ offlineMode: false }));
      return { offlineMode: false };
    }
  }