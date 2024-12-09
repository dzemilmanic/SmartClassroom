const { readJsonFromFile, writeJsonToFile } = require("../utils/fileUtils");
const materialsFilePath = "./data/materials.json";
const usersPath = "./data/users.json";
exports.getAllMaterials = async (req, res, next) => {
  try {
    const materials = await readJsonFromFile(materialsFilePath);
    const users = await readJsonFromFile(usersPath);
    console.log("mat:",materials);
    
    const updatedMaterials = materials.map((material) => {
      const user = users.find((user) => user.id === parseInt(material.createdBy));
      return {
        ...material,
        createdBy: user ? `${user.name} ${user.surname}` : "Nepoznati korisnik",
      };
    });

    res.status(200).json(materials);
  } catch (error) {
    console.error("Greška u getAllMaterials:", error);
    next(error); // Prosleđuje grešku globalnom error handleru
  }
};


exports.getMaterialById = async (req, res) => {
  const { id } = req.params;
  const materials = await readJsonFromFile(materialsFilePath);
  const material = materials.find((material) => material.id === parseInt(id));

  if (material) {
    res.status(200).json(material);
  } else {
    res.status(404).send("Materijal nije pronađen.");
  }
};

exports.createMaterial = async (req, res) => {
  const { title, description, type, createdBy, classroomId, link } = req.body;

  if (!title || !description || !type || !createdBy || !classroomId) {
    return res
      .status(400)
      .json({ message: "Sva polja osim linka su obavezna." });
  }

  let materials = await readJsonFromFile(materialsFilePath);

  const newMaterial = {
    id: Date.now(),
    title,
    description,
    type,
    createdBy,
    classroomId,
    link: link || "",
    date: new Date().toISOString(),
  };

  materials.push(newMaterial);
  await writeJsonToFile(materialsFilePath, materials);
  res.status(201).json(newMaterial);
};

exports.updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { title, description, type, createdBy, classroomId, link } = req.body;

  if (!title || !description || !type || !createdBy || !classroomId) {
    return res.status(400).json({ message: "Sva polja su obavezna." });
  }

  let materials = await readJsonFromFile(materialsFilePath);
  const materialIndex = materials.findIndex(
    (material) => material.id === parseInt(id)
  );

  if (materialIndex === -1) {
    return res.status(404).json({ message: "Materijal nije pronađen." });
  }

  materials[materialIndex] = {
    ...materials[materialIndex],
    title,
    description,
    type,
    createdBy,
    classroomId,
    attachments: attachments || materials[materialIndex].attachments,
    responsesRequired:
      responsesRequired !== undefined
        ? responsesRequired
        : materials[materialIndex].responsesRequired,
  };

  await writeJsonToFile(materialsFilePath, materials);
  res.status(200).json(materials[materialIndex]);
};

exports.deleteMaterial = async (req, res) => {
  const { id } = req.params;
  let materials = await readJsonFromFile(materialsFilePath);
  const materialIndex = materials.findIndex(
    (material) => material.id === parseInt(id)
  );

  if (materialIndex === -1) {
    return res.status(404).json({ message: "Materijal nije pronađen." });
  }

  materials.splice(materialIndex, 1);
  await writeJsonToFile(materialsFilePath, materials);
  res.status(200).json({ message: "Materijal je uspješno obrisan." });
};
