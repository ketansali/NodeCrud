const Employee = require("../models/employeeSchema");

exports.employee = {
  add: async (req, res) => {
    try {
      console.log(req.file.filename);
      const isExisted = await Employee.findOne({
        email: req.body.email,
      });
      if (isExisted)
        return res.status(400).json({
          isSuccess: false,
          message: "Employee already existed",
        });
      const empInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        salary: req.body.salary,
      };
      if (req.file) {
        empInfo.image = req.file.filename;
      }
      const isCreated = await Employee.create(empInfo);
      if (isCreated) {
        return res.status(201).json({
          isSuccess: true,
          message: "Employee created",
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          message: "Employee not created",
        });
      }
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const employees = await Employee.find({});
      if (employees) {
        return res.status(200).json({
          isSuccess: true,
          data: employees,
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const employees = await Employee.findById(req.query.id);
      if (employees) {
        return res.status(200).json({
          isSuccess: true,
          data: employees,
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const empInfo = await Employee.findById(req.query.id);
      if (!empInfo) {
        return res.status(400).json({
          isSuccess: false,
          message: "Employee not found",
        });
      }
      await Employee.findByIdAndRemove(empInfo._id);
      return res.status(200).json({
        isSuccess: true,
        message: "Employee deleted",
      });
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const empInfo = await Employee.findById(req.body.id);
      if (!empInfo) {
        return res.status(400).json({
          isSuccess: false,
          message: "Employee not found",
        });
      }
      await Employee.findByIdAndUpdate(
        empInfo._id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          salary: req.body.salary,
        },
        { new: true }
      );
      return res.status(200).json({
        isSuccess: true,
        message: "Employee updated",
      });
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
};
