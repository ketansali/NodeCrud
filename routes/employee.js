const router = require("express").Router();
const employeeController = require("../controllers/employeeController");
const Path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, Path.join(Path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
router.post("/add", upload.single("image"), (req, res) => {
  return employeeController.employee.add(req, res);
});

router.post("/update", (req, res) => {
  return employeeController.employee.update(req, res);
});
router.delete("/delete", (req, res) => {
  return employeeController.employee.delete(req, res);
});
router.get("/getAll", (req, res) => {
  return employeeController.employee.getAll(req, res);
});
router.get("/getById", (req, res) => {
  return employeeController.employee.getById(req, res);
});

module.exports = router;
