import fs from "fs";

export const updateAuthors = newAuthors => {
  console.log("Updating authors", newAuthors);
  try {
    const filePath = `${__dirname}/../app/data/authors.json`;

    fs.writeFileSync(filePath, JSON.stringify(newAuthors), "utf8");
    console.log("Authors updated successfully");
  } catch (err) {
    console.error("Error updating authors", err);
  }
};

export default updateAuthors;
