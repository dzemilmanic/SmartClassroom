const { readJsonFromFile, writeJsonToFile } = require("../utils/fileUtils");
const lostFoundPath = "./data/lostFound.json";
const usersPath = "./data/users.json";
exports.getAllLostFound = async (req, res) => {
  const lostFounds = await readJsonFromFile(lostFoundPath);
  const users = await readJsonFromFile(usersPath);

  const updatedLostFounds = lostFounds.map((lostFound) => {
    const user = users.find(
      (user) => user.id === parseInt(lostFound.createdBy)
    );

    if (user) {
      return {
        ...lostFound,
        school: user.school,
        createdBy: user.name + " " + user.surname,
      };
    } else {
      return {
        ...lostFound,
        createdBy: "Nepoznati korisnik",
      };
    }
  });

  res.status(200).json(updatedLostFounds);
};

exports.getLostFoundById = async (req, res) => {
  const { id } = req.params;
  const lostFounds = await readJsonFromFile(lostFoundPath);
  const lostFound = lostFounds.find(
    (lostFound) => lostFound.id === parseInt(id)
  );
  if (lostFound) {
    res.status(200).json(lostFound);
  } else {
    res.status(404).send("LostFound nije pronadjen.");
  }
};
exports.createLostFound = async (req, res) => {
  const { title, description, createdBy } = req.body;
  const lostFounds = await readJsonFromFile(lostFoundPath);
  const newLostFound = {
    id: Date.now(),
    title,
    description,
    createdBy,
    date: new Date().toISOString(),
  };
  lostFounds.push(newLostFound);
  await writeJsonToFile(lostFoundPath, lostFounds);
  res.status(201).json(newLostFound);
};
exports.updateLostFound = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const lostFounds = await readJsonFromFile(lostFoundPath);
  const lostFoundIndex = lostFounds.findIndex(
    (lostFound) => lostFound.id === parseInt(id)
  );
  if (lostFoundIndex !== -1) {
    lostFounds[lostFoundIndex] = {
      ...lostFounds[lostFoundIndex],
      ...lostFounds,
    };
    await writeJsonToFile(lostFoundPath, lostFounds);
    res.status(200).json(lostFounds[lostFoundIndex]);
  } else {
    res.status(404).send("Predmet nije pronadjen.");
  }
};
exports.deleteLostFound = async (req, res) => {
  const { id } = req.params;
  let lostFounds = await readJsonFromFile(lostFoundPath);
  const lostFoundIndex = lostFounds.findIndex(
    (lostFound) => lostFound.id === parseInt(id)
  );
  if (lostFoundIndex !== -1) {
    lostFounds.splice(lostFoundIndex, 1);
    await writeJsonToFile(lostFoundPath, lostFounds);
    res.status(200).json(lostFounds);
  } else {
    res.status(404).send("Predmet nije pronadjen.");
  }
};
