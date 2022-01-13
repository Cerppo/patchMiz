const AdmZip = require("adm-zip");

module.exports = function patchMiz(filename) {
  const zip = new AdmZip(filename);
  let patched = false;

  // Try to open the Mission file in the miz file

  let missionLua = zip.readAsText("mission");

  if (missionLua.includes('["enable"] = true')) {
    console.log("This files contains failures");
    console.log("Patching");

    let patchedMission = missionLua.replaceAll(
      '["enable"] = true',
      '["enable"] = false'
    );

    zip.addFile(
      "mission",
      Buffer.from(patchedMission, "utf-8"),
      "Patched by 06MRH tool"
    );
    console.log("Patched");
    zip.writeZip(filename + ".patched");
    patched = true;
  } else {
    console.log("No failures enabled found. Have a nice mission");
  }
  return patched;
};
